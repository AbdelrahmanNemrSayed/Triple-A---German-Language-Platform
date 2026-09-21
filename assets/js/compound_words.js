// assets/js/compound_words.js
// أداة تفكيك الكلمات الألمانية المركبة (Komposita Deconstructor) - منصة Triple A PRO

import { COMPOUND_RULES_INFO, COMPOUND_WORDS_LIST } from '../../data/compound_words.js';
import { AudioPlayer } from './audio.js';

export class CompoundWords {
  constructor(mountSelector = '#compounds-mount') {
    this.mountEl = document.querySelector(mountSelector);
    this.currentLevel = 'all';
    this.searchQuery = '';
    this.activeCategory = 'all';
  }

  init() {
    if (!this.mountEl) return;
    this.render();
  }

  render() {
    const categories = ['all', ...new Set(COMPOUND_WORDS_LIST.map(c => c.category))];
    const filteredList = this.getFilteredList();

    this.mountEl.innerHTML = `
      <div class="compounds-container">
        <!-- Hero Header -->
        <header class="compounds-header">
          <div class="compounds-title-wrap">
            <span class="vault-badge">
              <i class="fa-solid fa-puzzle-piece"></i>
              أسرار بنية الكلمات الألمانية
            </span>
            <h2 class="compounds-main-title">مختبر تفكيك الكلمات المركبة (Komposita)</h2>
            <p class="compounds-subtitle">اكتشف كيف يركب الألمان كلماتهم الطويلة، وافهم سر تحديد أداة التعريف (der, die, das) بكل بساطة</p>
          </div>

          <!-- Golden Rule Alert Banner -->
          <div class="compounds-golden-banner">
            <div class="golden-icon"><i class="fa-solid fa-crown"></i></div>
            <div class="golden-content">
              <h4>القاعدة الذهبية للكلمات المركبة</h4>
              <p><strong>الكلمة الأخيرة هي الملكة:</strong> هي التي تحدد دائماً أداة التعريف وصيغة الجمع والمعنى الجوهري للكلمة بأكملها، مهما كان طولها!</p>
            </div>
          </div>
        </header>

        <!-- Search & Filter Controls -->
        <div class="compounds-toolbar">
          <div class="comp-search-box">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" id="comp-search-input" placeholder="ابحث عن كلمة مركبة أو معنى بالعربية أو الألمانية..." value="${this.searchQuery}" />
            ${this.searchQuery ? '<button class="clear-search-btn" id="comp-clear-search"><i class="fa-solid fa-xmark"></i></button>' : ''}
          </div>

          <div class="comp-filter-group">
            <div class="level-pills">
              <button class="comp-pill ${this.currentLevel === 'all' ? 'active' : ''}" data-level="all">الكل (${COMPOUND_WORDS_LIST.length})</button>
              <button class="comp-pill ${this.currentLevel === 'A1' ? 'active' : ''}" data-level="A1">مستوى A1</button>
              <button class="comp-pill ${this.currentLevel === 'A2' ? 'active' : ''}" data-level="A2">مستوى A2</button>
              <button class="comp-pill ${this.currentLevel === 'B1' ? 'active' : ''}" data-level="B1">مستوى B1</button>
            </div>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="compounds-grid">
          ${filteredList.length === 0 ? `
            <div class="empty-compounds-state">
              <i class="fa-solid fa-magnifying-glass-chart"></i>
              <h3>لم يتم العثور على كلمات مطابقة</h3>
              <p>جرّب البحث بكلمة أخرى أو إعادة تعيين الفلاتر</p>
            </div>
          ` : filteredList.map(item => this.renderCompoundCard(item)).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  getFilteredList() {
    return COMPOUND_WORDS_LIST.filter(item => {
      const matchesLevel = this.currentLevel === 'all' || item.level === this.currentLevel;
      const q = this.searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        item.word.toLowerCase().includes(q) ||
        item.meaningAr.toLowerCase().includes(q) ||
        item.parts.some(p => p.text.toLowerCase().includes(q) || p.translation.toLowerCase().includes(q));

      return matchesLevel && matchesSearch;
    });
  }

  renderCompoundCard(item) {
    const article = item.word.split(' ')[0]; // der, die, das
    const cleanWord = item.word.replace(/^(der|die|das)\s+/, '');

    return `
      <div class="compound-card animate-card" data-id="${item.id}">
        <div class="comp-card-top">
          <div class="comp-level-badge level-${item.level.toLowerCase()}">${item.level}</div>
          <span class="comp-cat-tag"><i class="fa-solid fa-tag"></i> ${item.category}</span>
          <button class="btn-listen-mini" data-speak="${encodeURIComponent(item.word)}" title="استمع لنطق الكلمة كاملة: ${item.word}">
            <svg class="speaker-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path class="audio-wave wave-1" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path class="audio-wave wave-2" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        </div>

        <!-- Main Headline (LTR so Article precedes the Noun: der Handschuh) -->
        <div class="comp-main-word" dir="ltr">
          <span class="comp-article art-${article}">${article}</span>
          <span class="comp-word-text">${cleanWord}</span>
        </div>
        <div class="comp-plural">
          <span class="comp-plural-label">الجمع:</span>
          <span class="comp-plural-val" dir="ltr">${item.plural}</span>
        </div>
        <div class="comp-ar-title">${item.meaningAr}</div>

        <!-- Deconstruction Flow Visualizer -->
        <div class="comp-flow-box">
          <div class="flow-header">
            <span><i class="fa-solid fa-diagram-project"></i> التفكيك التركيبي:</span>
          </div>

          <div class="flow-pieces" dir="ltr">
            ${item.parts.map((p, idx) => `
              <div class="piece-box ${idx === item.parts.length - 1 ? 'core-piece art-' + article : ''}">
                <div class="piece-text-row">
                  <span class="piece-text">${p.text}</span>
                  <button class="btn-listen-tiny" data-speak="${encodeURIComponent(p.text)}" title="استمع للجزء (${p.text})">
                    <svg class="speaker-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path class="audio-wave wave-1" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      <path class="audio-wave wave-2" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                  </button>
                </div>
                <span class="piece-trans">${p.translation}</span>
                <span class="piece-type">${p.type}</span>
              </div>
              ${idx < item.parts.length - 1 ? `
                <div class="flow-plus">
                  ${item.fugen ? `<span class="fugen-chip" title="حرف وصل للنطق">+ ${item.fugen} +</span>` : '<i class="fa-solid fa-plus"></i>'}
                </div>
              ` : ''}
            `).join('')}
          </div>
        </div>

        <!-- Explanation Footer -->
        <div class="comp-explanation">
          <i class="fa-solid fa-lightbulb"></i>
          <p>${item.explanation}</p>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Search input
    const searchInput = this.mountEl.querySelector('#comp-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const grid = this.mountEl.querySelector('.compounds-grid');
        if (grid) {
          const filtered = this.getFilteredList();
          grid.innerHTML = filtered.length === 0 ? `
            <div class="empty-compounds-state">
              <i class="fa-solid fa-magnifying-glass-chart"></i>
              <h3>لم يتم العثور على كلمات مطابقة</h3>
              <p>جرّب البحث بكلمة أخرى</p>
            </div>
          ` : filtered.map(item => this.renderCompoundCard(item)).join('');
          this.bindAudioButtons();
        }
      });
    }

    // Clear search
    const clearBtn = this.mountEl.querySelector('#comp-clear-search');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.searchQuery = '';
        this.render();
      });
    }

    // Level filter pills
    this.mountEl.querySelectorAll('.comp-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const lvl = pill.dataset.level;
        if (lvl && lvl !== this.currentLevel) {
          this.currentLevel = lvl;
          this.render();
        }
      });
    });

    this.bindAudioButtons();
  }

  bindAudioButtons() {
    this.mountEl.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = decodeURIComponent(btn.dataset.speak);
        AudioPlayer.speak(text, btn);
      });
    });
  }
}
