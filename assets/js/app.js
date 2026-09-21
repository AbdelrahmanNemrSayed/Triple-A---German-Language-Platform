// تطبيق DeutschMeister Pro الرئيسي - Main Application Controller
import { allVocabulary, vocabularyByLevel, getCategoriesForLevel, getWordOfTheDay } from '../../data/vocab.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';
import { FlashcardManager } from './flashcards.js';
import { QuizEngine } from './quiz.js';
import { CareerManager } from './career.js';
import { DialogueManager } from './dialogues.js';
import { SentenceBuilder } from './sentence_builder.js';
import { SpeechTrainer } from './speech_trainer.js';
import { EmailTrainer } from './emails.js';
import { StoriesManager } from './stories.js';
import { VerbsManager } from './verbs.js';
import { PrepositionVerbsManager } from './prep_verbs.js';
import { GamificationManager } from './gamification.js';
import { LivingGuideManager } from './living_guide.js';
import { ProfileManager } from './profile_manager.js';
import { ExamSimulator } from './exam_simulator.js';
import { GrammarVault } from './grammar_vault.js';
import { CompoundWords } from './compound_words.js';
import { RadioPlayer } from './radio_player.js';
import { ArticlesTrainer } from './articles_trainer.js';
import { TimeNumbersTrainer } from './time_numbers.js';
import { DailyQuestManager } from './daily_quests.js';
import { AITandemPartner } from './ai_tandem.js';

class GermanApp {
  constructor() {
    this.currentLevel = 'A1';
    this.currentCategory = 'ALL';
    this.currentStatusFilter = 'ALL'; // 'ALL', 'FAVORITES', 'REVIEW', 'MASTERED'
    this.currentArticleFilter = 'ALL'; // 'ALL', 'der', 'die', 'das'
    this.searchQuery = '';
    this.activeView = 'vocab'; // 'vocab', 'career', 'dialogues', 'builder', 'speech', 'emails', 'flashcards', 'quiz'
    this.itemsPerPage = 18;
    this.visibleCount = 18;
    
    // مدراء الشاشات
    this.flashcardManager = null;
    this.quizEngine = null;
    this.careerManager = null;
    this.dialogueManager = null;
    this.sentenceBuilder = null;
    this.speechTrainer = null;
    this.emailTrainer = null;
    this.storiesManager = null;
    this.verbsManager = null;
    this.prepositionVerbsManager = null;
    this.gamificationManager = null;
    this.livingGuideManager = null;
    this.profileManager = null;
    this.examSimulator = null;
    this.grammarVault = null;
    this.compoundWords = null;
    this.radioPlayer = null;
    this.articlesTrainer = null;
    this.timeNumbersTrainer = null;
    this.dailyQuestManager = null;
    this.aiTandemPartner = null;

    this.init();
  }

  init() {
    this.initTheme();
    Storage.recordDailyVisit();
    this.initProfileManager();
    this.initDailyQuest();
    this.renderGamificationHeader();
    this.renderHeaderStats();
    this.renderWordOfTheDay();
    this.populateCategoryFilter();
    this.renderVocabGrid();
    this.bindGlobalEvents();
  }

  renderGamificationHeader() {
    const streak = Storage.getDailyStreak();
    const xp = Storage.getXP();
    const streakEl = document.getElementById('topbar-streak-num');
    const xpEl = document.getElementById('topbar-xp-num');
    if (streakEl) streakEl.textContent = streak.count;
    if (xpEl) xpEl.textContent = xp;
    if (this.dailyQuestManager) {
      this.dailyQuestManager.updateTopbarBadge();
    }
  }

  initProfileManager() {
    this.profileManager = new ProfileManager({
      onProfileChange: () => {
        this.renderGamificationHeader();
        this.renderHeaderStats();
        this.renderWordOfTheDay();
        this.renderVocabGrid();
        if (this.gamificationManager) {
          this.gamificationManager.render();
        }
      }
    });
  }

