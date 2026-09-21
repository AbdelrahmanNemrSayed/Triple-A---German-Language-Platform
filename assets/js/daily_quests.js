// assets/js/daily_quests.js
// نظام التحدي والمهمة اليومية (Daily Quest System)
// منصة Triple A PRO - German Language Platform

import { Storage } from './storage.js';
import { audioPlayer } from './audio.js';

export class DailyQuestManager {
  constructor(onXPUpdate) {
    this.onXPUpdate = onXPUpdate || (() => {});
    this.modalEl = null;
    this.todayKey = this.getTodayDateString();
  }

  getTodayDateString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  getQuestStorageKey() {
    const profile = Storage.getActiveProfile();
    const pid = profile ? profile.id : 'default';
    return `triple_a_${pid}_daily_quest_${this.todayKey}`;
  }

  getQuestState() {
    try {
      const data = localStorage.getItem(this.getQuestStorageKey());
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Daily quest read error:', e);
    }

    // Default state for today
    return {
      completedTasks: [],
      claimedBonus: false,
      date: this.todayKey
    };
  }

  saveQuestState(state) {
    try {
      localStorage.setItem(this.getQuestStorageKey(), JSON.stringify(state));
    } catch (e) {
      console.warn('Daily quest save error:', e);
    }
  }

  getTodayQuests() {
    // 3 Curated quests for the day
    return [
      {
        id: 'q1_vocab',
        title: 'مهمة 1: مفردة اليوم (Wort des Tages)',
        desc: 'ما هي أداة ومعنى كلمة "Krankenhaus"؟',
        type: 'choice',
        options: [
          { text: 'der Krankenhaus (مستشفى - مذكر)', correct: false },
          { text: 'das Krankenhaus (مستشفى - محايد)', correct: true },
          { text: 'die Krankenhaus (مستشفى - مؤنث)', correct: false }
        ],
        explanation: 'الكلمة تنتهي بـ Haus، وكلمة das Haus محايدة، لذلك أي كلمة مركبة تنتهي بـ Haus تأخذ أداة das!',
        xp: 15
      },
      {
        id: 'q2_grammar',
        title: 'مهمة 2: لغز القواعد السريع (Grammatik-Rätsel)',
        desc: 'اختر تصريف الفعل الصحيح: "Wir ___ gestern im Restaurant."',
        type: 'choice',
        options: [
          { text: 'waren (كنا - Präteritum)', correct: true },
          { text: 'war (كنت)', correct: false },
          { text: 'seid (تكونون)', correct: false }
        ],
        explanation: 'الفعل sein في صيغة الماضي البسيط Präteritum مع الضمير wir هو waren.',
        xp: 15
      },
      {
        id: 'q3_listening',
        title: 'مهمة 3: الفهم السماعي (Hörverstehen)',
        desc: 'استمع للجملة الألمانية التالية: أين يذهب المتحدث؟',
        type: 'listening',
        audioText: 'Ich muss heute dringend zum Bürgeramt gehen, um mich anzumelden.',
        options: [
          { text: 'إلى الطبيب للعيادة (Arztpraxis)', correct: false },
          { text: 'إلى دائرة شؤون المواطنين لتسجيل السكن (Bürgeramt)', correct: true },
          { text: 'إلى محطة القطار المركزية (Hauptbahnhof)', correct: false }
        ],
        explanation: 'المتحدث قال: zum Bürgeramt gehen, um mich anzumelden (تسجيل السكن في البلدية).',
        xp: 20
      }
    ];
  }

  openModal() {
    let modal = document.getElementById('daily-quest-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'daily-quest-modal';
      modal.className = 'daily-quest-modal-overlay';
      document.body.appendChild(modal);
    }
    this.modalEl = modal;
    this.renderModal();
    this.modalEl.classList.add('open');
  }

  closeModal() {
    if (this.modalEl) {
      this.modalEl.classList.remove('open');
    }
  }

  handleAnswer(questId, optionIndex) {
    const state = this.getQuestState();
    if (state.completedTasks.includes(questId)) return;

    const quests = this.getTodayQuests();
    const q = quests.find(item => item.id === questId);
    if (!q) return;

    const option = q.options[optionIndex];
    if (option && option.correct) {
      state.completedTasks.push(questId);
      this.saveQuestState(state);

      try {
        Storage.addXP(q.xp);
        if (this.onXPUpdate) this.onXPUpdate();
      } catch (err) {
        console.warn(err);
      }

      // Check if all 3 completed and bonus not claimed
      if (state.completedTasks.length === quests.length && !state.claimedBonus) {
        state.claimedBonus = true;
        this.saveQuestState(state);
        try {
          Storage.addXP(50); // Mega Daily Completion Bonus
          if (this.onXPUpdate) this.onXPUpdate();
        } catch (e) {}
      }

      this.renderModal();
      this.updateTopbarBadge();
    } else {
      alert('إجابة غير صحيحة! حاول مرة أخرى بتركيز 💡');
    }
  }

