// محرك الاختبارات والتحديات التفاعلية (Interactive Quiz & Practice Engine)
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class QuizEngine {
  constructor(containerElement, onFinishCallback = null) {
    this.container = containerElement;
    this.onFinish = onFinishCallback;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.currentMode = 'article'; // 'article' | 'meaning' | 'listening'
    this.answered = false;
  }

  startQuiz(vocabPool, mode = 'article', count = 10) {
    this.currentMode = mode;
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.answered = false;
    this.generateQuestions(vocabPool, mode, count);
    this.renderQuestion();
  }

  generateQuestions(vocabPool, mode, count) {
    let pool = [...vocabPool];
    if (mode === 'article') {
      // فقط الأسماء التي لها أداة تعريف
      pool = pool.filter(v => v.article && ['der', 'die', 'das'].includes(v.article));
    }

    if (pool.length === 0) {
      this.questions = [];
      return;
    }

    // خلط عشوائي
    pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, Math.min(count, pool.length));

    this.questions = selected.map(item => {
      if (mode === 'article') {
        return {
          type: 'article',
          item: item,
          prompt: `ما هي أداة التعريف الصحيحة للاسم التالي؟`,
          wordDisplay: item.word,
          meaning: item.arabic,
          correctAnswer: item.article,
          options: ['der', 'die', 'das']
        };
      } else if (mode === 'listening') {
        // اختبار استماع: استمع واختر المعنى
        const wrongChoices = vocabPool
          .filter(v => v.id !== item.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.arabic);
        const allOptions = [item.arabic, ...wrongChoices].sort(() => Math.random() - 0.5);

        return {
          type: 'listening',
          item: item,
          prompt: `استمع إلى النطق جيداً، ثم اختر المعنى العربي الصحيح:`,
          audioText: item.german,
          correctAnswer: item.arabic,
          options: allOptions
        };
      } else {
        // اختبار معاني الكلمات
        const wrongChoices = vocabPool
          .filter(v => v.id !== item.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.arabic);
        const allOptions = [item.arabic, ...wrongChoices].sort(() => Math.random() - 0.5);

        return {
          type: 'meaning',
          item: item,
          prompt: `ما هو المعنى الصحيح للكلمة التالية؟`,
          wordDisplay: item.german,
          sentenceDe: item.sentenceDe,
          correctAnswer: item.arabic,
          options: allOptions
        };
      }
    });
  }

  renderQuestion() {
    if (!this.container) return;

    if (this.questions.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎯</div>
          <h3>لا توجد كلمات كافية لبدء الاختبار</h3>
          <p>يرجى اختيار مستوى يحتوي على عدد أكبر من المفردات.</p>
        </div>
      `;
      return;
    }

    if (this.currentIndex >= this.questions.length) {
      this.renderSummary();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.answered = false;

    const progressPercent = ((this.currentIndex) / this.questions.length) * 100;

    this.container.innerHTML = `
      <div class="quiz-card">
        <!-- شريط التقدم والدرجة -->
        <div class="quiz-header">
          <div class="quiz-progress-track">
            <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <div class="quiz-meta-row">
            <span class="quiz-step-count">السؤال ${this.currentIndex + 1} من ${this.questions.length}</span>
            <span class="quiz-score-badge">النقاط: <strong>${this.score}</strong></span>
          </div>
        </div>

        <!-- منطقة السؤال -->
        <div class="quiz-question-body">
          <p class="quiz-prompt-text">${q.prompt}</p>

          ${q.type === 'listening' ? `
            <div class="listening-box">
              <button class="btn-play-audio-huge" id="quiz-audio-trigger" title="انقر للاستماع">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span>تشغيل الصوت 🔊</span>
              </button>
              <small class="audio-hint-text">انقر للاستماع مرة أخرى بأي وقت</small>
            </div>
          ` : `
            <div class="question-target-display">
              <h2 class="target-word" dir="ltr">${q.wordDisplay}</h2>
              ${q.meaning ? `<span class="target-subtext">(${q.meaning})</span>` : ''}
              ${q.sentenceDe ? `<div class="target-sentence-hint" dir="ltr"><em>"${q.sentenceDe}"</em></div>` : ''}
              <button class="btn-audio-mini" id="quiz-word-audio" title="استمع للكلمة">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </button>
            </div>
          `}

          <!-- خيارات الإجابة -->
          <div class="quiz-options-grid ${q.type === 'article' ? 'article-options' : ''}">
            ${q.options.map((opt, idx) => `
              <button class="quiz-option-btn ${q.type === 'article' ? `opt-${opt}` : ''}" data-val="${opt}" id="opt-btn-${idx}">
                <span class="option-label">${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- رسالة التغذية الراجعة بعد الإجابة -->
          <div class="quiz-feedback-box hidden" id="quiz-feedback"></div>
        </div>

        <!-- زر المتابعة -->
        <div class="quiz-footer">
          <button class="btn-primary btn-next-question hidden" id="btn-next-question">
            <span>السؤال التالي</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    // إذا كان اختبار استماع، نقوم بتشغيل الصوت تلقائياً بعد ثانية بسيطة
    if (q.type === 'listening') {
      setTimeout(() => {
        audioPlayer.speak(q.audioText);
      }, 300);
    }

    this.bindQuestionEvents(q);
  }

  bindQuestionEvents(q) {
    const audioTrigger = this.container.querySelector('#quiz-audio-trigger');
    if (audioTrigger) {
      audioTrigger.addEventListener('click', () => {
        audioPlayer.speak(q.audioText, audioTrigger);
      });
    }

    const wordAudio = this.container.querySelector('#quiz-word-audio');
    if (wordAudio) {
      wordAudio.addEventListener('click', () => {
        audioPlayer.speak(q.item.german, wordAudio);
      });
    }

    const optionBtns = this.container.querySelectorAll('.quiz-option-btn');
    const feedbackBox = this.container.querySelector('#quiz-feedback');
    const nextBtn = this.container.querySelector('#btn-next-question');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        this.answered = true;

        const selectedVal = btn.getAttribute('data-val');
        const isCorrect = selectedVal === q.correctAnswer;

        if (isCorrect) {
          this.score += 1;
          btn.classList.add('correct');
          audioPlayer.speak(q.item.german); // نطق الكلمة عند الإجابة الصحيحة
          feedbackBox.className = 'quiz-feedback-box success';
          feedbackBox.innerHTML = `
            <div class="feedback-icon">🎉</div>
            <div class="feedback-msg">
              <strong>إجابة صحيحة وممتازة!</strong>
              <span>${q.item.german} - ${q.item.arabic}</span>
            </div>
          `;
          Storage.markMastered(q.item.id);
        } else {
          btn.classList.add('incorrect');
          // إبراز الإجابة الصحيحة
          optionBtns.forEach(b => {
            if (b.getAttribute('data-val') === q.correctAnswer) {
              b.classList.add('correct');
            }
          });
          feedbackBox.className = 'quiz-feedback-box error';
          feedbackBox.innerHTML = `
            <div class="feedback-icon">💡</div>
            <div class="feedback-msg">
              <strong>ليست دقيقة! الإجابة الصحيحة هي: <b dir="ltr">${q.correctAnswer}</b></strong>
              <span>${q.item.german} تعني: ${q.item.arabic}</span>
            </div>
          `;
          Storage.markNeedsReview(q.item.id);
        }

        feedbackBox.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
      });
    });

    nextBtn.addEventListener('click', () => {
      this.currentIndex++;
      this.renderQuestion();
    });
  }

  renderSummary() {
    const total = this.questions.length;
    const percentage = Math.round((this.score / total) * 100);
    Storage.saveQuizResult(total, this.score);

    let cheerMsg = '';
    let emoji = '🏆';
    if (percentage >= 90) {
      cheerMsg = 'ممتاز جداً! أداء خارق وإتقان مبهر للغة الألمانية!';
      emoji = '🌟';
    } else if (percentage >= 70) {
      cheerMsg = 'رائع جداً! مستواك في تطور مستمر، استمر على هذا المنوال!';
      emoji = '👏';
    } else if (percentage >= 50) {
      cheerMsg = 'جيد، خطوة طيبة في مسار التعلم. مراجعة البطاقات ستعزز حصيلتك!';
      emoji = '💪';
    } else {
      cheerMsg = 'لا تقلق، التعلم يحتاج إلى التكرار! راجع الكلمات في وضع الفلاش كارد وأعد الاختبار.';
      emoji = '🌱';
    }

    this.container.innerHTML = `
      <div class="quiz-summary-card">
        <div class="summary-emoji">${emoji}</div>
        <h2 class="summary-title">اكتمل الاختبار بنجاح!</h2>
        <p class="summary-cheer">${cheerMsg}</p>

        <div class="summary-score-wheel">
          <div class="score-number">${percentage}%</div>
          <div class="score-ratio">${this.score} من إجمالي ${total} إجابات صحيحة</div>
        </div>

        <div class="summary-actions-row">
          <button class="btn-primary" id="btn-retry-quiz">
            <span>إعادة الاختبار بكلمات جديدة 🔄</span>
          </button>
          <button class="btn-secondary" id="btn-back-vocab">
            <span>العودة للمفردات 📚</span>
          </button>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector('#btn-retry-quiz');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        // إعادة الاختبار بالوضع الحالي
        this.startQuiz(this.questions.map(q => q.item), this.currentMode, total);
      });
    }

    const backBtn = this.container.querySelector('#btn-back-vocab');
    if (backBtn && this.onFinish) {
      backBtn.addEventListener('click', () => this.onFinish());
    }
  }
}
