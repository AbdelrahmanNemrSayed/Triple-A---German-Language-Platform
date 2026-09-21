// متحكم مسارات الألمانية لسوق العمل والوظائف (Deutsch im Beruf Controller)
import { careerTracks } from '../../data/career_vocab.js';
import { audioPlayer } from './audio.js';

export class CareerManager {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentTrackKey = 'it';
  }

  setTrack(trackKey) {
    if (careerTracks[trackKey]) {
      this.currentTrackKey = trackKey;
      this.render();
    }
  }

  render() {
    if (!this.container) return;

    const track = careerTracks[this.currentTrackKey];
    if (!track) return;

    this.container.innerHTML = `
      <div class="career-section">
        <!-- شريط نبذة المسار -->
        <div class="career-banner">
          <h2 class="career-banner-title">
            <span>${track.icon}</span>
            <span>مسار ${track.title}</span>
          </h2>
          <p class="career-banner-desc">${track.description}</p>
        </div>

        <!-- أزرار التبديل بين مجالات العمل -->
        <div class="career-track-pills">
          <button class="career-track-btn ${this.currentTrackKey === 'it' ? 'active' : ''}" data-track="it">
            <span>💻</span> <span>الـ IT والبرمجة</span>
          </button>
          <button class="career-track-btn ${this.currentTrackKey === 'customer_service' ? 'active' : ''}" data-track="customer_service">
            <span>🎧</span> <span>خدمة العملاء (Call Center)</span>
          </button>
          <button class="career-track-btn ${this.currentTrackKey === 'medical' ? 'active' : ''}" data-track="medical">
            <span>🩺</span> <span>القطاع الطبي والتمريض</span>
          </button>
          <button class="career-track-btn ${this.currentTrackKey === 'interview' ? 'active' : ''}" data-track="interview">
            <span>🏢</span> <span>المقابلات والسيرة الذاتية</span>
          </button>
        </div>

        <div class="track-detail-card">
          <div class="track-salary-badge">
            <span>💰 معلومات سوق العمل والرواتب:</span>
            <span>${track.salaryInfo}</span>
          </div>

          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem;">
            📌 أهم المصطلحات التخصصية في هذا المجال:
          </h3>

          <!-- شبكة مصطلحات المسار -->
          <div class="track-grid">
            ${track.words.map(w => {
              const articleBadge = w.article ? `<span class="article-badge badge-${w.article}">${w.article}</span>` : '';
              return `
                <div class="career-word-card">
                  <div class="career-word-header">
                    <div>
                      ${articleBadge}
                      <h4 class="career-word-title" dir="ltr">${w.german}</h4>
                    </div>
                    <div style="display: flex; gap: 0.35rem;">
                      <button class="btn-audio-mini" data-action="speak-word" data-text="${w.german}" title="استمع للكلمة">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p class="career-word-arabic">${w.arabic}</p>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.65rem;">🗣️ ${w.phonetic}</div>

                  <div class="card-sentence-box">
                    <div class="sentence-top">
                      <span class="sentence-label">جملة العمل:</span>
                      <button class="btn-speak-sentence" data-action="speak-sentence" data-text="${w.sentenceDe}" title="استمع للجملة">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      </button>
                    </div>
                    <div class="sentence-german" dir="ltr">${w.sentenceDe}</div>
                    <div class="sentence-arabic" dir="rtl">${w.sentenceAr}</div>
                  </div>

                  ${w.workplaceTip ? `
                    <div class="career-word-tip">
                      💡 <strong>نصيحة مهنية:</strong> ${w.workplaceTip}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- جمل ومواقف يومية في العمل -->
          <div class="daily-phrases-card">
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
              🗣️ جمل ومواقف عملية شائعة في بيئة العمل:
            </h3>

            ${track.dailyPhrases.map(p => `
              <div class="daily-phrase-item">
                <div style="flex: 1;">
                  <div class="phrase-de" dir="ltr">"${p.de}"</div>
                  <div class="phrase-ar">${p.ar}</div>
                  <div class="phrase-ctx">📌 ${p.context}</div>
                </div>
                <button class="btn-audio-mini" data-action="speak-phrase" data-text="${p.de}" title="استمع للجملة">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // تبديل المسارات
    const trackButtons = this.container.querySelectorAll('.career-track-btn');
    trackButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-track');
        this.setTrack(key);
      });
    });

    // أزرار تشغيل الصوت
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;

      const text = btn.getAttribute('data-text');
      if (text) {
        audioPlayer.speak(text, btn);
      }
    });
  }
}
