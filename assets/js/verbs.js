// assets/js/verbs.js - مصرف تصريف الأفعال الألمانية والأزمنة (Verb Conjugator & Tenses)
import { verbsData } from '../../data/verbs.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class VerbsManager {
  constructor(containerEl, onXPUpdate) {
    this.container = containerEl;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.activeTense = 'praesens'; // 'praesens', 'praeteritum', 'perfekt'
    this.filterType = 'ALL'; // 'ALL', 'regular', 'irregular', 'modal', 'separable'
    this.filterLevel = 'ALL'; // 'ALL', 'A1', 'A2', 'B1'
    this.searchQuery = '';
    this.activePracticeVerbId = null;
  }

  getFilteredVerbs() {
    return verbsData.filter(v => {
      const matchType = this.filterType === 'ALL' || v.type === this.filterType;
      const matchLevel = this.filterLevel === 'ALL' || v.level === this.filterLevel;
      const q = this.searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        v.infinitive.toLowerCase().includes(q) || 
        v.arabic.includes(q) ||
        (v.separablePrefix && v.separablePrefix.toLowerCase().includes(q));
      return matchType && matchLevel && matchSearch;
    });
  }

  render() {
    const verbs = this.getFilteredVerbs();

    this.container.innerHTML = `
      <div class="verbs-section">
        <!-- Banner -->
        <div class="verbs-banner">
          <div class="verbs-banner-content">
            <span class="verbs-badge">⚡ مصرف الأفعال وجداول الأزمنة (Verbtabellen)</span>
            <h2 class="verbs-banner-title">دليل تصريف أهم الأفعال الألمانية</h2>
            <p class="verbs-banner-desc">
              استكشف تصريف الأفعال الشائعة والشاّذة والمنفصلة في الحاضر والماضي البسيط والماضي التام مع نطق صوتي وأمثلة حية من واقع الحياة اليومية.
            </p>
          </div>
        </div>

        <!-- Filter Deck -->
        <div class="verbs-filter-card">
          <div class="verbs-filter-row-top">
            <!-- Search -->
            <div class="search-box-wrapper verbs-search" id="verbs-search-wrapper">
              <span class="search-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input type="text" id="verbs-search-input" class="search-input" placeholder="ابحث عن فعل بالألمانية أو العربية (مثال: gehen, يذهب)..." value="${this.searchQuery}" autocomplete="off" spellcheck="false">
              <button type="button" class="search-clear-btn" id="btn-clear-verbs-search" aria-label="مسح البحث" title="مسح">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <!-- Tense Selector Tabs -->
            <div class="tense-selector-pills">
              <button class="tense-pill ${this.activeTense === 'praesens' ? 'active' : ''}" data-tense="praesens">
                الحاضر (Präsens)
              </button>
              <button class="tense-pill ${this.activeTense === 'praeteritum' ? 'active' : ''}" data-tense="praeteritum">
                الماضي البسيط (Präteritum)
              </button>
              <button class="tense-pill ${this.activeTense === 'perfekt' ? 'active' : ''}" data-tense="perfekt">
                الماضي التام (Perfekt)
              </button>
            </div>
          </div>

          <!-- Types & Level Filters -->
          <div class="verbs-filter-row-bottom">
            <div class="verb-type-filters">
              <span class="filter-label">نوع الفعل:</span>
              <button class="type-filter-btn ${this.filterType === 'ALL' ? 'active' : ''}" data-type="ALL">الكل (${verbsData.length})</button>
              <button class="type-filter-btn ${this.filterType === 'irregular' ? 'active' : ''}" data-type="irregular">شاذ / قوي (Stark)</button>
              <button class="type-filter-btn ${this.filterType === 'separable' ? 'active' : ''}" data-type="separable">منفصل (Trennbar)</button>
              <button class="type-filter-btn ${this.filterType === 'modal' ? 'active' : ''}" data-type="modal">مساعد (Modal)</button>
              <button class="type-filter-btn ${this.filterType === 'regular' ? 'active' : ''}" data-type="regular">منتظم (Regulär)</button>
            </div>

            <div class="verb-level-filters">
              <span class="filter-label">المستوى:</span>
              <button class="verb-lvl-btn ${this.filterLevel === 'ALL' ? 'active' : ''}" data-level="ALL">الكل</button>
              <button class="verb-lvl-btn ${this.filterLevel === 'A1' ? 'active' : ''}" data-level="A1">A1</button>
              <button class="verb-lvl-btn ${this.filterLevel === 'A2' ? 'active' : ''}" data-level="A2">A2</button>
              <button class="verb-lvl-btn ${this.filterLevel === 'B1' ? 'active' : ''}" data-level="B1">B1</button>
            </div>
          </div>
        </div>

        <!-- Count Indicator -->
        <div class="verbs-count-row">
          <span>يتم عرض <strong>${verbs.length}</strong> من إجمالي <strong>${verbsData.length}</strong> فعلاً معتمداً</span>
        </div>

        <!-- Verbs Grid -->
        <div class="verbs-grid">
          ${verbs.length === 0 ? `
            <div class="no-verbs-found">
              <p>لم يتم العثور على أفعال تطابق البحث الحالي.</p>
            </div>
          ` : verbs.map(v => this.renderVerbCard(v)).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderVerbCard(v) {
    const isPerfekt = this.activeTense === 'perfekt';
    const isPraeteritum = this.activeTense === 'praeteritum';

    return `
      <div class="verb-card verb-type-${v.type}" id="verb-card-${v.id}">
        <div class="verb-card-header">
          <div class="verb-title-group">
            <h3 class="verb-infinitive" dir="ltr">${v.infinitive}</h3>
            <span class="verb-arabic-meaning">${v.arabic}</span>
          </div>
          <div class="verb-badges-group">
            <span class="verb-badge badge-${v.level.toLowerCase()}">${v.level}</span>
            <span class="verb-type-tag">${this.getTypeLabel(v.type)}</span>
            <span class="verb-aux-tag">Hilfsverb: ${v.hilfsverb}</span>
          </div>
        </div>

        <!-- Conjugation Table for Active Tense -->
        <div class="conjugation-table-wrapper">
          ${isPerfekt ? `
            <div class="perfekt-highlight-box">
              <div class="perfekt-formula">
                <span class="aux-verb">${v.hilfsverb} (Präsens)</span> + <span class="partizip-verb" dir="ltr">${v.perfekt.partizip2}</span>
              </div>
              <div class="perfekt-sample" dir="ltr">${v.perfekt.fullForm}</div>
            </div>
          ` : ''}

          <table class="conjugation-table">
            <tbody>
              <tr>
                <td class="pronoun-col">ich</td>
                <td class="form-col" dir="ltr"><strong>${isPraeteritum ? v.praeteritum.ich : (isPerfekt ? `${v.hilfsverb === 'sein' ? 'bin' : 'habe'} ${v.perfekt.partizip2}` : v.praesens.ich)}</strong></td>
                <td class="pronoun-col">wir</td>
                <td class="form-col" dir="ltr"><strong>${isPraeteritum ? v.praeteritum.wir : (isPerfekt ? `${v.hilfsverb === 'sein' ? 'sind' : 'haben'} ${v.perfekt.partizip2}` : v.praesens.wir)}</strong></td>
              </tr>
              <tr>
                <td class="pronoun-col">du</td>
                <td class="form-col" dir="ltr"><strong>${isPraeteritum ? v.praeteritum.du : (isPerfekt ? `${v.hilfsverb === 'sein' ? 'bist' : 'hast'} ${v.perfekt.partizip2}` : v.praesens.du)}</strong></td>
                <td class="pronoun-col">ihr</td>
                <td class="form-col" dir="ltr"><strong>${isPraeteritum ? v.praeteritum.ihr : (isPerfekt ? `${v.hilfsverb === 'sein' ? 'seid' : 'habt'} ${v.perfekt.partizip2}` : v.praesens.ihr)}</strong></td>
              </tr>
              <tr>
                <td class="pronoun-col">er/sie/es</td>
                <td class="form-col" dir="ltr"><strong>${isPraeteritum ? v.praeteritum.er_sie_es : (isPerfekt ? `${v.hilfsverb === 'sein' ? 'ist' : 'hat'} ${v.perfekt.partizip2}` : v.praesens.er_sie_es)}</strong></td>
                <td class="pronoun-col">sie/Sie</td>
                <td class="form-col" dir="ltr"><strong>${isPraeteritum ? v.praeteritum.sie_Sie : (isPerfekt ? `${v.hilfsverb === 'sein' ? 'sind' : 'haben'} ${v.perfekt.partizip2}` : v.praesens.sie_Sie)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Separable Note if any -->
        ${v.separablePrefix ? `
          <div class="separable-note">
            ⚡ <strong>فعل منفصل:</strong> البادئة <code dir="ltr">${v.separablePrefix}-</code> تنفصل وتذهب إلى آخر الجملة في الحاضر!
          </div>
        ` : ''}

        <!-- Example Sentence -->
        <div class="verb-example-box">
          <div class="verb-example-de" dir="ltr">${v.exampleDe}</div>
          <div class="verb-example-ar">${v.exampleAr}</div>
        </div>

        <!-- Audio Actions: Separate Verb & Sentence -->
        <div class="verb-card-footer">
          <button class="btn-verb-audio btn-speak-verb" data-action="speak-verb" data-verb-id="${v.id}" title="استمع لنطق الفعل فقط (${v.infinitive})">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            <span>استمع للفعل</span>
          </button>
          <button class="btn-verb-audio btn-verb-sentence" data-action="speak-sentence" data-verb-id="${v.id}" title="استمع لقراءة جملة المثال فقط">
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

  getTypeLabel(type) {
    const map = {
      irregular: 'شاذ / قوي',
      regular: 'منتظم',
      modal: 'فعل مساعد',
      separable: 'منفصل'
    };
    return map[type] || type;
  }

  bindEvents() {
    // تصفية الأزمنة
    const tenseBtns = this.container.querySelectorAll('.tense-pill');
    tenseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTense = btn.getAttribute('data-tense');
        this.render();
      });
    });

    // تصفية نوع الفعل
    const typeBtns = this.container.querySelectorAll('.type-filter-btn');
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterType = btn.getAttribute('data-type');
        this.render();
      });
    });

    // تصفية المستوى
    const lvlBtns = this.container.querySelectorAll('.verb-lvl-btn');
    lvlBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterLevel = btn.getAttribute('data-level');
        this.render();
      });
    });

    // البحث
    const searchInput = this.container.querySelector('#verbs-search-input');
    const searchWrapper = this.container.querySelector('#verbs-search-wrapper');
    const clearBtn = this.container.querySelector('#btn-clear-verbs-search');

    if (searchWrapper && searchInput && searchInput.value.trim().length > 0) {
      searchWrapper.classList.add('has-text');
    }

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
        this.updateGridOnly();
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          this.searchQuery = '';
          if (searchWrapper) searchWrapper.classList.remove('has-text');
          this.updateGridOnly();
          searchInput.blur();
        }
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.searchQuery = '';
        if (searchWrapper) searchWrapper.classList.remove('has-text');
        this.updateGridOnly();
        searchInput.focus();
      });
    }

    // نطق صوتي منفصل (الفعل بشكل مستقل والجملة بشكل مستقل)
    this.bindAudioEvents(this.container);
  }

  bindAudioEvents(rootEl = this.container) {
    if (!rootEl) return;
    const audioBtns = rootEl.querySelectorAll('[data-action="speak-verb"], [data-action="speak-sentence"]');
    audioBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-verb-id');
        const action = btn.getAttribute('data-action');
        const v = verbsData.find(item => item.id === id);
        if (!v) return;

        if (action === 'speak-verb') {
          // نطق الفعل فقط
          audioPlayer.speak(v.infinitive, btn);
          Storage.addXP(3);
          this.onXPUpdate();
        } else if (action === 'speak-sentence') {
          // نطق الجملة فقط
          audioPlayer.speak(v.exampleDe, btn);
          Storage.addXP(5);
          this.onXPUpdate();
        }
      });
    });
  }

  updateGridOnly() {
    const verbs = this.getFilteredVerbs();
    const grid = this.container.querySelector('.verbs-grid');
    const countRow = this.container.querySelector('.verbs-count-row');

    if (countRow) {
      countRow.innerHTML = `<span>يتم عرض <strong>${verbs.length}</strong> من إجمالي <strong>${verbsData.length}</strong> فعلاً معتمداً</span>`;
    }

    if (grid) {
      grid.innerHTML = verbs.length === 0 ? `
        <div class="no-verbs-found">
          <p>لم يتم العثور على أفعال تطابق البحث الحالي.</p>
        </div>
      ` : verbs.map(v => this.renderVerbCard(v)).join('');

      // إعادة ربط أزرار الصوت للبطاقات المحدثة
      this.bindAudioEvents(grid);
    }
  }
}
