// تدريبات امتحانية غير رسمية بمستويات متدرجة
import { examData } from '../../data/exam_simulator.js';
import { levelAssessmentQuestions } from '../../data/level_assessments.js';
import { shuffleQuestionOptions } from './assessment_utils.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class ExamSimulator {
  constructor(containerId = 'exams-mount') {
    this.container = document.getElementById(containerId);
    this.currentLevel = 'A1';
    this.isExamActive = false;
    this.currentIndex = 0;
    this.userAnswers = {};
    this.timerInterval = null;
    this.timeLeftSeconds = 0;
    this.examFinished = false;
    this.examResult = null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderSetup();
  }

  getExamData(level) {
    const original = examData[level];
    return {
      ...original,
      title: `اختبار تدريبي ${level} · نموذج غير رسمي`,
      durationMinutes: level === 'A1' ? 20 : level === 'A2' ? 25 : 30,
      sections: [...original.sections, ...levelAssessmentQuestions[level]]
    };
  }

  renderSetup() {
    this.isExamActive = false;
    this.examFinished = false;
    clearInterval(this.timerInterval);

    const history = Storage.getExamHistory();
    const activeProfile = Storage.getActiveProfile();

    this.container.innerHTML = `
      <div class="exam-simulator-wrap">
        <!-- Banner -->
        <div class="exam-banner-card">
          <div class="exam-banner-content">
            <span class="exam-badge">📝 تدريبات على أنماط أسئلة Goethe وTelc</span>
            <h1 class="exam-banner-title">اختبارات تدريبية متدرجة للمستويات A1–B1</h1>
            <p class="exam-banner-desc">
              تدرب على القراءة والمفردات والقواعد والاستماع بنماذج تعليمية محددة الوقت، مع مراجعة الإجابات وشرحها.
              هذه تدريبات غير رسمية، وليست امتحانات كاملة معتمدة أو بديلاً عن اختبارات Goethe أو telc.
            </p>
          </div>
          <div class="exam-banner-icon" aria-hidden="true">🎖️</div>
        </div>

        <!-- Level Selector Cards -->
        <div class="exam-levels-grid">
          ${['A1', 'A2', 'B1'].map(lvl => {
            const data = this.getExamData(lvl);
            const isSelected = this.currentLevel === lvl;
            return `
              <div class="exam-level-card ${isSelected ? 'selected' : ''}" data-level="${lvl}">
                <div class="level-card-top">
                  <span class="exam-lvl-tag lvl-${lvl.toLowerCase()}">${lvl}</span>
                  <span class="exam-duration-chip">⏱️ ${data.durationMinutes} دقيقة</span>
                </div>
                <h3 class="exam-lvl-title">${data.title}</h3>
                <p class="exam-lvl-desc">${data.targetAudience}</p>
                <div class="exam-meta-pills">
                  <span>📊 ${data.sections.length} سؤال تدريبي</span>
                  <span>🎯 مؤشر تدريب: ${data.passScorePercent}%</span>
                </div>
                <button class="btn-select-exam" data-level="${lvl}">
                  <span>${isSelected ? 'محدد حالياً ✅' : 'اختيار هذا المستوى'}</span>
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Start CTA Box -->
        <div class="exam-start-box">
          <div class="exam-student-info">
            <span class="info-avatar">${activeProfile.avatar || '🎓'}</span>
            <div>
              <strong>المتعلّم:</strong> ${activeProfile.name}
              <div style="font-size: 0.85rem; color: var(--text-muted);">
                تُحفظ نتائج التدريب في سجل الملف الشخصي النشط.
              </div>
            </div>
          </div>
          <button class="btn-primary btn-start-exam-main" id="btn-start-exam-trigger">
            <span>ابدأ اختبار ${this.currentLevel} الآن مع المؤقت 🚀</span>
          </button>
        </div>

        <!-- سجل المحاولات -->
        ${history.length > 0 ? `
          <div class="exam-history-card">
            <h3 class="history-title">📜 سجل المحاولات التدريبية لـ (${activeProfile.name}):</h3>
            <div class="history-list">
              ${history.map(item => `
                <div class="history-item ${item.passed ? 'passed' : 'failed'}">
                  <div class="history-info">
                    <span class="history-badge ${item.level.toLowerCase()}">${item.level}</span>
                    <div>
                      <strong>${item.title}</strong>
                      <div class="history-date">📅 ${new Date(item.date).toLocaleDateString('ar-EG')} - النتيجة: ${item.scorePercent}% (${item.passed ? 'تجاوز مؤشر التدريب' : 'يُنصح بمراجعة الأخطاء'})</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    this.bindSetupEvents();
  }

  bindSetupEvents() {
    const cards = this.container.querySelectorAll('.exam-level-card, .btn-select-exam');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const lvl = card.getAttribute('data-level');
        if (lvl && examData[lvl]) {
          this.currentLevel = lvl;
          this.renderSetup();
        }
      });

    });

    const startBtn = this.container.querySelector('#btn-start-exam-trigger');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.startExam(this.currentLevel);
      });
    }

  }

  startExam(level) {
    this.currentLevel = level;
    this.isExamActive = true;
    this.examFinished = false;
    this.currentIndex = 0;
    this.userAnswers = {};
    const data = this.getExamData(level);
    data.sections = data.sections.map(question => shuffleQuestionOptions(question));
    data.sections.sort(() => Math.random() - 0.5);
    this.currentExam = data;
    this.timeLeftSeconds = data.durationMinutes * 60;

    this.renderExamSession();
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeftSeconds--;
      this.updateTimerDisplay();

      if (this.timeLeftSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert('انتهى الوقت المحدد للاختبار! سيتم تصحيح إجاباتك الآن.');
        this.finishExam();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const timerEl = this.container.querySelector('#exam-timer-display');
    if (!timerEl) return;

    const mins = Math.floor(this.timeLeftSeconds / 60);
    const secs = this.timeLeftSeconds % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    timerEl.textContent = formatted;

    if (this.timeLeftSeconds < 120) {
      timerEl.classList.add('timer-warning');
    }
  }

  renderExamSession() {
    const data = this.currentExam || this.getExamData(this.currentLevel);
    const q = data.sections[this.currentIndex];
    const totalQ = data.sections.length;
    const answeredCount = Object.keys(this.userAnswers).length;
    const selectedAnswer = this.userAnswers[this.currentIndex];

    this.container.innerHTML = `
      <div class="exam-session-wrap">
        <!-- Top Sticky Header -->
        <div class="exam-header-bar">
          <div class="exam-header-left">
            <span class="exam-lvl-pill lvl-${this.currentLevel.toLowerCase()}">${this.currentLevel}</span>
            <span class="exam-title-short">${data.title}</span>
          </div>

          <div class="exam-header-center">
            <div class="exam-timer-badge">
              <span class="timer-icon">⏱️</span>
              <span class="timer-time" id="exam-timer-display">--:--</span>
            </div>
          </div>

          <div class="exam-header-right">
            <span class="exam-progress-text">السؤال ${this.currentIndex + 1} من ${totalQ}</span>
            <button class="btn-cancel-exam" id="btn-cancel-exam">إلغاء ✕</button>
          </div>
        </div>

        <!-- Session Progress Bar -->
        <div class="exam-progress-track">
          <div class="exam-progress-fill" style="width: ${((this.currentIndex + 1) / totalQ) * 100}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="exam-question-card">
          <div class="question-section-tag">
            <span>📌 ${q.section}</span>
          </div>

          ${q.text ? `
            <div class="question-german-passage" dir="ltr">
              ${q.text}
            </div>
          ` : ''}
          ${q.audio ? '<button class="btn-primary" data-action="play-exam-audio" type="button">استمع إلى المقطع 🔊</button>' : ''}

          <div class="question-main-prompt">
            <h3 class="q-prompt-de" dir="ltr">${q.question}</h3>
            ${q.questionAr ? `<p class="q-prompt-ar">${q.questionAr}</p>` : ''}
          </div>

          <!-- Options -->
          <div class="exam-options-list">
            ${q.options.map((opt, idx) => {
              const isChecked = selectedAnswer === idx;
              return `
                <button class="exam-option-item ${isChecked ? 'selected' : ''}" data-opt-idx="${idx}">
                  <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                  <span class="opt-text" dir="ltr">${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Question Footer Navigation -->
          <div class="exam-nav-footer">
            <button class="btn-nav-exam ${this.currentIndex === 0 ? 'disabled' : ''}" id="btn-prev-question" ${this.currentIndex === 0 ? 'disabled' : ''}>
              <span>السابق ⬅️</span>
            </button>

            <div class="answered-indicator">
              تمت الإجابة على ${answeredCount} من ${totalQ}
            </div>

            ${this.currentIndex === totalQ - 1 ? `
              <button class="btn-submit-exam-finish" id="btn-finish-exam">
                <span>إنهاء وتصحيح الاختبار ✅</span>
              </button>
            ` : `
              <button class="btn-nav-exam btn-next-q" id="btn-next-question">
                <span>التالي ➡️</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.updateTimerDisplay();
    this.bindSessionEvents();
  }

  bindSessionEvents() {
    const optionBtns = this.container.querySelectorAll('.exam-option-item');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        this.userAnswers[this.currentIndex] = idx;
        this.renderExamSession();
      });
    });

    const audioBtn = this.container.querySelector('[data-action="play-exam-audio"]');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => audioPlayer.speak(this.currentExam.sections[this.currentIndex].audio, audioBtn));
    }

    const prevBtn = this.container.querySelector('#btn-prev-question');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.renderExamSession();
        }
      });
    }

    const nextBtn = this.container.querySelector('#btn-next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalQ = this.currentExam.sections.length;
        if (this.currentIndex < totalQ - 1) {
          this.currentIndex++;
          this.renderExamSession();
        }
      });
    }

    const finishBtn = this.container.querySelector('#btn-finish-exam');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        const answeredCount = Object.keys(this.userAnswers).length;
        const totalQ = this.currentExam.sections.length;
        if (answeredCount < totalQ) {
          if (!confirm(`لقد أجبت على ${answeredCount} فقط من أصل ${totalQ} أسئلة. هل أنت متأكد من رغبتك في إنهاء الاختبار وتصحيحه الآن؟`)) {
            return;
          }
        }
        this.finishExam();
      });
    }

    const cancelBtn = this.container.querySelector('#btn-cancel-exam');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (confirm('هل تريد إلغاء الاختبار والعودة للصفحة الرئيسية لمحاكي الامتحانات؟')) {
          clearInterval(this.timerInterval);
          this.renderSetup();
        }
      });
    }
  }

  finishExam() {
    clearInterval(this.timerInterval);
    this.isExamActive = false;
    this.examFinished = true;

    const data = this.currentExam || this.getExamData(this.currentLevel);
    let correctCount = 0;

    data.sections.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.correct) {
        correctCount++;
      }
      if (q.skill === 'reading' || q.skill === 'listening') {
        Storage.recordSkillPractice(q.skill, this.userAnswers[idx] === q.correct);
      }
    });

    const totalQuestions = data.sections.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercent >= data.passScorePercent;
    const activeProfile = Storage.getActiveProfile();

    const result = {
      level: this.currentLevel,
      title: data.title,
      studentName: activeProfile.name,
      totalQuestions,
      correctCount,
      scorePercent,
      passed,
      practiceOnly: true
    };

    this.examResult = result;
    Storage.saveExamResult(result);

    if (passed) {
      Storage.addXP(50);
      Storage.unlockBadge('exam_master');
    }

    this.renderResultView();
  }

  renderResultView() {
    const res = this.examResult;
    const data = this.currentExam || this.getExamData(this.currentLevel);

    this.container.innerHTML = `
      <div class="exam-result-wrap">
        <!-- Score Banner -->
        <div class="result-banner-card ${res.passed ? 'pass-banner' : 'fail-banner'}">
          <div class="result-banner-icon">${res.passed ? '🎉' : '🌱'}</div>
          <h2 class="result-banner-title">
            ${res.passed ? 'تهانينا! لقد اجتزت الاختبار بنجاح باهر!' : 'محاولة جيدة! استمر في التدريب وستصل بالتأكيد!'}
          </h2>
          <p class="result-banner-subtitle">
            ${res.passed ? 'تجاوزت مؤشر النجاح الداخلي لهذا التدريب. هذه النتيجة تعليمية ولا تمنح اعتماداً أو شهادة رسمية.' : 'راجع الإجابات والشرح، ثم أعد التدريب عندما تكون مستعداً.'}
          </p>

          <div class="result-stats-row">
            <div class="stat-pill">
              <span class="pill-label">النسبة المئوية:</span>
              <strong class="pill-val">${res.scorePercent}%</strong>
            </div>
            <div class="stat-pill">
              <span class="pill-label">الإجابات الصحيحة:</span>
              <strong class="pill-val">${res.correctCount} من ${res.totalQuestions}</strong>
            </div>
            <div class="stat-pill">
              <span class="pill-label">المستوى:</span>
              <strong class="pill-val">${res.level}</strong>
            </div>
          </div>

          <div class="result-actions-row">
            <button class="btn-primary" id="btn-retake-exam">
              <span>إعادة التدريب 🔄</span>
            </button>
            <button class="btn-outline" id="btn-back-to-setup">
              <span>العودة لقائمة الامتحانات 📋</span>
            </button>
          </div>
        </div>

        <!-- Detailed Review of Questions -->
        <div class="review-section-card">
          <h3 class="review-title">🔍 مراجعة الأسئلة والإجابات النموذجية مع الشرح:</h3>
          <div class="review-questions-list">
            ${data.sections.map((q, idx) => {
              const userAns = this.userAnswers[idx];
              const isCorrect = userAns === q.correct;
              return `
                <div class="review-item-card ${isCorrect ? 'item-correct' : 'item-wrong'}">
                  <div class="review-header">
                    <span class="q-number">السؤال ${idx + 1}: ${q.section}</span>
                    <span class="q-status-badge ${isCorrect ? 'correct' : 'wrong'}">
                      ${isCorrect ? 'إجابة صحيحة ✔️' : 'إجابة خاطئة ❌'}
                    </span>
                  </div>

                  ${q.text ? `<div class="review-passage" dir="ltr">${q.text}</div>` : ''}

                  <h4 class="review-prompt" dir="ltr">${q.question}</h4>
                  ${q.questionAr ? `<p class="review-prompt-ar">${q.questionAr}</p>` : ''}

                  <div class="review-options">
                    ${q.options.map((opt, optIdx) => {
                      let optClass = '';
                      if (optIdx === q.correct) optClass = 'is-correct-target';
                      else if (optIdx === userAns) optClass = 'is-user-wrong';
                      return `
                        <div class="review-opt ${optClass}">
                          <span>${String.fromCharCode(65 + optIdx)}.</span>
                          <span dir="ltr">${opt}</span>
                          ${optIdx === q.correct ? ' <span class="badge-correct">الإجابة الصحيحة ✔️</span>' : ''}
                          ${optIdx === userAns && !isCorrect ? ' <span class="badge-wrong">إجابتك ❌</span>' : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div class="review-explanation">
                    💡 <strong>الشرح التوضيحي:</strong> ${q.explanation}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    const retakeBtn = this.container.querySelector('#btn-retake-exam');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        this.startExam(this.currentLevel);
      });
    }

    const backBtn = this.container.querySelector('#btn-back-to-setup');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.renderSetup();
      });
    }
  }

}
