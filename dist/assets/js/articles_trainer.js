// assets/js/articles_trainer.js
// محرك لعبة وتحدي أدوات التعريف السريع (Der, Die, Das Blitz-Trainer)
// منصة Triple A PRO - German Language Platform

import { ARTICLES_WORDS_BANK, ARTICLE_RULES } from '../../data/articles_trainer.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class ArticlesTrainer {
  constructor(containerElement, onXPUpdate) {
    this.container = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.words = [...ARTICLES_WORDS_BANK];
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.highestStreak = 0;
    this.answered = false;
    this.lastAnswerCorrect = false;
    this.showRulesView = false;

    this.shuffleWords();
  }

  shuffleWords() {
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  handleGuess(chosenArticle) {
    if (this.answered) return;

    const current = this.words[this.currentIndex];
    const isCorrect = chosenArticle.toLowerCase() === current.article.toLowerCase();
    this.answered = true;
    this.lastAnswerCorrect = isCorrect;

    if (isCorrect) {
      this.score += 10;
      this.streak += 1;
      if (this.streak > this.highestStreak) this.highestStreak = this.streak;

      // مكافأة XP (+5 نقاط أساسية + بونص ستريك)
      const bonusXP = this.streak >= 3 ? 8 : 5;
      try {
        Storage.addXP(bonusXP);
        if (this.onXPUpdate) this.onXPUpdate();
      } catch (err) {
        console.warn('Storage XP update error:', err);
      }

      audioPlayer.speak(`${current.article} ${current.word}`);
    } else {
      this.streak = 0;
      audioPlayer.speak(`${current.article} ${current.word}`);
    }

    this.render();
  }

  nextWord() {
    this.answered = false;
    this.lastAnswerCorrect = false;
    if (this.currentIndex < this.words.length - 1) {
      this.currentIndex += 1;
    } else {
      this.shuffleWords();
      this.currentIndex = 0;
    }
    this.render();
  }

  toggleRulesView() {
    this.showRulesView = !this.showRulesView;
    this.render();
  }

  render() {
    if (!this.container) return;

    if (this.showRulesView) {
      this.renderRulesView();
      return;
    }

    const current = this.words[this.currentIndex];

    this.container.innerHTML = `
      <div class="articles-trainer-wrapper">
        <!-- Header Controls & Stats -->
        <div class="articles-header">
          <div>
            <span class="vault-badge"><i class="fa-solid fa-bolt"></i> تحدي السرعة الذهبي</span>
            <h2 class="articles-title">تحدي أدوات التعريف (Der, Die, Das)</h2>
            <p class="articles-sub">احفظ جنس الأسماء الألمانية وطبق القواعد الذهبية للنهايات مع التغذية الفورية</p>
          </div>
          <div class="articles-actions-top">
            <button class="btn-secondary" id="btn-show-article-rules">
              <i class="fa-solid fa-book-bookmark"></i> قواعد النهايات الذهبية 📖
            </button>
          </div>
        </div>

        <!-- Streak & Score Strip -->
        <div class="articles-stats-strip">
          <div class="stat-pill">
            <span class="stat-icon">🔥</span>
            <div class="stat-meta">
              <span class="stat-label">الحماس (Streak)</span>
              <strong class="stat-number ${this.streak >= 3 ? 'streak-fire' : ''}">${this.streak}</strong>
            </div>
          </div>
          <div class="stat-pill">
            <span class="stat-icon">⭐</span>
            <div class="stat-meta">
              <span class="stat-label">النقاط</span>
              <strong class="stat-number">${this.score}</strong>
            </div>
          </div>
          <div class="stat-pill">
            <span class="stat-icon">🏆</span>
            <div class="stat-meta">
              <span class="stat-label">أعلى ستريك</span>
              <strong class="stat-number">${this.highestStreak}</strong>
            </div>
          </div>
          <div class="stat-pill">
            <span class="stat-icon">📊</span>
            <div class="stat-meta">
              <span class="stat-label">التقدم</span>
              <strong class="stat-number">${this.currentIndex + 1} / ${this.words.length}</strong>
            </div>
          </div>
        </div>

        <!-- Main Flash Card -->
        <div class="article-challenge-card ${this.answered ? (this.lastAnswerCorrect ? 'correct-glow' : 'wrong-shake') : ''}">
          <div class="article-word-stage">
            <div class="article-revealed-slot">
              ${this.answered ? `
                <span class="revealed-article badge-${current.article}">
                  ${current.article.toUpperCase()}
                </span>
              ` : `
                <span class="mystery-badge">?</span>
              `}
            </div>

            <h1 class="article-main-word" dir="ltr">${current.word}</h1>
            <p class="article-word-ar">${current.meaningAr}</p>

            ${this.answered ? `
              <div class="article-meta-reveal">
                <span class="plural-tag" dir="ltr"><strong>الجمع:</strong> ${current.plural}</span>
                <button class="btn-listen-article" id="btn-audio-speak-word" title="استمع للنطق">
                  <i class="fa-solid fa-volume-high"></i> استمع
                </button>
              </div>
            ` : ''}
          </div>

          <!-- The 3 Big Buttons -->
          <div class="article-buttons-row">
            <button class="btn-art btn-der ${this.answered && current.article === 'der' ? 'correct-btn' : ''}" 
                    data-article="der" ${this.answered ? 'disabled' : ''}>
              <span class="art-badge">MASCULIN</span>
              <span class="art-title">DER</span>
              <span class="art-hint">مذكر 🔵</span>
            </button>

            <button class="btn-art btn-die ${this.answered && current.article === 'die' ? 'correct-btn' : ''}" 
                    data-article="die" ${this.answered ? 'disabled' : ''}>
              <span class="art-badge">FEMININ</span>
              <span class="art-title">DIE</span>
              <span class="art-hint">مؤنث 🔴</span>
            </button>

            <button class="btn-art btn-das ${this.answered && current.article === 'das' ? 'correct-btn' : ''}" 
                    data-article="das" ${this.answered ? 'disabled' : ''}>
              <span class="art-badge">NEUTRAL</span>
              <span class="art-title">DAS</span>
              <span class="art-hint">محايد 🟢</span>
            </button>
          </div>

          <!-- Answer Explanation / Rule Tip Box -->
          ${this.answered ? `
            <div class="article-rule-feedback ${this.lastAnswerCorrect ? 'success' : 'error'}">
              <div class="rule-icon">${this.lastAnswerCorrect ? '🎉' : '💡'}</div>
              <div class="rule-body">
                <strong>${this.lastAnswerCorrect ? 'إجابة عبقرية وصحيحة!' : 'إجابة غير صحيحة، لكن لا بأس!'}</strong>
                <p><strong>سر القاعدة:</strong> ${current.ruleTip}</p>
                <div class="rule-example" dir="ltr">
                  <span>${current.exampleDe}</span>
                  <small dir="rtl">(${current.exampleAr})</small>
                </div>
              </div>
            </div>

            <div class="article-next-row">
              <button class="btn-primary pulse-next-btn" id="btn-next-article-word">
                <span>الكلمة التالية ➔</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderRulesView() {
    this.container.innerHTML = `
      <div class="articles-trainer-wrapper">
        <div class="articles-header">
          <div>
            <span class="vault-badge"><i class="fa-solid fa-book-bookmark"></i> دليل النهايات</span>
            <h2 class="articles-title">القواعد الذهبية لنهايات أدوات التعريف</h2>
            <p class="articles-sub">احفظ هذه المقاطع لتحدد أداة أكثر من 85% من الأسماء الألمانية بثقة تامة</p>
          </div>
          <div>
            <button class="btn-primary" id="btn-back-to-challenge">
              <i class="fa-solid fa-gamepad"></i> العودة للتحدي ➔
            </button>
          </div>
        </div>

        <div class="articles-rules-grid">
          ${ARTICLE_RULES.map(r => `
            <div class="rule-card rule-card-${r.article}">
              <div class="rule-card-header">
                <span class="rule-art-badge badge-${r.article}">${r.article.toUpperCase()}</span>
                <h3>${r.title}</h3>
              </div>
              <p class="rule-desc">${r.explanation}</p>
              
              <div class="suffix-chips">
                ${r.suffixes.map(s => `<span class="suffix-chip">${s}</span>`).join('')}
              </div>

              <div class="rule-examples-box">
                <span class="examples-title">أمثلة شهيرة:</span>
                <div class="examples-list" dir="ltr">
                  ${r.examples.map(ex => `<span class="example-item">${ex}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const backBtn = this.container.querySelector('#btn-back-to-challenge');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.toggleRulesView());
    }
  }

  bindEvents() {
    // 1. Article buttons guess
    this.container.querySelectorAll('.btn-art').forEach(btn => {
      btn.addEventListener('click', () => {
        const art = btn.getAttribute('data-article');
        this.handleGuess(art);
      });
    });

    // 2. Next word button
    const nextBtn = this.container.querySelector('#btn-next-article-word');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextWord());
    }

    // 3. Audio speak
    const audioBtn = this.container.querySelector('#btn-audio-speak-word');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const current = this.words[this.currentIndex];
        audioPlayer.speak(`${current.article} ${current.word}`);
      });
    }

    // 4. Open rules modal/view
    const rulesBtn = this.container.querySelector('#btn-show-article-rules');
    if (rulesBtn) {
      rulesBtn.addEventListener('click', () => this.toggleRulesView());
    }
  }
}
