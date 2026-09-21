// نظام البطاقات التعليمية التفاعلية ثلاثية الأبعاد (3D Interactive Flashcards)
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class FlashcardManager {
  constructor(containerElement, onUpdateCallback = null) {
    this.container = containerElement;
    this.cards = [];
    this.currentIndex = 0;
    this.isFlipped = false;
    this.autoPlayAudio = true;
    this.onUpdate = onUpdateCallback;
  }

  loadCards(cardsList) {
    this.cards = [...cardsList];
    this.currentIndex = 0;
    this.isFlipped = false;
    this.render();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    this.currentIndex = 0;
    this.isFlipped = false;
    this.render();
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    const cardInner = this.container.querySelector('.flashcard-inner');
    if (cardInner) {
      cardInner.classList.toggle('is-flipped', this.isFlipped);
      if (this.isFlipped && this.autoPlayAudio) {
        const current = this.cards[this.currentIndex];
        if (current) {
          audioPlayer.speak(current.german);
        }
      }
    }
  }

  next() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.isFlipped = false;
      this.render();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isFlipped = false;
      this.render();
    }
  }

  markCurrentMastered() {
    const current = this.cards[this.currentIndex];
    if (current) {
      Storage.markMastered(current.id);
      if (this.onUpdate) this.onUpdate();
      this.next();
    }
  }

  markCurrentReview() {
    const current = this.cards[this.currentIndex];
    if (current) {
      Storage.markNeedsReview(current.id);
      if (this.onUpdate) this.onUpdate();
      this.next();
    }
  }

  render() {
    if (!this.container) return;

    if (this.cards.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎴</div>
          <h3>لا توجد بطاقات مطابقة حالياً</h3>
          <p>جرّب اختيار مستوى آخر أو إضافة كلمات إلى قائمة المراجعة.</p>
        </div>
      `;
      return;
    }

    const current = this.cards[this.currentIndex];
    const isMastered = Storage.isMastered(current.id);
    const isFav = Storage.isFavorite(current.id);
    const articleClass = current.article ? `article-${current.article}` : 'article-none';

    this.container.innerHTML = `
      <div class="flashcard-wrapper">
        <!-- شريط علوي للبطاقة: المؤشر والمفضلة -->
        <div class="flashcard-toolbar">
          <span class="flashcard-counter">
            بطاقة <strong>${this.currentIndex + 1}</strong> من <strong>${this.cards.length}</strong>
          </span>
          <div class="toolbar-actions">
            <button class="btn-icon-subtle ${isFav ? 'active' : ''}" id="fc-fav-btn" title="${isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? '#f59e0b' : 'none'}" stroke="${isFav ? '#f59e0b' : 'currentColor'}" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
            <button class="btn-icon-subtle" id="fc-shuffle-btn" title="خلط البطاقات عشوائياً">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- بطاقة العرض ثلاثية الأبعاد -->
        <div class="flashcard ${articleClass}" id="main-flashcard">
          <div class="flashcard-inner ${this.isFlipped ? 'is-flipped' : ''}">
            <!-- الوجه الأمامي: الألمانية والصوتيات -->
            <div class="flashcard-face flashcard-front">
              <div class="face-badge-row">
                <span class="level-badge badge-${current.level.toLowerCase()}">${current.level}</span>
                ${current.article ? `<span class="article-badge badge-${current.article}">${current.article}</span>` : ''}
                <span class="category-pill">${current.categoryAr}</span>
              </div>

              <div class="face-main-content">
                <h2 class="german-main-word">${current.german}</h2>
                ${current.plural ? `<div class="plural-hint"><small>صيغة الجمع:</small> ${current.plural}</div>` : ''}
                
                <div class="phonetic-container">
                  <div class="phonetic-text">🗣️ ${current.phonetic}</div>
                  ${current.pronunciationTip ? `<div class="pronounce-tip"><small>💡 سر النطق:</small> ${current.pronunciationTip}</div>` : ''}
                </div>

                <div class="audio-control-row">
                  <button class="btn-audio-listen" id="fc-listen-front" title="استمع لنطق الكلمة">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                    <span>استمع للكلمة</span>
                  </button>
                  <button class="btn-audio-slow" id="fc-listen-slow" title="نطق بطيء للمبتدئين">
                    <span>🐢 بطيء (0.75x)</span>
                  </button>
                </div>
              </div>

              <div class="flip-hint">
                <span>انقر لقلب البطاقة ومعرفة المعنى والجملة 🔄</span>
              </div>
            </div>

            <!-- الوجه الخلفي: المعنى بالعربي والجملة النموذجية -->
            <div class="flashcard-face flashcard-back">
              <div class="face-badge-row">
                <span class="type-tag">${current.type === 'noun' ? 'اسم (Nomen)' : current.type === 'verb' ? 'فعل (Verb)' : 'تعبير (Ausdruck)'}</span>
                <span class="arabic-badge">الترجمة والمعنى</span>
              </div>

              <div class="arabic-translation-box">
                <h3 class="arabic-meaning">${current.arabic}</h3>
              </div>

              <div class="sentence-box">
                <div class="sentence-header">
                  <span>جملة توضيحية من واقع الحياة:</span>
                  <button class="btn-audio-mini" id="fc-listen-sentence" title="استمع للجملة كاملة">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  </button>
                </div>
                <p class="sentence-de" dir="ltr">${current.sentenceDe}</p>
                <p class="sentence-ar" dir="rtl">${current.sentenceAr}</p>
              </div>

              <div class="flip-hint">
                <span>انقر لقلب البطاقة للوجه الألماني 🔄</span>
              </div>
            </div>
          </div>
        </div>

        <!-- أزرار الإجراءات والتقييم السريع -->
        <div class="flashcard-controls">
          <button class="btn-nav btn-prev" id="fc-prev-btn" ${this.currentIndex === 0 ? 'disabled' : ''}>
            <span>السابق</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div class="action-buttons-group">
            <button class="btn-action btn-review" id="fc-review-btn" title="حفظ للمراجعة اللاحقة">
              <span class="btn-icon">🔄</span>
              <span>تحتاج مراجعة</span>
            </button>
            <button class="btn-action btn-mastered ${isMastered ? 'is-active' : ''}" id="fc-mastered-btn" title="أتقنت هذه الكلمة">
              <span class="btn-icon">✨</span>
              <span>أتقنتها!</span>
            </button>
          </div>

          <button class="btn-nav btn-next" id="fc-next-btn" ${this.currentIndex === this.cards.length - 1 ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>التالي</span>
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const cardEl = this.container.querySelector('#main-flashcard');
    if (cardEl) {
      cardEl.addEventListener('click', (e) => {
        // إذا كان النقر على زر استماع، لا نقلب البطاقة
        if (e.target.closest('button')) return;
        this.flip();
      });
    }

    const listenFront = this.container.querySelector('#fc-listen-front');
    if (listenFront) {
      listenFront.addEventListener('click', (e) => {
        e.stopPropagation();
        const cur = this.cards[this.currentIndex];
        audioPlayer.speak(cur.german, listenFront, 1.0);
      });
    }

    const listenSlow = this.container.querySelector('#fc-listen-slow');
    if (listenSlow) {
      listenSlow.addEventListener('click', (e) => {
        e.stopPropagation();
        const cur = this.cards[this.currentIndex];
        audioPlayer.speak(cur.german, listenSlow, 0.75);
      });
    }

    const listenSentence = this.container.querySelector('#fc-listen-sentence');
    if (listenSentence) {
      listenSentence.addEventListener('click', (e) => {
        e.stopPropagation();
        const cur = this.cards[this.currentIndex];
        audioPlayer.speak(cur.sentenceDe, listenSentence, 0.9);
      });
    }

    const favBtn = this.container.querySelector('#fc-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cur = this.cards[this.currentIndex];
        Storage.toggleFavorite(cur.id);
        if (this.onUpdate) this.onUpdate();
        this.render();
      });
    }

    const shuffleBtn = this.container.querySelector('#fc-shuffle-btn');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.shuffle();
      });
    }

    const prevBtn = this.container.querySelector('#fc-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }

    const nextBtn = this.container.querySelector('#fc-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }

    const reviewBtn = this.container.querySelector('#fc-review-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => this.markCurrentReview());
    }

    const masteredBtn = this.container.querySelector('#fc-mastered-btn');
    if (masteredBtn) {
      masteredBtn.addEventListener('click', () => this.markCurrentMastered());
    }
  }
}
