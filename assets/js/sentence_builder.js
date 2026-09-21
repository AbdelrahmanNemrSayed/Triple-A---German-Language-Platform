// محرك مختبر بناء وتراكيب الجمل الألمانية (Satzbau & Grammatik-Labor)
import { sentenceChallenges } from '../../data/sentence_builder.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class SentenceBuilder {
  constructor(containerElement, onXPUpdate) {
    this.container = containerElement;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.currentIndex = 0;
    this.constructedWords = [];
    this.availableWords = [];
    this.isCompleted = false;
    this.completedSet = new Set();
    this.score = 0;
    this.initCurrentChallenge();
  }

  initCurrentChallenge() {
    const ch = sentenceChallenges[this.currentIndex];
    this.isCompleted = this.completedSet.has(this.currentIndex);
    if (this.isCompleted) {
      this.constructedWords = [...ch.correctOrder];
      this.availableWords = [];
    } else {
      this.constructedWords = [];
      this.availableWords = [...ch.scrambled];
    }
  }

  goToChallenge(index) {
    if (index >= 0 && index < sentenceChallenges.length) {
      this.currentIndex = index;
      this.initCurrentChallenge();
      this.render();
    }
  }

  next() {
    if (this.currentIndex < sentenceChallenges.length - 1) {
      this.currentIndex++;
      this.initCurrentChallenge();
      this.render();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.initCurrentChallenge();
      this.render();
    }
  }

  pickWord(wordIndex) {
    if (this.isCompleted) return;
    const word = this.availableWords.splice(wordIndex, 1)[0];
    this.constructedWords.push(word);
    this.render();
  }

  unpickWord(wordIndex) {
    if (this.isCompleted) return;
    const word = this.constructedWords.splice(wordIndex, 1)[0];
    this.availableWords.push(word);
    this.render();
  }

  resetCurrent() {
    const ch = sentenceChallenges[this.currentIndex];
    this.isCompleted = false;
    this.completedSet.delete(this.currentIndex);
    this.constructedWords = [];
    this.availableWords = [...ch.scrambled];
    this.render();
  }

  checkAnswer() {
    const ch = sentenceChallenges[this.currentIndex];
    const userSentence = this.constructedWords.join(" ");
    const correctSentence = ch.correctOrder.join(" ");

    const isCorrect = userSentence === correctSentence;
    const feedbackBox = this.container.querySelector('#builder-feedback-box');
    const ruleBox = this.container.querySelector('#builder-rule-box');
    const nextBtn = this.container.querySelector('#btn-builder-next');

    if (isCorrect) {
      this.isCompleted = true;
      if (!this.completedSet.has(this.currentIndex)) {
        this.completedSet.add(this.currentIndex);
        this.score += 10;
        try {
          Storage.addXP(10);
          if (this.onXPUpdate) this.onXPUpdate();
        } catch (err) {
          console.error('Error saving XP:', err);
        }
      }
      audioPlayer.speak(correctSentence);

      if (feedbackBox) {
        feedbackBox.className = 'quiz-feedback-box success';
        feedbackBox.innerHTML = `
          <div class="feedback-icon">🎉</div>
          <div class="feedback-msg">
            <strong>أحسنت! ترتيب نحوي سليم ومتقن 100%</strong>
            <span dir="ltr">${correctSentence}</span>
          </div>
        `;
        feedbackBox.classList.remove('hidden');
      }

      if (ruleBox) {
        ruleBox.classList.remove('hidden');
      }

      if (nextBtn) {
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('pulse-next-btn');
      }

      // تحديث شارة التحدي فوراً
      const activePill = this.container.querySelector(`.builder-nav-pill[data-index="${this.currentIndex}"]`);
      if (activePill) {
        activePill.classList.add('completed');
        if (!activePill.querySelector('.pill-check')) {
          const checkIcon = document.createElement('span');
          checkIcon.className = 'pill-check';
          checkIcon.textContent = '✓ ';
          activePill.insertBefore(checkIcon, activePill.firstChild);
        }
      }
    } else {
      if (feedbackBox) {
        feedbackBox.className = 'quiz-feedback-box error';
        feedbackBox.innerHTML = `
          <div class="feedback-icon">💡</div>
          <div class="feedback-msg">
            <strong>الترتيب ليس صحيحاً تماماً!</strong>
            <span>تذكر موقع الفعل وأدوات الربط وحاول إعادة ترتيب الكلمات.</span>
          </div>
        `;
        feedbackBox.classList.remove('hidden');
      }
    }
  }

  render() {
    if (!this.container) return;

    const ch = sentenceChallenges[this.currentIndex];

    this.container.innerHTML = `
      <div class="sentence-builder-wrapper">
        <div class="builder-card">
          <!-- شريط الرأس -->
          <div class="builder-title-row">
            <div>
              <span class="level-badge badge-${ch.level.toLowerCase().substring(0, 2)}">${ch.level}</span>
              <h3 style="display: inline; margin-right: 0.5rem; font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">
                ${ch.title}
              </h3>
            </div>
            <span style="font-size: 0.9rem; color: var(--text-secondary);">
              التحدي <strong>${this.currentIndex + 1}</strong> من <strong>${sentenceChallenges.length}</strong>
            </span>
          </div>

          <!-- شريط أزرار التنقل السريع بين التحديات -->
          <div class="builder-pills-bar">
            <span class="builder-pills-label">التحديات:</span>
            <div class="builder-pills-list">
              ${sentenceChallenges.map((c, idx) => {
                const isCurrent = idx === this.currentIndex;
                const isDone = this.completedSet.has(idx);
                return `
                  <button class="builder-nav-pill ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}" 
                          data-action="goto" 
                          data-index="${idx}"
                          title="${c.title}">
                    ${isDone ? '<span class="pill-check">✓</span>' : ''}
                    <span>تحدي ${idx + 1}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 0.75rem;">
            قم ببناء الجملة الألمانية الصحيحة نحوياً المعبرة عن المعنى التالي:
          </p>

          <!-- الجملة باللغة العربية -->
          <div class="builder-arabic-target">
            "${ch.translationAr}"
          </div>

          <!-- منطقة إسقاط الكلمات (Drop Zone) -->
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.35rem; display: block;">
            جملتك التي تم تركيبها (اضغط على الكلمة لإرجاعها):
          </label>
          <div class="drop-zone" id="drop-zone-mount">
            ${this.constructedWords.length === 0 ? `
              <span class="drop-zone-placeholder">انقر على الكلمات بالأسفل بالترتيب النحوي الصحيح...</span>
            ` : this.constructedWords.map((w, idx) => `
              <button class="word-chip in-dropzone" data-action="unpick" data-index="${idx}">
                ${w}
              </button>
            `).join('')}
          </div>

          <!-- بنك الكلمات المبعثرة (Words Pool) -->
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.35rem; display: block;">
            الكلمات المتاحة للتركيب:
          </label>
          <div class="words-pool" id="words-pool-mount">
            ${this.availableWords.map((w, idx) => `
              <button class="word-chip" data-action="pick" data-index="${idx}">
                ${w}
              </button>
            `).join('')}
          </div>

          <!-- رسائل التغذية الراجعة -->
          <div class="quiz-feedback-box hidden" id="builder-feedback-box"></div>

          <!-- صندوق شرح القاعدة النحوية عند النجاح -->
          <div class="rule-explanation-box ${this.isCompleted ? '' : 'hidden'}" id="builder-rule-box">
            <strong>📖 سر القاعدة النحوية (Grammatik-Tipp):</strong>
            <p style="color: var(--text-primary); font-size: 0.95rem; line-height: 1.5;">${ch.ruleExplanation}</p>
          </div>

          <!-- أزرار الإجراءات والتحقق -->
          <div class="builder-controls-row" style="margin-top: 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn-secondary" id="btn-builder-prev" ${this.currentIndex === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <span>◀ السابق</span>
              </button>
              <button class="btn-secondary" id="btn-builder-reset">
                <span>إعادة ضبط 🔄</span>
              </button>
            </div>

            <div style="display: flex; gap: 0.75rem;">
              <button class="btn-primary" id="btn-builder-check" ${this.constructedWords.length === 0 ? 'disabled' : ''}>
                <span>تحقق من الجملة ✨</span>
              </button>
              ${this.currentIndex < sentenceChallenges.length - 1 ? `
                <button class="btn-primary ${this.isCompleted ? 'pulse-next-btn' : ''}" id="btn-builder-next">
                  <span>الجملة التالية ➔</span>
                </button>
              ` : `
                <button class="btn-secondary" id="btn-builder-restart" title="إعادة البدء من التحدي الأول">
                  <span>البداية ⟲</span>
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // التنقل المباشر عبر شريط التحديات
    const pillsList = this.container.querySelector('.builder-pills-list');
    if (pillsList) {
      pillsList.addEventListener('click', (e) => {
        const pill = e.target.closest('button[data-action="goto"]');
        if (!pill) return;
        const idx = parseInt(pill.getAttribute('data-index'), 10);
        this.goToChallenge(idx);
      });
    }

    // اختيار كلمة من البنك
    const poolMount = this.container.querySelector('#words-pool-mount');
    if (poolMount) {
      poolMount.addEventListener('click', (e) => {
        const chip = e.target.closest('button[data-action="pick"]');
        if (!chip) return;
        const idx = parseInt(chip.getAttribute('data-index'), 10);
        this.pickWord(idx);
      });
    }

    // إرجاع كلمة من الجملة للبنك
    const dropZone = this.container.querySelector('#drop-zone-mount');
    if (dropZone) {
      dropZone.addEventListener('click', (e) => {
        const chip = e.target.closest('button[data-action="unpick"]');
        if (!chip) return;
        const idx = parseInt(chip.getAttribute('data-index'), 10);
        this.unpickWord(idx);
      });
    }

    // زر التحقق
    const checkBtn = this.container.querySelector('#btn-builder-check');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        this.checkAnswer();
      });
    }

    // زر إعادة الضبط
    const resetBtn = this.container.querySelector('#btn-builder-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetCurrent();
      });
    }

    // زر السابق
    const prevBtn = this.container.querySelector('#btn-builder-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.prev();
      });
    }

    // زر التالي
    const nextBtn = this.container.querySelector('#btn-builder-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.next();
      });
    }

    // زر إعادة البدء عند نهاية التحديات
    const restartBtn = this.container.querySelector('#btn-builder-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.goToChallenge(0);
      });
    }
  }
}
