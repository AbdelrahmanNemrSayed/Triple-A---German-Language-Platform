// متحكم سيناريوهات المحادثات الواقعية ولعب الأدوار
import { dialoguesData } from '../../data/dialogues.js';
import { audioPlayer } from './audio.js';

export class DialogueManager {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentDialogueId = dialoguesData[0].id;
    this.roleplayMuteB = false; // إذا كان true، يتم كتم صوت الطرف B ليتحدث المستخدم
  }

  setDialogue(id) {
    this.currentDialogueId = id;
    this.render();
  }

  playAll(lines, onComplete) {
    let index = 0;
    const playNext = () => {
      if (index >= lines.length) {
        if (onComplete) onComplete();
        return;
      }
      const line = lines[index];
      const bubbleEl = this.container.querySelector(`#chat-bubble-${index}`);

      if (this.roleplayMuteB && line.speaker === 'B') {
        // إذا كان دور المستخدم، ننتظر ثانيتين ونتابع
        if (bubbleEl) bubbleEl.style.borderColor = '#fbbf24';
        setTimeout(() => {
          if (bubbleEl) bubbleEl.style.borderColor = '';
          index++;
          playNext();
        }, 2500);
      } else {
        if (bubbleEl) bubbleEl.style.borderColor = '#38bdf8';
        audioPlayer.speak(line.german, null, 1.0);
        // ننتظر مدة تقريبية للكلام ثم ننتقل للتالي
        const duration = Math.max(2200, line.german.length * 75);
        setTimeout(() => {
          if (bubbleEl) bubbleEl.style.borderColor = '';
          index++;
          playNext();
        }, duration);
      }
    };
    playNext();
  }

  render() {
    if (!this.container) return;

    const current = dialoguesData.find(d => d.id === this.currentDialogueId) || dialoguesData[0];

    this.container.innerHTML = `
      <div class="dialogue-wrapper">
        <!-- شبكة اختيار السيناريو -->
        <div class="dialogue-scenarios-grid">
          ${dialoguesData.map(d => `
            <button class="scenario-card ${d.id === this.currentDialogueId ? 'active' : ''}" data-id="${d.id}">
              <div class="scenario-card-icon">${d.icon}</div>
              <div class="scenario-card-body">
                <span class="scenario-card-title">${d.titleAr}</span>
                <span class="scenario-card-de">${d.title}</span>
              </div>
              <span class="scenario-card-level level-${d.level.toLowerCase().substring(0,2)}">${d.level}</span>
            </button>
          `).join('')}
        </div>


        <div class="dialogue-card">
          <!-- ترويسة الحوار -->
          <div class="dialogue-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                <span class="level-badge badge-${current.level.toLowerCase().substring(0, 2)}">${current.level}</span>
                <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">
                  ${current.title}
                </h3>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem;">${current.titleAr}</p>
            </div>

            <!-- أزرار التحكم والتشغيل التلقائي -->
            <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
              <button class="btn-primary" id="btn-play-full-dialogue" style="padding: 0.55rem 1.15rem; font-size: 0.88rem;">
                <span>تشغيل الحوار كاملاً 🔊</span>
              </button>
              <button class="btn-secondary ${this.roleplayMuteB ? 'active' : ''}" id="btn-toggle-roleplay" style="padding: 0.55rem 1rem; font-size: 0.85rem;">
                <span>${this.roleplayMuteB ? '🎭 وضع التحدث (مفعّل)' : '🎭 تدريب لعب الأدوار'}</span>
              </button>
            </div>
          </div>

          <!-- وصف الموقف الحياتي -->
          <div class="dialogue-situation-box">
            💡 <strong>الموقف العملي:</strong> ${current.situationAr}
          </div>

          <!-- شات الحوار التفاعلي -->
          <div class="dialogue-chat-feed">
            ${current.lines.map((line, idx) => {
              const speakerInfo = current.speakers[line.speaker];
              const isSpeakerA = line.speaker === 'A';
              return `
                <div class="chat-row ${isSpeakerA ? 'speaker-a' : 'speaker-b'}">
                  <div class="speaker-avatar" title="${speakerInfo.name}">
                    ${speakerInfo.avatar}
                  </div>
                  <div class="chat-bubble" id="chat-bubble-${idx}">
                    <div class="bubble-sender-name">
                      <span>${speakerInfo.name}</span>
                      <button class="btn-audio-mini" data-action="speak-line" data-text="${line.german}" title="استمع لهذه الجملة">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      </button>
                    </div>
                    <div class="bubble-german" dir="ltr">${line.german}</div>
                    <div class="bubble-arabic" dir="rtl">${line.arabic}</div>
                    <div class="bubble-phonetic" dir="rtl">🗣️ ${line.phonetic}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents(current);
  }

  bindEvents(current) {
    // تبديل المحادثات
    const pills = this.container.querySelectorAll('.scenario-card');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.setDialogue(pill.getAttribute('data-id'));
      });
    });

    // تشغيل الصوت الفردي
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action="speak-line"]');
      if (!btn) return;
      const text = btn.getAttribute('data-text');
      if (text) {
        audioPlayer.speak(text, btn);
      }
    });

    // تشغيل الحوار كاملاً
    const playFullBtn = this.container.querySelector('#btn-play-full-dialogue');
    if (playFullBtn) {
      playFullBtn.addEventListener('click', () => {
        playFullBtn.disabled = true;
        playFullBtn.innerHTML = '<span>جاري التشغيل... ⏳</span>';
        this.playAll(current.lines, () => {
          playFullBtn.disabled = false;
          playFullBtn.innerHTML = '<span>تشغيل الحوار كاملاً 🔊</span>';
        });
      });
    }

    // تفعيل وضع لعب الأدوار
    const roleplayBtn = this.container.querySelector('#btn-toggle-roleplay');
    if (roleplayBtn) {
      roleplayBtn.addEventListener('click', () => {
        this.roleplayMuteB = !this.roleplayMuteB;
        this.render();
      });
    }
  }
}