  updateTopbarBadge() {
    const state = this.getQuestState();
    const quests = this.getTodayQuests();
    const pill = document.getElementById('topbar-quest-pill');
    if (pill) {
      const isAllDone = state.completedTasks.length === quests.length;
      pill.innerHTML = `
        <span class="quest-pill-icon">${isAllDone ? '✅' : '⚡'}</span>
        <span class="quest-pill-text">${isAllDone ? 'مهمة اليوم منجزة' : `مهمة اليوم (${state.completedTasks.length}/3)`}</span>
      `;
      if (isAllDone) {
        pill.classList.add('quest-done');
      } else {
        pill.classList.remove('quest-done');
      }
    }
  }

  renderModal() {
    if (!this.modalEl) return;

    const state = this.getQuestState();
    const quests = this.getTodayQuests();
    const doneCount = state.completedTasks.length;
    const isAllDone = doneCount === quests.length;

    this.modalEl.innerHTML = `
      <div class="daily-quest-card">
        <button class="btn-quest-close" id="btn-close-quest-modal">✕</button>

        <div class="quest-modal-header">
          <span class="vault-badge"><i class="fa-solid fa-bolt"></i> تحدي الـ 24 ساعة</span>
          <h2 class="quest-modal-title">⚡ المهمة اليومية (Daily Quest)</h2>
          <p class="quest-modal-sub">أنجز المهام الثلاث يومياً للحفاظ على الستريك وربح مكافأة <strong>+50 XP إضافية</strong>!</p>
        </div>

        <!-- Progress bar -->
        <div class="quest-progress-section">
          <div class="quest-progress-meta">
            <span>التقدم اليومي: <strong>${doneCount} من 3 مهام</strong></span>
            <span>${Math.round((doneCount / 3) * 100)}%</span>
          </div>
          <div class="quest-progress-track">
            <div class="quest-progress-fill" style="width: ${(doneCount / 3) * 100}%"></div>
          </div>
        </div>

        <!-- Quests List -->
        <div class="quests-items-list">
          ${quests.map(q => {
            const isDone = state.completedTasks.includes(q.id);
            return `
              <div class="quest-item-box ${isDone ? 'completed' : ''}">
                <div class="quest-item-top">
                  <div>
                    <span class="quest-type-tag">${isDone ? '✓ تم الإنجاز' : `+${q.xp} XP`}</span>
                    <h4 class="quest-item-title">${q.title}</h4>
                  </div>
                  <span class="quest-status-icon">${isDone ? '🎉' : '⏳'}</span>
                </div>

                <p class="quest-item-desc">${q.desc}</p>

                ${q.type === 'listening' ? `
                  <div class="quest-audio-trigger">
                    <button class="btn-secondary btn-quest-listen" data-speak="${encodeURIComponent(q.audioText)}">
                      <i class="fa-solid fa-volume-high"></i> اضغط للاستماع للجملة 🎧
                    </button>
                  </div>
                ` : ''}

                ${!isDone ? `
                  <div class="quest-options-grid">
                    ${q.options.map((opt, optIdx) => `
                      <button class="btn-quest-opt" data-quest-id="${q.id}" data-opt-idx="${optIdx}">
                        ${opt.text}
                      </button>
                    `).join('')}
                  </div>
                ` : `
                  <div class="quest-done-explanation">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${q.explanation}</span>
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>

        ${isAllDone ? `
          <div class="quest-all-done-banner">
            <div class="banner-icon">🏆</div>
            <div>
              <h3>عاش يا بطل! أنهيت مهمة اليوم بالكامل</h3>
              <p>تمت إضافة +50 XP مكافأة كبرى لحسابك وتم تعزيز الستريك اليومي بنجاح!</p>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Events
    const closeBtn = this.modalEl.querySelector('#btn-close-quest-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    this.modalEl.querySelectorAll('.btn-quest-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.questId;
        const optIdx = parseInt(btn.dataset.optIdx, 10);
        this.handleAnswer(qId, optIdx);
      });
    });

    this.modalEl.querySelectorAll('.btn-quest-listen').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const txt = decodeURIComponent(btn.dataset.speak);
        audioPlayer.speak(txt);
      });
    });
  }
}
