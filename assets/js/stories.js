// assets/js/stories.js - مدير مختبر الاستماع والقصص التفاعلية (Hörverstehen)
import { storiesData } from '../../data/stories.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class StoriesManager {
  constructor(containerEl, onXPUpdate) {
    this.container = containerEl;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.currentStoryId = storiesData[0].id;
    this.activeLineId = null;
    this.showTranslations = true;
    this.isPlayingAll = false;
    this.autoPlayTimeout = null;
    this.quizAnswers = {};
    this.quizSubmitted = false;
  }

  getCurrentStory() {
    return storiesData.find(s => s.id === this.currentStoryId) || storiesData[0];
  }

  render() {
    const currentStory = this.getCurrentStory();

    this.container.innerHTML = `
      <div class="stories-section">
        <!-- Banner -->
        <div class="stories-banner">
          <div class="stories-banner-content">
            <span class="stories-badge">🎧 مختبر الاستماع والفهم (Hörverstehen)</span>
            <h2 class="stories-banner-title">قصص ألمانية تفاعلية مع تتبع صوتي حي</h2>
            <p class="stories-banner-desc">
              استمع إلى نصوص واقعية من الحياة اليومية في ألمانيا، وتدرب على فهم الأحاديث السريعة، وتتبع الكلمات المقروءة سطر بسطر مع اختبارات الفهم الفورية.
            </p>
          </div>
        </div>

        <!-- Stories Grid Switcher -->
        <div class="stories-tab-nav" role="tablist">
          ${storiesData.map(s => {
            const icons = {
              story_a1_berlin: '🚆',
              story_a2_shopping: '🛒',
              story_b1_wg: '🏠',
              story_b1_job: '💼'
            };
            const icon = icons[s.id] || '📖';
            return `
              <button class="story-tab-btn ${s.id === this.currentStoryId ? 'active' : ''}" data-story-id="${s.id}" type="button">
                <div class="story-tab-icon">${icon}</div>
                <div class="story-tab-info">
                  <div class="story-tab-meta">
                    <span class="story-tab-level level-${s.level.toLowerCase()}">${s.level}</span>
                    <span class="story-tab-duration">⏱️ ${s.duration}</span>
                  </div>
                  <div class="story-tab-text">${s.titleAr}</div>
                  <div class="story-tab-de" dir="ltr">${s.titleDe}</div>
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Story Main Reader Card -->
        <div class="story-reader-card">
          <div class="reader-header">
            <div class="reader-title-group">
              <span class="reader-level-pill level-${currentStory.level.toLowerCase()}">${currentStory.level}</span>
              <div>
                <h3 class="reader-title-de" dir="ltr">${currentStory.titleDe}</h3>
                <h4 class="reader-title-ar">${currentStory.titleAr}</h4>
              </div>
            </div>

            <!-- Controls -->
            <div class="reader-controls">
              <button class="btn-story-action btn-play-all" id="btn-play-story-all">
                ${this.isPlayingAll ? '⏸️ إيقاف القراءة' : '🎧 استماع للقصة كاملة'}
              </button>
              <button class="btn-story-action btn-toggle-trans" id="btn-toggle-story-trans">
                ${this.showTranslations ? '👁️ إخفاء الترجمة' : '🌐 إظهار الترجمة'}
              </button>
            </div>
          </div>

          <div class="reader-summary">
            💡 <strong>ملخص:</strong> ${currentStory.summaryAr}
          </div>

          <!-- Paragraphs List -->
          <div class="story-lines-container" id="story-lines-container">
            ${currentStory.paragraphs.map(p => `
              <div class="story-line-item ${this.activeLineId === p.id ? 'active-reading' : ''}" data-line-id="${p.id}" id="story-line-${p.id}">
                <button class="btn-line-audio" data-line-id="${p.id}" title="استمع لهذه الجملة">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
                <div class="story-line-content">
                  <p class="line-text-de" dir="ltr">${p.de}</p>
                  ${this.showTranslations ? `<p class="line-text-ar">${p.ar}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Comprehension Quiz Card -->
        <div class="story-quiz-card">
          <div class="quiz-header-row">
            <h3 class="story-quiz-title">📝 اختبار الفهم السمعي (Verständnis-Check)</h3>
            <span class="quiz-xp-badge">+25 XP عند الإجابة</span>
          </div>

          <div class="story-questions-list">
            ${currentStory.quiz.map((q, qIndex) => {
              const selectedAnswer = this.quizAnswers[qIndex];
              const isAnswered = selectedAnswer !== undefined;

              return `
                <div class="story-question-box">
                  <div class="question-header">
                    <span class="q-num">السؤال ${qIndex + 1}</span>
                    <p class="q-title-de" dir="ltr">${q.questionDe}</p>
                    <p class="q-title-ar">${q.questionAr}</p>
                  </div>
                  <div class="question-options">
                    ${q.options.map((opt, optIndex) => {
                      let stateClass = '';
                      if (this.quizSubmitted) {
                        if (optIndex === q.correct) stateClass = 'correct-opt';
                        else if (selectedAnswer === optIndex) stateClass = 'incorrect-opt';
                      } else if (selectedAnswer === optIndex) {
                        stateClass = 'selected-opt';
                      }

                      return `
                        <button class="story-opt-btn ${stateClass}" data-q-index="${qIndex}" data-opt-index="${optIndex}">
                          <span class="opt-indicator"></span>
                          <span class="opt-text" dir="ltr">${opt}</span>
                        </button>
                      `;
                    }).join('')}
                  </div>
                  ${this.quizSubmitted ? `
                    <div class="quiz-answer-explanation">
                      💡 <strong>التوضيح:</strong> ${q.explanationAr}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <div class="quiz-actions-footer">
            ${!this.quizSubmitted ? `
              <button class="btn-submit-story-quiz" id="btn-submit-story-quiz">
                ✅ تصحيح الإجابات واحتساب النقاط
              </button>
            ` : `
              <button class="btn-submit-story-quiz btn-retry-quiz" id="btn-retry-story-quiz">
                🔄 إعادة محاولة الاختبار
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // تبديل القصة
    const tabBtns = this.container.querySelectorAll('.story-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.stopAutoPlay();
        this.currentStoryId = btn.getAttribute('data-story-id');
        this.activeLineId = null;
        this.quizAnswers = {};
        this.quizSubmitted = false;
        this.render();
      });
    });

    // تبديل إظهار الترجمة
    const toggleTransBtn = this.container.querySelector('#btn-toggle-story-trans');
    if (toggleTransBtn) {
      toggleTransBtn.addEventListener('click', () => {
        this.showTranslations = !this.showTranslations;
        this.render();
      });
    }

    // تشغيل القصة بالكامل
    const playAllBtn = this.container.querySelector('#btn-play-story-all');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', () => {
        if (this.isPlayingAll) {
          this.stopAutoPlay();
        } else {
          this.startAutoPlay();
        }
      });
    }

    // استماع لسطر معين
    const lineAudioBtns = this.container.querySelectorAll('.btn-line-audio, .story-line-item');
    lineAudioBtns.forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.story-opt-btn')) return;
        const lineId = parseInt(el.getAttribute('data-line-id') || el.closest('.story-line-item')?.getAttribute('data-line-id'), 10);
        if (lineId) {
          this.stopAutoPlay();
          this.playSingleLine(lineId);
        }
      });
    });

    // اختيار إجابة في الكويز
    const optBtns = this.container.querySelectorAll('.story-opt-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.quizSubmitted) return;
        const qIndex = parseInt(btn.getAttribute('data-q-index'), 10);
        const optIndex = parseInt(btn.getAttribute('data-opt-index'), 10);
        this.quizAnswers[qIndex] = optIndex;
        this.render();
      });
    });

    // تسليم الكويز
    const submitQuizBtn = this.container.querySelector('#btn-submit-story-quiz');
    if (submitQuizBtn) {
      submitQuizBtn.addEventListener('click', () => {
        const currentStory = this.getCurrentStory();
        const total = currentStory.quiz.length;
        let answered = Object.keys(this.quizAnswers).length;
        if (answered < total) {
          alert('يرجى الإجابة على جميع الأسئلة أولاً!');
          return;
        }

        this.quizSubmitted = true;
        let correctCount = 0;
        currentStory.quiz.forEach((q, idx) => {
          if (this.quizAnswers[idx] === q.correct) correctCount++;
        });

        // إضافة XP
        const xpEarned = correctCount * 10 + 10;
        Storage.addXP(xpEarned);
        Storage.unlockBadge('badge_story');
        this.onXPUpdate();

        this.render();
      });
    }

    // إعادة محاولة الكويز
    const retryQuizBtn = this.container.querySelector('#btn-retry-story-quiz');
    if (retryQuizBtn) {
      retryQuizBtn.addEventListener('click', () => {
        this.quizAnswers = {};
        this.quizSubmitted = false;
        this.render();
      });
    }
  }

  playSingleLine(lineId) {
    const currentStory = this.getCurrentStory();
    const line = currentStory.paragraphs.find(p => p.id === lineId);
    if (!line) return;

    this.activeLineId = lineId;
    this.updateActiveLineDOM();
    audioPlayer.speak(line.de, () => {
      // انتهى النطق
      this.activeLineId = null;
      this.updateActiveLineDOM();
    });
  }

  startAutoPlay() {
    this.isPlayingAll = true;
    const playAllBtn = this.container.querySelector('#btn-play-story-all');
    if (playAllBtn) playAllBtn.textContent = '⏸️ إيقاف القراءة';

    const currentStory = this.getCurrentStory();
    let currentIndex = 0;

    const playNext = () => {
      if (!this.isPlayingAll) return;
      if (currentIndex >= currentStory.paragraphs.length) {
        this.stopAutoPlay();
        Storage.addXP(15);
        this.onXPUpdate();
        return;
      }

      const line = currentStory.paragraphs[currentIndex];
      this.activeLineId = line.id;
      this.updateActiveLineDOM();

      audioPlayer.speak(line.de, () => {
        if (!this.isPlayingAll) return;
        currentIndex++;
        this.autoPlayTimeout = setTimeout(playNext, 1200);
      });
    };

    playNext();
  }

  stopAutoPlay() {
    this.isPlayingAll = false;
    if (this.autoPlayTimeout) clearTimeout(this.autoPlayTimeout);
    audioPlayer.stop();
    this.activeLineId = null;
    this.updateActiveLineDOM();
    const playAllBtn = this.container.querySelector('#btn-play-story-all');
    if (playAllBtn) playAllBtn.textContent = '🎧 استماع للقصة كاملة';
  }

  updateActiveLineDOM() {
    const lines = this.container.querySelectorAll('.story-line-item');
    lines.forEach(el => {
      const id = parseInt(el.getAttribute('data-line-id'), 10);
      el.classList.toggle('active-reading', id === this.activeLineId);
    });
  }
}
