// assets/js/prep_verbs.js - قاموس وتحدي الأفعال مع حروف الجر (Verben mit Präpositionen)
import { prepositionVerbsData } from '../../data/preposition_verbs.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class PrepositionVerbsManager {
  constructor(containerEl, onXPUpdate) {
    this.container = containerEl;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.filterCase = 'ALL'; // 'ALL', 'akkusativ', 'dativ', 'both'
    this.searchQuery = '';
    this.currentMode = 'dictionary'; // 'dictionary', 'quiz'

    // حالة تحدي حروف الجر
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;
    this.quizSelectedOption = null;
  }

  getFilteredData() {
    return prepositionVerbsData.filter(item => {
      const matchCase = this.filterCase === 'ALL' || item.kasus === this.filterCase;
      const q = this.searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.verb.toLowerCase().includes(q) || 
        item.prep.toLowerCase().includes(q) || 
        item.arabic.includes(q);
      return matchCase && matchSearch;
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="prep-verbs-section">
        <!-- Banner -->
        <div class="prep-verbs-banner">
          <div class="prep-banner-content">
            <span class="prep-banner-badge">🎯 قواعد B1/A2 المتقدمة</span>
            <h2 class="prep-banner-title">قاموس الأفعال مع حروف الجر والحالات (Kasus)</h2>
            <p class="prep-banner-desc">
              أتقن أدق تفاصيل اللغة الألمانية: متى يأتي الفعل مع Akkusativ ومتى مع Dativ، وصيغ السؤال عن الأشخاص والأشياء (Worauf? / Auf wen?).
            </p>
          </div>

          <!-- Mode Switcher -->
          <div class="prep-mode-switcher">
            <button class="btn-prep-mode ${this.currentMode === 'dictionary' ? 'active' : ''}" id="btn-mode-dict">
              📖 القاموس الشامل
            </button>
            <button class="btn-prep-mode ${this.currentMode === 'quiz' ? 'active' : ''}" id="btn-mode-quiz">
              ⚡ تحدي حروف الجر السريع (+20 XP)
            </button>
          </div>
        </div>

        ${this.currentMode === 'dictionary' ? this.renderDictionaryView() : this.renderQuizView()}
      </div>
    `;

    this.bindEvents();
  }

  renderDictionaryView() {
    const items = this.getFilteredData();

    return `
      <!-- Filter Bar -->
      <div class="prep-filter-card">
        <div class="search-box-wrapper prep-search-wrapper" id="prep-search-wrapper">
          <span class="search-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input type="text" id="prep-search-input" class="search-input" placeholder="ابحث عن فعل، حرف جر، أو معنى (مثال: warten, auf, ينتظر)..." value="${this.searchQuery}" autocomplete="off" spellcheck="false">
          <button type="button" class="search-clear-btn" id="btn-clear-prep-search" aria-label="مسح البحث" title="مسح">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="prep-case-pills">
          <button class="prep-case-pill ${this.filterCase === 'ALL' ? 'active' : ''}" data-case="ALL">
            الكل (${prepositionVerbsData.length})
          </button>
          <button class="prep-case-pill pill-akk ${this.filterCase === 'akkusativ' ? 'active' : ''}" data-case="akkusativ">
            🔹 Akkusativ (النصب)
          </button>
          <button class="prep-case-pill pill-dat ${this.filterCase === 'dativ' ? 'active' : ''}" data-case="dativ">
            🔸 Dativ (المجرور)
          </button>
          <button class="prep-case-pill pill-both ${this.filterCase === 'both' ? 'active' : ''}" data-case="both">
            🔄 مشترك (حسب السياق)
          </button>
        </div>
      </div>

      <!-- Count -->
      <div class="prep-count-row">
        <span>يتم عرض <strong>${items.length}</strong> فعلاً معتمداً</span>
      </div>

      <!-- Grid -->
      <div class="prep-verbs-grid">
        ${items.length === 0 ? `
          <div class="no-items-card">
            <p>لا توجد أفعال تطابق الفلترة الحالية.</p>
          </div>
        ` : items.map(item => this.renderPrepCard(item)).join('')}
      </div>
    `;
  }

  renderPrepCard(item) {
    const isAkk = item.kasus === 'akkusativ';
    const isDat = item.kasus === 'dativ';
    const caseLabel = isAkk ? '+ Akkusativ' : (isDat ? '+ Dativ' : 'Akkusativ / Dativ');

    return `
      <div class="prep-verb-card kasus-${item.kasus}">
        <div class="prep-card-top">
          <div class="prep-verb-title">
            <h3 class="pv-verb-name" dir="ltr">${item.verb}</h3>
            <span class="pv-prep-badge" dir="ltr">${item.prep}</span>
          </div>
          <span class="pv-case-badge badge-${item.kasus}">${caseLabel}</span>
        </div>

        <p class="pv-arabic-meaning">${item.arabic}</p>

        <!-- Question Patterns -->
        <div class="pv-questions-row">
          <div class="pv-q-item">
            <span class="q-label">سؤال عن شيء:</span>
            <code class="q-code" dir="ltr">${item.questionThing}</code>
          </div>
          <div class="pv-q-item">
            <span class="q-label">سؤال عن شخص:</span>
            <code class="q-code" dir="ltr">${item.questionPerson}</code>
          </div>
        </div>

        <!-- Example Sentence -->
        <div class="pv-example-box">
          <div class="pv-example-de" dir="ltr">${item.exampleDe}</div>
          <div class="pv-example-ar">${item.exampleAr}</div>
        </div>

        <!-- Audio Action: Separate Verb & Sentence -->
        <div class="pv-card-footer">
          <button class="btn-pv-audio btn-speak-prep-verb" data-action="speak-verb" data-pv-id="${item.id}" title="استمع لنطق الفعل وحرف الجر: ${item.verb} ${item.prep}">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            <span>استمع للفعل</span>
          </button>
          <button class="btn-pv-audio btn-pv-sentence" data-action="speak-sentence" data-pv-id="${item.id}" title="استمع لنطق جملة المثال فقط">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            <span>استمع للجملة</span>
          </button>
        </div>
      </div>
    `;
  }

  renderQuizView() {
    const currentQuestion = prepositionVerbsData[this.quizIndex % prepositionVerbsData.length];
    
    // خيارات الإجابة (3 خيارات عشوائية مع الحقيقي)
    const options = [
      `${currentQuestion.prep} + ${currentQuestion.kasus === 'akkusativ' ? 'Akkusativ' : (currentQuestion.kasus === 'dativ' ? 'Dativ' : 'Akk/Dat')}`
    ];
    const distractorPreps = ['auf', 'an', 'für', 'über', 'mit', 'zu', 'von', 'um'].filter(p => p !== currentQuestion.prep);
    const distractorCases = ['Akkusativ', 'Dativ'];

    while (options.length < 4) {
      const p = distractorPreps[Math.floor(Math.random() * distractorPreps.length)];
      const c = distractorCases[Math.floor(Math.random() * distractorCases.length)];
      const candidate = `${p} + ${c}`;
      if (!options.includes(candidate)) {
        options.push(candidate);
      }
    }
    // خلط الخيارات
    options.sort(() => 0.5 - Math.random());

    return `
      <div class="prep-quiz-wrapper">
        <div class="prep-quiz-card">
          <div class="quiz-status-row">
            <span class="quiz-counter">التحدي ${this.quizIndex + 1} من 10</span>
            <span class="quiz-score-indicator">النقاط: <strong>${this.quizScore}</strong></span>
          </div>

          <div class="prep-quiz-question">
            <span class="quiz-prompt">ما هو حرف الجر والحالة الإعرابية الصحيحة للفعل:</span>
            <h3 class="quiz-verb-display" dir="ltr">${currentQuestion.verb}</h3>
            <p class="quiz-verb-meaning">(${currentQuestion.arabic})</p>
          </div>

          <!-- Sentence with blank -->
          <div class="quiz-sentence-blank" dir="ltr">
            ${currentQuestion.exampleDe.replace(new RegExp(currentQuestion.prep, 'i'), '_____')}
          </div>

          <div class="prep-quiz-options-grid">
            ${options.map(opt => {
              let btnClass = '';
              if (this.quizAnswered) {
                const isCorrect = opt.startsWith(currentQuestion.prep);
                if (isCorrect) btnClass = 'correct-opt';
                else if (this.quizSelectedOption === opt) btnClass = 'wrong-opt';
              }
              return `
                <button class="btn-prep-opt ${btnClass}" data-opt="${opt}" dir="ltr">
                  ${opt}
                </button>
              `;
            }).join('')}
          </div>

          ${this.quizAnswered ? `
            <div class="prep-quiz-feedback">
              <div class="feedback-text">
                💡 الجملة الصحيحة: <span dir="ltr">"${currentQuestion.exampleDe}"</span>
              </div>
              <button class="btn-next-prep-q" id="btn-next-prep-q">
                السؤال التالي ⬅️
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // تبديل النمط (قاموس / كويز)
    const modeDictBtn = this.container.querySelector('#btn-mode-dict');
    const modeQuizBtn = this.container.querySelector('#btn-mode-quiz');
    if (modeDictBtn) modeDictBtn.addEventListener('click', () => { this.currentMode = 'dictionary'; this.render(); });
    if (modeQuizBtn) modeQuizBtn.addEventListener('click', () => { this.currentMode = 'quiz'; this.render(); });

    // فلترة الحالات
    const casePills = this.container.querySelectorAll('.prep-case-pill');
    casePills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.filterCase = pill.getAttribute('data-case');
        this.render();
      });
    });

    // البحث
    const searchInput = this.container.querySelector('#prep-search-input');
    const searchWrapper = this.container.querySelector('#prep-search-wrapper');
    const clearBtn = this.container.querySelector('#btn-clear-prep-search');

    if (searchWrapper && searchInput && searchInput.value.trim().length > 0) {
      searchWrapper.classList.add('has-text');
    }

    const updatePrepResults = () => {
      const items = this.getFilteredData();
      const grid = this.container.querySelector('.prep-verbs-grid');
      const count = this.container.querySelector('.prep-count-row');
      if (count) count.innerHTML = `<span>يتم عرض <strong>${items.length}</strong> فعلاً معتمداً</span>`;
      if (grid) {
        grid.innerHTML = items.length === 0 ? `
          <div class="no-items-card"><p>لا توجد أفعال تطابق الفلترة الحالية.</p></div>
        ` : items.map(item => this.renderPrepCard(item)).join('');
        this.bindAudioButtons();
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (searchWrapper) {
          if (e.target.value.trim().length > 0) {
            searchWrapper.classList.add('has-text');
          } else {
            searchWrapper.classList.remove('has-text');
          }
        }
        updatePrepResults();
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          this.searchQuery = '';
          if (searchWrapper) searchWrapper.classList.remove('has-text');
          updatePrepResults();
          searchInput.blur();
        }
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.searchQuery = '';
        if (searchWrapper) searchWrapper.classList.remove('has-text');
        updatePrepResults();
        searchInput.focus();
      });
    }

    this.bindAudioButtons();
    this.bindQuizEvents();
  }

  bindAudioButtons() {
    const audioBtns = this.container.querySelectorAll('[data-action="speak-verb"], [data-action="speak-sentence"]');
    audioBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-pv-id');
        const action = btn.getAttribute('data-action');
        const item = prepositionVerbsData.find(d => d.id === id);
        if (!item) return;

        if (action === 'speak-verb') {
          // نطق الفعل وحرف الجر فقط (e.g. "warten auf")
          audioPlayer.speak(`${item.verb} ${item.prep}`, btn);
          Storage.addXP(3);
          this.onXPUpdate();
        } else if (action === 'speak-sentence') {
          // نطق جملة المثال فقط
          audioPlayer.speak(item.exampleDe, btn);
          Storage.addXP(5);
          this.onXPUpdate();
        }
      });
    });
  }

  bindQuizEvents() {
    if (this.currentMode !== 'quiz') return;

    const optBtns = this.container.querySelectorAll('.btn-prep-opt');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.quizAnswered) return;
        this.quizAnswered = true;
        const chosen = btn.getAttribute('data-opt');
        this.quizSelectedOption = chosen;

        const currentQ = prepositionVerbsData[this.quizIndex % prepositionVerbsData.length];
        const isCorrect = chosen.startsWith(currentQ.prep);

        if (isCorrect) {
          this.quizScore += 10;
          Storage.addXP(20);
          Storage.unlockBadge('badge_grammar');
          this.onXPUpdate();
        }

        this.render();
      });
    });

    const nextBtn = this.container.querySelector('#btn-next-prep-q');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.quizIndex += 1;
        this.quizAnswered = false;
        this.quizSelectedOption = null;
        this.render();
      });
    }
  }
}