  // --- تهيئة وتغيير المظهر (Dark / Light Theme) ---
  initTheme() {
    let savedTheme = Storage.getTheme();
    // One-time migration to Modern Crisp Light theme as requested by user
    if (!localStorage.getItem('deutschmeister_theme_v3_crisp_light')) {
      savedTheme = 'light';
      Storage.setTheme('light');
      localStorage.setItem('deutschmeister_theme_v3_crisp_light', 'true');
    }
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtns = document.querySelectorAll('.btn-theme-toggle');
    themeBtns.forEach(btn => this.updateThemeIcon(btn, savedTheme));
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    Storage.setTheme(nextTheme);

    const themeBtns = document.querySelectorAll('.btn-theme-toggle');
    themeBtns.forEach(btn => this.updateThemeIcon(btn, nextTheme));
  }

  updateThemeIcon(btn, theme) {
    const isSidebarBtn = btn.id === 'theme-toggle-btn' || btn.classList.contains('btn-sidebar-util');

    if (theme === 'dark') {
      btn.setAttribute('title', 'الوضع الحالي: الوضع الليلي (اضغط للتبديل إلى الوضع النهاري)');
      if (isSidebarBtn) {
        btn.innerHTML = `
          <div class="theme-btn-content">
            <span class="theme-btn-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </span>
            <span class="btn-text">الوضع الليلي</span>
          </div>
          <span class="theme-status-badge dark-mode-active">مفعّل 🌙</span>
        `;
      } else {
        btn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span class="btn-text">الوضع الليلي</span>
        `;
      }
    } else {
      btn.setAttribute('title', 'الوضع الحالي: الوضع النهاري (اضغط للتبديل إلى الوضع الليلي)');
      if (isSidebarBtn) {
        btn.innerHTML = `
          <div class="theme-btn-content">
            <span class="theme-btn-icon-wrap" style="color: #f59e0b;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </span>
            <span class="btn-text">الوضع النهاري</span>
          </div>
          <span class="theme-status-badge light-mode-active">مفعّل ☀️</span>
        `;
      } else {
        btn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span class="btn-text">الوضع النهاري</span>
        `;
      }
    }
  }

  // --- إحصائيات الرأس وشريط التقدم ---
  renderHeaderStats() {
    const mastered = Storage.getMastered();
    const favs = Storage.getFavorites();
    const review = Storage.getNeedsReview();

    const statMasteredEl = document.getElementById('stat-mastered-count');
    const statFavsEl = document.getElementById('stat-favs-count');
    const statReviewEl = document.getElementById('stat-review-count');
    const progressBarEl = document.getElementById('overall-progress-bar');
    const progressTextEl = document.getElementById('overall-progress-text');

    // تحديث أزرار الحالة بالعدادات الحية
    const favBtn = document.getElementById('status-btn-fav');
    const revBtn = document.getElementById('status-btn-rev');
    const mstBtn = document.getElementById('status-btn-mst');
    if (favBtn) favBtn.textContent = `⭐ المفضلة (${favs.length})`;
    if (revBtn) revBtn.textContent = `🔄 مراجعة (${review.length})`;
    if (mstBtn) mstBtn.textContent = `✨ متقنة (${mastered.length})`;

    if (statMasteredEl) statMasteredEl.textContent = mastered.length;
    if (statFavsEl) statFavsEl.textContent = favs.length;
    if (statReviewEl) statReviewEl.textContent = review.length;

    const totalWords = allVocabulary.length;
    const percent = Math.min(100, Math.round((mastered.length / totalWords) * 100));

    if (progressBarEl) progressBarEl.style.width = `${percent}%`;
    if (progressTextEl) progressTextEl.textContent = `${percent}% (${mastered.length} من ${totalWords} كلمة)`;
  }

  // --- كلمة اليوم ---
  renderWordOfTheDay() {
    const wotd = getWordOfTheDay();
    const container = document.getElementById('word-of-the-day-container');
    if (!container || !wotd) return;

    const isFav = Storage.isFavorite(wotd.id);
    const articleClass = wotd.article ? `badge-${wotd.article}` : 'badge-none';

    container.innerHTML = `
      <div class="wotd-card">
        <div class="wotd-header">
          <span class="wotd-tag">🌟 كلمة اليوم (Wort des Tages)</span>
          <span class="level-badge badge-${wotd.level.toLowerCase()}">${wotd.level}</span>
        </div>
        <div class="wotd-body">
          <div class="wotd-main">
            <h3 class="wotd-german" dir="ltr">
              ${wotd.article ? `<span class="wotd-article ${articleClass}">${wotd.article}</span> ` : ''}${wotd.word}
            </h3>
            <p class="wotd-arabic">${wotd.arabic}</p>
            <div class="wotd-phonetic">🗣️ ${wotd.phonetic}</div>
          </div>
          <div class="wotd-example">
            <div class="wotd-example-de" dir="ltr">"${wotd.sentenceDe}"</div>
            <div class="wotd-example-ar">${wotd.sentenceAr}</div>
          </div>
        </div>
        <div class="wotd-actions">
          <button class="btn-audio-mini" id="wotd-audio-btn" title="استمع لكلمة اليوم">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span>استمع</span>
          </button>
          <button class="btn-icon-subtle ${isFav ? 'active' : ''}" id="wotd-fav-btn" title="حفظ في المفضلة">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#f59e0b' : 'none'}" stroke="${isFav ? '#f59e0b' : 'currentColor'}" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    const audioBtn = container.querySelector('#wotd-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        audioPlayer.speak(wotd.german, audioBtn);
      });
    }

    const favBtn = container.querySelector('#wotd-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        Storage.toggleFavorite(wotd.id);
        this.renderHeaderStats();
        this.renderWordOfTheDay();
        if (this.activeView === 'vocab') this.renderVocabGrid();
      });
    }
  }

  // --- تعبئة قائمة التصنيفات ---
  populateCategoryFilter() {
    const select = document.getElementById('category-filter-select');
    if (!select) return;

    const categories = getCategoriesForLevel(this.currentLevel);
    select.innerHTML = `<option value="ALL">جميع الموضوعات (${categories.length})</option>`;
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.key;
      opt.textContent = cat.label;
      select.appendChild(opt);
    });
    select.value = this.currentCategory;
  }

  // --- تصفية الكلمات الحالية ---
  getFilteredVocabulary() {
    let list = vocabularyByLevel[this.currentLevel] || allVocabulary;

    if (this.currentCategory !== 'ALL') {
      list = list.filter(item => item.category === this.currentCategory);
    }

    // تصفية حسب أداة التعريف
    if (this.currentArticleFilter !== 'ALL') {
      list = list.filter(item => item.article === this.currentArticleFilter);
    }

    if (this.currentStatusFilter === 'FAVORITES') {
      const favs = Storage.getFavorites();
      list = list.filter(item => favs.includes(item.id));
    } else if (this.currentStatusFilter === 'REVIEW') {
      const review = Storage.getNeedsReview();
      list = list.filter(item => review.includes(item.id));
    } else if (this.currentStatusFilter === 'MASTERED') {
      const mastered = Storage.getMastered();
      list = list.filter(item => mastered.includes(item.id));
    }

    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(item => 
        item.german.toLowerCase().includes(q) ||
        item.arabic.includes(q) ||
        (item.sentenceDe && item.sentenceDe.toLowerCase().includes(q)) ||
        (item.sentenceAr && item.sentenceAr.includes(q))
      );
    }

    return list;
  }

  // --- عرض شبكة المفردات (Vocabulary Grid) ---
  renderVocabGrid() {
    const grid = document.getElementById('vocab-cards-grid');
    if (!grid) return;

    const items = this.getFilteredVocabulary();
    const loadMoreContainer = document.getElementById('load-more-container');
    const remainingBadge = document.getElementById('load-more-remaining-badge');

    const countBadges = document.querySelectorAll('#vocab-count-indicator, .vocab-counter-tag, .deck-count-pill');

    if (items.length === 0) {
      countBadges.forEach(b => {
        b.textContent = `0 كلمة`;
      });
      if (loadMoreContainer) loadMoreContainer.style.display = 'none';

      grid.innerHTML = `
        <div class="empty-results-box">
          <div class="empty-icon">🔍</div>
          <h3>لم يتم العثور على كلمات مطابقة</h3>
          <p>جرّب تعديل مصطلح البحث أو اختيار تصنيف آخر أو إعادة ضبط الفلاتر.</p>
          <button class="btn-secondary" id="btn-reset-filters">إعادة ضبط الفلاتر</button>
        </div>
      `;

      const resetBtn = grid.querySelector('#btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.currentCategory = 'ALL';
          this.currentStatusFilter = 'ALL';
          this.searchQuery = '';
          this.visibleCount = this.itemsPerPage;
          const searchInput = document.getElementById('vocab-search-input');
          if (searchInput) searchInput.value = '';
          const categorySelect = document.getElementById('category-filter-select');
          if (categorySelect) categorySelect.value = 'ALL';
          this.renderVocabGrid();
        });
      }
      return;
    }

    const visibleItems = items.slice(0, this.visibleCount);

    countBadges.forEach(b => {
      b.textContent = `${visibleItems.length} من أصل ${items.length} كلمة`;
    });

    if (loadMoreContainer) {
      if (items.length > this.visibleCount) {
        loadMoreContainer.style.display = 'flex';
        const remaining = items.length - this.visibleCount;
        const nextBatch = Math.min(this.itemsPerPage, remaining);
        if (remainingBadge) {
          remainingBadge.textContent = `+${nextBatch} (متبقي ${remaining})`;
        }
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }

    grid.innerHTML = visibleItems.map(item => {
      const isFav = Storage.isFavorite(item.id);
      const isMastered = Storage.isMastered(item.id);
      const articleClass = item.article ? `article-${item.article}` : 'article-none';
      const articleBadgeClass = item.article ? `badge-${item.article}` : '';

      return `
        <article class="vocab-card ${articleClass} ${isMastered ? 'card-mastered' : ''}" data-id="${item.id}">
          <div class="card-header">
            <div class="card-badges">
              <span class="level-badge badge-${item.level.toLowerCase()}">${item.level}</span>
              ${item.article ? `<span class="article-badge ${articleBadgeClass}">${item.article}</span>` : ''}
              <span class="category-tag">${item.categoryAr}</span>
            </div>
            <div class="card-top-actions">
              <button class="btn-fav-card ${isFav ? 'is-active' : ''}" data-action="toggle-fav" title="المفضلة">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#f59e0b' : 'none'}" stroke="${isFav ? '#f59e0b' : 'currentColor'}" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
              <button class="btn-mastered-card ${isMastered ? 'is-active' : ''}" data-action="toggle-master" title="${isMastered ? 'كلمة متقنة' : 'تحديد كمتقنة'}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="word-pronunciation-row">
              <h3 class="card-german-word" dir="ltr">${item.german}</h3>
              <div class="audio-btn-group">
                <button class="btn-speak-word" data-action="speak-word" title="نطق الكلمة">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
                <button class="btn-speak-slow" data-action="speak-slow" title="نطق بطيء للمبتدئين">
                  <span>0.75x</span>
                </button>
              </div>
            </div>

            ${item.plural ? `<div class="card-plural"><span class="plural-label">الجمع:</span> <span dir="ltr">${item.plural}</span></div>` : ''}

            <p class="card-arabic-meaning">${item.arabic}</p>

            <div class="card-phonetic-badge">
              <span class="icon">🗣️</span>
              <span class="text">${item.phonetic}</span>
            </div>

            ${item.pronunciationTip ? `
              <div class="card-tip-note">
                <span class="tip-icon">💡</span>
                <span class="tip-text">${item.pronunciationTip}</span>
              </div>
            ` : ''}
          </div>

          <div class="card-sentence-box">
            <div class="sentence-top">
              <span class="sentence-label">الجملة التوضيحية:</span>
              <button class="btn-speak-sentence" data-action="speak-sentence" title="نطق الجملة">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </button>
            </div>
            <div class="sentence-german" dir="ltr">${item.sentenceDe}</div>
            <div class="sentence-arabic" dir="rtl">${item.sentenceAr}</div>
          </div>
        </article>
      `;
    }).join('');

    this.bindCardEvents(grid);
  }

  bindCardEvents(container) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const card = btn.closest('.vocab-card');
      if (!card) return;

      const id = card.getAttribute('data-id');
      const item = allVocabulary.find(v => v.id === id);
      if (!item) return;

      const action = btn.getAttribute('data-action');

      if (action === 'speak-word') {
        audioPlayer.speak(item.german, btn, 1.0);
      } else if (action === 'speak-slow') {
        audioPlayer.speak(item.german, btn, 0.75);
      } else if (action === 'speak-sentence') {
        audioPlayer.speak(item.sentenceDe, btn, 0.9);
      } else if (action === 'toggle-fav') {
        Storage.toggleFavorite(item.id);
        this.renderHeaderStats();
        this.renderVocabGrid();
      } else if (action === 'toggle-master') {
        if (Storage.isMastered(item.id)) {
          const mastered = Storage.getMastered();
          const idx = mastered.indexOf(item.id);
          if (idx > -1) {
            mastered.splice(idx, 1);
            localStorage.setItem('deutschmeister_mastered', JSON.stringify(mastered));
          }
        } else {
          Storage.markMastered(item.id);
        }
        this.renderHeaderStats();
        this.renderVocabGrid();
      }
    });
  }

  // --- التبديل بين الشاشات الرئيسية الموسعة ---
  switchView(viewName) {
    this.activeView = viewName;

    // تحديث أزرار شريط التنقل العلوي
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(btn => {
      const bView = btn.getAttribute('data-view');
      btn.classList.toggle('active', bView === viewName || (viewName === 'vocabulary' && bView === 'vocab') || (viewName === 'vocab' && bView === 'vocabulary'));
    });

    // تحديث أزرار شريط التنقل السفلي للموبايل
    const mobButtons = document.querySelectorAll('.mobile-nav-item');
    mobButtons.forEach(btn => {
      const bView = btn.getAttribute('data-view');
      btn.classList.toggle('active', bView === viewName || (viewName === 'vocabulary' && bView === 'vocab') || (viewName === 'vocab' && bView === 'vocabulary'));
    });

    // تحديث عنوان الشاشة في الشريط العلوي (Topbar)
    const viewTitles = {
      vocab: 'مستكشف المفردات الشامل',
      vocabulary: 'مستكشف المفردات الشامل',
      verbs: 'مصرف الأفعال الألمانية وجداول الأزمنة',
      prepositions: 'الأفعال مع حروف الجر والحالات (Kasus)',
      grammar: 'بنك القواعد الذهبي ومصفوفة الإعراب وحاسبة الصفات',
      compounds: 'مختبر تفكيك الكلمات المركبة (Komposita)',
      career: 'مسارات العمل والوظائف الألمانية',
      dialogues: 'محادثات وسيناريوهات واقعية',
      stories: 'مختبر القصص والاستماع التفاعلي (Hörverstehen)',
      builder: 'مختبر بناء الجمل وقواعدها',
      speech: 'مدرب النطق والتعرف الصوتي (ميكروفون)',
      emails: 'مولد ونماذج الإيميلات والمراسلات',
      radio: 'راديو الألمانية الحية ومحطات الأخبار البطيئة',
      flashcards: 'بطاقات الاستذكار التفاعلية (3D)',
      quiz: 'مركز الاختبارات والتقييم السريع',
      exams: 'محاكي امتحانات Goethe & Telc والشهادة المعتمدة',
      gamification: 'مركز الألعاب والتحديات والستريك اليومي',
      living: 'دليل الحياة والمعيشة في ألمانيا (Leben & Alltag)',
      articles: 'تحدي أدوات التعريف السريع (Der, Die, Das Blitz-Trainer)',
      time: 'مدرب قراءة الأرقام والساعة الألمانية (Uhrzeit & Zahlen)',
      tandem: 'شريك المحادثة الألماني وتصحيح القواعد الذكي (AI Tandem)'
    };
    const titleEl = document.getElementById('topbar-view-title');
    if (titleEl && viewTitles[viewName]) {
      titleEl.textContent = viewTitles[viewName];
    }

    const views = {
      vocab: document.getElementById('view-vocabulary'),
      vocabulary: document.getElementById('view-vocabulary'),
      verbs: document.getElementById('view-verbs'),
      prepositions: document.getElementById('view-prepositions'),
      grammar: document.getElementById('view-grammar'),
      compounds: document.getElementById('view-compounds'),
      career: document.getElementById('view-career'),
      dialogues: document.getElementById('view-dialogues'),
      stories: document.getElementById('view-stories'),
      builder: document.getElementById('view-builder'),
      speech: document.getElementById('view-speech'),
      emails: document.getElementById('view-emails'),
      radio: document.getElementById('view-radio'),
      flashcards: document.getElementById('view-flashcards'),
      quiz: document.getElementById('view-quiz'),
      exams: document.getElementById('view-exams'),
      gamification: document.getElementById('view-gamification'),
      living: document.getElementById('view-living'),
      articles: document.getElementById('view-articles'),
      time: document.getElementById('view-time'),
      tandem: document.getElementById('view-tandem')
    };

    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.toggle('hidden', key !== viewName);
      }
    });

    // تهيئة الشاشات عند تفعيلها
    if (viewName === 'exams') {
      this.initExamsView();
    } else if (viewName === 'grammar') {
      this.initGrammarView();
    } else if (viewName === 'compounds') {
      this.initCompoundsView();
    } else if (viewName === 'radio') {
      this.initRadioView();
    } else if (viewName === 'articles') {
      this.initArticlesView();
    } else if (viewName === 'time') {
      this.initTimeView();
    } else if (viewName === 'tandem') {
      this.initTandemView();
    } else if (viewName === 'career') {
      this.initCareerView();
    } else if (viewName === 'dialogues') {
      this.initDialoguesView();
    } else if (viewName === 'stories') {
      this.initStoriesView();
    } else if (viewName === 'verbs') {
      this.initVerbsView();
    } else if (viewName === 'prepositions') {
      this.initPrepositionsView();
    } else if (viewName === 'gamification') {
      this.initGamificationView();
    } else if (viewName === 'living') {
      this.initLivingView();
    } else if (viewName === 'builder') {
      this.initBuilderView();
    } else if (viewName === 'speech') {
      this.initSpeechView();
    } else if (viewName === 'emails') {
      this.initEmailsView();
    } else if (viewName === 'flashcards') {
      this.initFlashcardsView();
    } else if (viewName === 'quiz') {
      this.initQuizView();
    } else {
      this.renderVocabGrid();
    }
  }

  initArticlesView() {
    const mount = document.getElementById('articles-mount');
    if (!mount) return;
    if (!this.articlesTrainer) {
      this.articlesTrainer = new ArticlesTrainer(mount, () => this.renderGamificationHeader());
    }
    this.articlesTrainer.render();
  }

  initTimeView() {
    const mount = document.getElementById('time-mount');
    if (!mount) return;
    if (!this.timeNumbersTrainer) {
      this.timeNumbersTrainer = new TimeNumbersTrainer(mount, () => this.renderGamificationHeader());
    }
    this.timeNumbersTrainer.render();
  }

  initTandemView() {
    const mount = document.getElementById('tandem-mount');
    if (!mount) return;
    if (!this.aiTandemPartner) {
      this.aiTandemPartner = new AITandemPartner(mount, () => this.renderGamificationHeader());
    }
    this.aiTandemPartner.render();
  }

  initDailyQuest() {
    if (!this.dailyQuestManager) {
      this.dailyQuestManager = new DailyQuestManager(() => this.renderGamificationHeader());
    }
    this.dailyQuestManager.updateTopbarBadge();

    const questBtn = document.getElementById('topbar-quest-pill');
    if (questBtn) {
      questBtn.addEventListener('click', () => {
        this.dailyQuestManager.openModal();
      });
    }
  }

  initCareerView() {
    const mount = document.getElementById('career-mount');
    if (!mount) return;
    if (!this.careerManager) {
      this.careerManager = new CareerManager(mount);
    }
    this.careerManager.render();
  }

  initDialoguesView() {
    const mount = document.getElementById('dialogues-mount');
    if (!mount) return;
    if (!this.dialogueManager) {
      this.dialogueManager = new DialogueManager(mount);
    }
    this.dialogueManager.render();
  }

  initBuilderView() {
    const mount = document.getElementById('builder-mount');
    if (!mount) return;
    if (!this.sentenceBuilder) {
      this.sentenceBuilder = new SentenceBuilder(mount);
    }
    this.sentenceBuilder.render();
  }

  initSpeechView() {
    const mount = document.getElementById('speech-mount');
    if (!mount) return;
    if (!this.speechTrainer) {
      this.speechTrainer = new SpeechTrainer(mount);
    }
    this.speechTrainer.render();
  }

  initEmailsView() {
    const mount = document.getElementById('emails-mount');
    if (!mount) return;
    if (!this.emailTrainer) {
      this.emailTrainer = new EmailTrainer(mount);
    }
    this.emailTrainer.render();
  }

  initFlashcardsView() {
    const container = document.getElementById('flashcards-mount');
    if (!container) return;

    if (!this.flashcardManager) {
      this.flashcardManager = new FlashcardManager(container, () => {
        this.renderHeaderStats();
      });
    }

    const items = this.getFilteredVocabulary();
    this.flashcardManager.loadCards(items);
  }

  initQuizView() {
    const container = document.getElementById('quiz-mount');
    if (!container) return;

    if (!this.quizEngine) {
      this.quizEngine = new QuizEngine(container, () => {
        this.switchView('vocab');
      });
    }

    const modeSelect = document.getElementById('quiz-mode-select');
    const mode = modeSelect ? modeSelect.value : 'article';
    const countSelect = document.getElementById('quiz-count-select');
    const count = countSelect ? parseInt(countSelect.value) : 10;

    const items = vocabularyByLevel[this.currentLevel] || allVocabulary;
    this.quizEngine.startQuiz(items, mode, count);
  }

  initStoriesView() {
    const mount = document.getElementById('stories-mount');
    if (!mount) return;
    if (!this.storiesManager) {
      this.storiesManager = new StoriesManager(mount, () => this.renderGamificationHeader());
    }
    this.storiesManager.render();
  }

  initVerbsView() {
    const mount = document.getElementById('verbs-mount');
    if (!mount) return;
    if (!this.verbsManager) {
      this.verbsManager = new VerbsManager(mount, () => this.renderGamificationHeader());
    }
    this.verbsManager.render();
  }

  initPrepositionsView() {
    const mount = document.getElementById('prepositions-mount');
    if (!mount) return;
    if (!this.prepositionVerbsManager) {
      this.prepositionVerbsManager = new PrepositionVerbsManager(mount, () => this.renderGamificationHeader());
    }
    this.prepositionVerbsManager.render();
  }

  initGamificationView() {
    const mount = document.getElementById('gamification-mount');
    if (!mount) return;
    if (!this.gamificationManager) {
      this.gamificationManager = new GamificationManager(mount, () => this.renderGamificationHeader());
    }
    this.gamificationManager.render();
  }

  initLivingView() {
    const mount = document.getElementById('living-mount');
    if (!mount) return;
    if (!this.livingGuideManager) {
      this.livingGuideManager = new LivingGuideManager(mount, () => this.renderGamificationHeader());
    }
    this.livingGuideManager.render();
  }

  initExamsView() {
    if (!this.examSimulator) {
      this.examSimulator = new ExamSimulator('exams-mount');
    } else {
      this.examSimulator.renderSetup();
    }
  }

  initGrammarView() {
    if (!this.grammarVault) {
      this.grammarVault = new GrammarVault('#grammar-mount');
      this.grammarVault.init();
    }
  }

  initCompoundsView() {
    if (!this.compoundWords) {
      this.compoundWords = new CompoundWords('#compounds-mount');
      this.compoundWords.init();
    }
  }

  initRadioView() {
    if (!this.radioPlayer) {
      this.radioPlayer = new RadioPlayer('#radio-mount');
      this.radioPlayer.init();
    }
  }

  // --- ربط الأحداث العامة ---
  bindGlobalEvents() {
    // تبديل المظهر (سواء من القائمة الجانبية أو الشريط العلوي)
    const themeBtns = document.querySelectorAll('.btn-theme-toggle');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.toggleTheme());
    });

    // تحكم القائمة الجانبية (Mobile Drawer)
    const hamburgerBtn = document.getElementById('btn-hamburger-toggle');
    const closeSidebarBtn = document.getElementById('btn-close-sidebar');
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    const openSidebar = () => {
      if (sidebar) sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      if (sidebar) sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    // أزرار التنقل بين الشاشات (الجانبي والسفلي)
    const allNavButtons = document.querySelectorAll('.nav-tab-btn, .mobile-nav-item');
    allNavButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        this.switchView(view);
        // إغلاق القائمة الجانبية تلقائياً في شاشات الموبايل
        closeSidebar();
        // التمرير لأعلى الصفحة بنعومة عند التبديل
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // أزرار اختيار المستوى (A1, A2, B1, الكل)
    const levelPills = document.querySelectorAll('.level-pill');
    levelPills.forEach(pill => {
      pill.addEventListener('click', () => {
        levelPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentLevel = pill.getAttribute('data-level');
        this.visibleCount = this.itemsPerPage;
        this.populateCategoryFilter();
        if (this.activeView === 'flashcards') {
          this.initFlashcardsView();
        } else if (this.activeView === 'quiz') {
          this.initQuizView();
        } else {
          this.renderVocabGrid();
        }
      });
    });

    // تصفية الموضوع
    const categorySelect = document.getElementById('category-filter-select');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.currentCategory = e.target.value;
        this.visibleCount = this.itemsPerPage;
        if (this.activeView === 'flashcards') {
          this.initFlashcardsView();
        } else {
          this.renderVocabGrid();
        }
      });
    }

    // تصفية أداة التعريف (der, die, das, الكل)
    const articleBtns = document.querySelectorAll('.article-filter-btn');
    articleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        articleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentArticleFilter = btn.getAttribute('data-article');
        this.visibleCount = this.itemsPerPage;
        if (this.activeView === 'flashcards') {
          this.initFlashcardsView();
        } else {
          this.renderVocabGrid();
        }
      });
    });

    // تصفية الحالة
    const statusPills = document.querySelectorAll('.status-pill');
    statusPills.forEach(pill => {
      pill.addEventListener('click', () => {
        statusPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentStatusFilter = pill.getAttribute('data-status');
        this.visibleCount = this.itemsPerPage;
        if (this.activeView === 'flashcards') {
          this.initFlashcardsView();
        } else {
          this.renderVocabGrid();
        }
      });
    });

    // شريط البحث المطور
    const searchInput = document.getElementById('vocab-search-input');
    const searchWrapper = document.getElementById('vocab-search-wrapper');
    const clearSearchBtn = document.getElementById('btn-clear-vocab-search');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.visibleCount = this.itemsPerPage;
        if (searchWrapper) {
          if (e.target.value.trim().length > 0) {
            searchWrapper.classList.add('has-text');
          } else {
            searchWrapper.classList.remove('has-text');
          }
        }
        this.renderVocabGrid();
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          this.searchQuery = '';
          this.visibleCount = this.itemsPerPage;
          if (searchWrapper) searchWrapper.classList.remove('has-text');
          this.renderVocabGrid();
          searchInput.blur();
        }
      });
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.searchQuery = '';
        this.visibleCount = this.itemsPerPage;
        if (searchWrapper) searchWrapper.classList.remove('has-text');
        this.renderVocabGrid();
        searchInput.focus();
      });
    }

    // زر عرض المزيد من الكلمات
    const loadMoreBtn = document.getElementById('btn-load-more-vocab');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.visibleCount += this.itemsPerPage;
        this.renderVocabGrid();
      });
    }

    // اختصار لوحة المفاتيح Ctrl+K للبحث السريع في أي وقت
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInput) {
          if (this.activeView !== 'vocabulary') {
            this.switchView('vocabulary');
          }
          searchInput.focus();
          searchInput.select();
        }
      }
    });

    // زر بدء الاختبار
    const startQuizBtn = document.getElementById('btn-start-quiz-trigger');
    if (startQuizBtn) {
      startQuizBtn.addEventListener('click', () => {
        this.initQuizView();
      });
    }

    // دليل القواعد الصوتية والأدوات (من القائمة الجانبية والشريط العلوي)
    const rulesModalBtns = [
      document.getElementById('btn-open-rules-modal'),
      document.getElementById('btn-open-rules-modal-top')
    ].filter(Boolean);
    const rulesModal = document.getElementById('rules-modal');
    const closeRulesModal = document.getElementById('btn-close-rules-modal');

    rulesModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (rulesModal) rulesModal.classList.remove('hidden');
        closeSidebar();
      });
    });
    if (closeRulesModal && rulesModal) {
      closeRulesModal.addEventListener('click', () => {
        rulesModal.classList.add('hidden');
      });
    }
    if (rulesModal) {
      rulesModal.addEventListener('click', (e) => {
        if (e.target === rulesModal) rulesModal.classList.add('hidden');
      });
    }
  }
}

// تشغيل التطبيق
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new GermanApp();
  });
} else {
  window.app = new GermanApp();
}
