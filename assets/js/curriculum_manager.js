import { allVocabulary, vocabularyByLevel } from '../../data/vocab.js';
import { curriculum, placementQuestions, recommendPlacementLevel } from '../../data/curriculum.js';
import { curriculumLessonContent, curriculumOutputPrompts } from '../../data/curriculum_content.js';
import { audioPlayer } from './audio.js';
import { shuffleQuestionOptions, validateWritingSubmission } from './assessment_utils.js';
import { Storage } from './storage.js';

const SKILLS = {
  reading: 'القراءة',
  listening: 'الاستماع',
  writing: 'الكتابة',
  speaking: 'التحدث'
};

export class CurriculumManager {
  constructor(container, options = {}) {
    this.container = container;
    this.navigate = options.navigate || (() => {});
    this.level = Storage.getLearningProgress().placement?.level || 'A1';
    this.currentLesson = null;
    this.placementIndex = -1;
    this.placementAnswers = [];
    this.placementOptions = [];
    this.lessonRecording = null;
    this.render();
  }

  progress() {
    return Storage.getLearningProgress();
  }

  getLessons(level) {
    return curriculum[level].units.flatMap(unit => unit.categories.map((category, index) => ({
      id: `${unit.id}-${index + 1}`,
      level,
      unit,
      category,
      index
    })));
  }

  getWords(lesson) {
    const list = vocabularyByLevel[this.level] || allVocabulary;
    const matching = list.filter(word => word.category === lesson.category);
    return matching.length ? matching : list;
  }

  render() {
    if (!this.container) return;
    if (this.currentLesson) {
      this.renderLesson(this.currentLesson);
      return;
    }
    if (this.placementIndex >= 0) {
      this.renderPlacementQuestion();
      return;
    }
    this.renderOverview();
  }

  renderOverview() {
    const progress = this.progress();
    const placement = progress.placement;
    const allLessons = Object.keys(curriculum).flatMap(level => this.getLessons(level));
    const completedCount = progress.completedLessons.length;
    const lastLevel = placement?.level || this.level;
    const recommendedLevel = placement?.level || this.level;
    const lessonsAtRecommendedLevel = this.getLessons(recommendedLevel);
    const nextLesson = lessonsAtRecommendedLevel.find(lesson => !progress.completedLessons.includes(lesson.id)) ||
      allLessons.find(lesson => !progress.completedLessons.includes(lesson.id));
    const attemptedSkills = Object.entries(SKILLS)
      .map(([key, label]) => {
        const stats = progress.skills[key] || { attempts: 0, correct: 0 };
        return { key, label, ...stats, percentage: stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0 };
      })
      .filter(skill => skill.attempts > 0)
      .sort((a, b) => a.percentage - b.percentage || b.attempts - a.attempts);
    const focusSkill = attemptedSkills.find(skill => skill.percentage < 70);
    const strongestSkill = attemptedSkills.at(-1);

    this.container.innerHTML = `
      <div class="learning-hub">
        <header class="learning-hub-header">
          <span class="learning-eyebrow">منهج DeutschMeister · A1–B1</span>
          <h1>مسارك لتعلّم الألمانية</h1>
          <p>منهج تدريجي يربط المفردات والقواعد بالتدريب على القراءة والاستماع والكتابة والتحدث.</p>
        </header>
        <section class="placement-banner">
          <div>
            <strong>${placement ? `تقديرك الحالي: ${placement.level}` : 'ابدأ باختبار تحديد المستوى'}</strong>
            <p>${placement ? `آخر تقييم: ${new Date(placement.date).toLocaleDateString('ar-EG')} · التقدير إرشادي ويتحسن مع مزيد من التمارين.` : 'اختبار قصير من 15 سؤالاً في المفردات والقواعد والقراءة والاستماع.'}</p>
          </div>
          <button class="learning-primary-btn" data-action="start-placement">${placement ? 'إعادة اختبار المستوى' : 'ابدأ الاختبار'}</button>
        </section>
        <section class="learning-report">
          <div class="learning-section-heading">
            <div><span class="learning-eyebrow">لوحة تقدّمك</span><h2>تقدّمك في المهارات الأربع</h2></div>
            <span class="learning-progress-count">${completedCount} / ${allLessons.length} درس مكتمل</span>
          </div>
          <div class="skill-progress-grid">
            ${Object.entries(SKILLS).map(([key, label]) => {
              const stats = progress.skills[key] || { attempts: 0, correct: 0 };
              const percentage = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0;
              return `<div class="skill-progress-card"><span>${label}</span><strong>${stats.attempts ? `${percentage}%` : 'لم يبدأ بعد'}</strong><div class="skill-progress-track"><i style="width:${percentage}%"></i></div><small>${stats.attempts} تدريب مسجل</small></div>`;
            }).join('')}
          </div>
          <p class="learning-disclaimer">نتائج القراءة والاستماع محسوبة آلياً. تسجيل الكتابة والتحدث يعتمد على إنجازك وتقييمك الذاتي، ولا تدّعي المنصة تصحيحاً لغوياً آلياً لهما.</p>
        </section>
        <section class="learning-next-step" aria-live="polite">
          <div>
            <span class="learning-eyebrow">خطوتك التالية</span>
            <h3>${nextLesson ? (focusSkill ? `ركّز على ${focusSkill.label} ثم تابع المنهج` : strongestSkill ? `أداء قوي في ${strongestSkill.label}، واصل التقدم` : `ابدأ درساً مناسباً لمستوى ${nextLesson.level}`) : 'أكملت جميع دروس المنهج'}</h3>
            <p>${nextLesson ? `${focusSkill ? `نتيجتك الحالية في ${focusSkill.label}: ${focusSkill.percentage}% من ${focusSkill.attempts} تدريباً. ` : strongestSkill ? `نتيجتك الحالية في ${strongestSkill.label}: ${strongestSkill.percentage}% من ${strongestSkill.attempts} تدريباً. ` : ''}الدرس المقترح: ${nextLesson.level} · ${nextLesson.unit.title} · ${nextLesson.category}.` : 'يمكنك إعادة أي درس أو تجربة اختبار تدريبي للمستوى التالي.'}</p>
          </div>
          ${nextLesson ? `<button class="learning-primary-btn" data-action="open-recommended-lesson" data-level="${nextLesson.level}" data-unit="${nextLesson.unit.id}" data-category="${nextLesson.category}" data-index="${nextLesson.index}">ابدأ الدرس المقترح</button>` : ''}
        </section>
        <section class="curriculum-section">
          <div class="learning-section-heading"><div><span class="learning-eyebrow">اختر مسارك</span><h2>خريطة المنهج</h2></div></div>
          <div class="curriculum-level-tabs" role="tablist" aria-label="مستوى المنهج">
            ${Object.keys(curriculum).map(level => `<button class="curriculum-level-tab ${this.level === level ? 'active' : ''}" data-action="select-level" data-level="${level}" role="tab" aria-selected="${this.level === level}">${level}${level === lastLevel ? ' · المقترح' : ''}</button>`).join('')}
          </div>
          <div class="level-intro"><h3>${this.level}: ${curriculum[this.level].title}</h3><p>${curriculum[this.level].description}</p></div>
          <div class="curriculum-units">
            ${curriculum[this.level].units.map((unit, unitIndex) => `
              <article class="curriculum-unit-card">
                <div class="unit-number">${String(unitIndex + 1).padStart(2, '0')}</div>
                <div class="unit-content">
                  <span class="learning-eyebrow">${this.level} · الوحدة ${unitIndex + 1}</span>
                  <h3>${unit.title}</h3><p>${unit.outcomes.join(' · ')}</p>
                  <div class="unit-grammar"><strong>القواعد:</strong> ${unit.grammar}</div>
                  <div class="unit-vocab-count">${unit.categories.map(category => {
                    const count = (vocabularyByLevel[this.level] || []).filter(word => word.category === category).length;
                    return `<span>${category}: ${count} مفردة</span>`;
                  }).join('')}</div>
                  <div class="unit-lesson-actions">
                    ${unit.categories.map((category, index) => {
                      const lessonId = `${unit.id}-${index + 1}`;
                      const done = progress.completedLessons.includes(lessonId);
                      return `<button class="lesson-launch-btn ${done ? 'is-complete' : ''}" data-action="open-lesson" data-unit="${unit.id}" data-category="${category}" data-index="${index}">${done ? '✓ أعد الدرس' : `ابدأ درس ${index + 1}`} · ${category}</button>`;
                    }).join('')}
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
          <p class="learning-disclaimer">الخريطة الحالية منهج تدريبي تأسيسي، وليست بديلاً عن مواصفات المنهج الرسمي أو توصيف امتحان جهة مانحة.</p>
        </section>
        <section class="mock-exam-callout"><div><span class="learning-eyebrow">تدريب إضافي</span><h2>تدريب ومحاكاة امتحانات المستوى</h2><p>جرّب الاختبارات المتدرجة ثم راجع أخطاءك. هذه نماذج تدريبية مستقلة وليست امتحانات رسمية أو شهادات معتمدة.</p></div><button class="learning-secondary-btn" data-action="open-exams">اذهب إلى الاختبارات</button></section>
      </div>
    `;
    this.bindOverviewEvents();
  }

  bindOverviewEvents() {
    this.container.querySelectorAll('[data-action="select-level"]').forEach(button => {
      button.addEventListener('click', () => {
        this.level = button.dataset.level;
        this.renderOverview();
      });
    });
    this.container.querySelector('[data-action="start-placement"]')?.addEventListener('click', () => {
      this.placementIndex = 0;
      this.placementAnswers = [];
      this.placementOptions = placementQuestions.map(question => shuffleQuestionOptions(question));
      this.renderPlacementQuestion();
    });
    this.container.querySelectorAll('[data-action="open-lesson"]').forEach(button => {
      button.addEventListener('click', () => {
        this.openLesson(button.dataset.level || this.level, button.dataset.unit, button.dataset.category, Number(button.dataset.index));
      });
    });
    this.container.querySelector('[data-action="open-recommended-lesson"]')?.addEventListener('click', event => {
      const button = event.currentTarget;
      this.openLesson(button.dataset.level, button.dataset.unit, button.dataset.category, Number(button.dataset.index));
    });
    this.container.querySelector('[data-action="open-exams"]')?.addEventListener('click', () => this.navigate('exams'));
  }

  openLesson(level, unitId, category, index) {
    const unit = curriculum[level].units.find(item => item.id === unitId);
    if (!unit) throw new Error(`Curriculum unit ${unitId} was not found for ${level}.`);
    this.level = level;
    this.currentLesson = { id: `${unit.id}-${index + 1}`, level, unit, category, index };
    this.renderLesson(this.currentLesson);
  }

  renderPlacementQuestion() {
    if (this.placementIndex >= placementQuestions.length) {
      this.finishPlacement();
      return;
    }
    const question = placementQuestions[this.placementIndex];
    const shuffledQuestion = this.placementOptions[this.placementIndex] || question;
    const previous = this.placementAnswers[this.placementIndex];
    this.container.innerHTML = `
      <section class="assessment-shell">
        <button class="learning-back-btn" data-action="cancel-placement">← العودة إلى خريطة المنهج</button>
        <span class="learning-eyebrow">اختبار تحديد المستوى · ${question.level}</span>
        <h1>السؤال ${this.placementIndex + 1} من ${placementQuestions.length}</h1>
        <div class="assessment-progress"><i style="width:${((this.placementIndex + 1) / placementQuestions.length) * 100}%"></i></div>
        <div class="assessment-skill-tag">مجال السؤال: ${this.skillName(question.skill)}</div>
        ${question.audio ? '<button class="learning-secondary-btn" data-action="play-question-audio">استمع إلى الجملة الألمانية 🔊</button>' : ''}
        <h2 class="assessment-prompt" dir="ltr">${question.prompt}</h2>
        <div class="assessment-options">${shuffledQuestion.options.map((option, index) => `<button class="assessment-option ${previous?.choice === index ? (previous.correct ? 'correct' : 'incorrect') : ''}" data-action="answer-placement" data-choice="${index}" ${previous ? 'disabled' : ''}>${option}</button>`).join('')}</div>
        <div class="assessment-feedback" aria-live="polite">${previous ? `<strong>${previous.correct ? 'إجابة صحيحة' : 'ليست الإجابة الصحيحة'}</strong><p>${question.explanation}</p><button class="learning-primary-btn" data-action="next-placement">${this.placementIndex === placementQuestions.length - 1 ? 'عرض النتيجة' : 'السؤال التالي'}</button>` : ''}</div>
      </section>
    `;
    this.container.querySelector('[data-action="play-question-audio"]')?.addEventListener('click', () => audioPlayer.speak(question.audio));
    this.container.querySelector('[data-action="cancel-placement"]')?.addEventListener('click', () => {
      this.placementIndex = -1;
      this.renderOverview();
    });
    this.container.querySelectorAll('[data-action="answer-placement"]').forEach(button => {
      button.addEventListener('click', () => {
        const choice = Number(button.dataset.choice);
        const correct = choice === shuffledQuestion.correct;
        this.placementAnswers[this.placementIndex] = { choice, correct };
        this.recordAssessmentSkill(question.skill, correct);
        this.renderPlacementQuestion();
      });
    });
    this.container.querySelector('[data-action="next-placement"]')?.addEventListener('click', () => {
      this.placementIndex++;
      this.renderPlacementQuestion();
    });
  }

  finishPlacement() {
    const scores = {};
    for (const level of ['A1', 'A2', 'B1']) {
      const indices = placementQuestions.map((question, index) => question.level === level ? index : -1).filter(index => index >= 0);
      scores[level] = indices.filter(index => this.placementAnswers[index]?.correct).length;
    }
    const level = recommendPlacementLevel(scores);
    Storage.savePlacementResult({ level, scores, date: new Date().toISOString(), questionCount: placementQuestions.length });
    this.level = level;
    this.placementIndex = -1;
    this.container.innerHTML = `
      <section class="assessment-shell placement-result">
        <span class="learning-eyebrow">نتيجة تقديرية</span>
        <h1>نقترح أن تبدأ من ${level}</h1>
        <p>هذه نتيجة تشخيصية قصيرة وليست شهادة أو حكماً نهائياً على مستواك. يمكنك تغيير المستوى ومتابعة أي درس.</p>
        <div class="placement-score-grid">${Object.entries(scores).map(([name, score]) => `<div><strong>${name}</strong><span>${score} / 5</span></div>`).join('')}</div>
        <button class="learning-primary-btn" data-action="view-recommended-curriculum">عرض خريطة ${level}</button>
      </section>
    `;
    this.container.querySelector('[data-action="view-recommended-curriculum"]')?.addEventListener('click', () => this.renderOverview());
  }

  skillName(skill) {
    return SKILLS[skill] || ({ grammar: 'القواعد', vocabulary: 'المفردات' })[skill] || skill;
  }

  recordAssessmentSkill(skill, correct) {
    const skillMap = { reading: 'reading', listening: 'listening', writing: 'writing', speaking: 'speaking' };
    if (skillMap[skill]) Storage.recordSkillPractice(skillMap[skill], correct);
  }

  renderLesson(lesson) {
    this.disposeLessonRecording();
    const words = this.getWords(lesson);
    const word = words[lesson.index % words.length];
    const lessonContent = curriculumLessonContent[lesson.id];
    const outputPrompts = curriculumOutputPrompts[lesson.id];
    if (!lessonContent || !outputPrompts) throw new Error(`Lesson content or output prompts are missing for ${lesson.id}.`);
    const readingQuestion = shuffleQuestionOptions(lessonContent.reading);
    const listeningQuestion = shuffleQuestionOptions(lessonContent.listening);
    const readingOptions = readingQuestion.options.map((text, index) => ({
      text,
      correct: index === readingQuestion.correct
    }));
    const progress = this.progress();
    const lessonComplete = progress.completedLessons.includes(lesson.id);

    this.container.innerHTML = `
      <article class="curriculum-lesson">
        <button class="learning-back-btn" data-action="back-to-curriculum">← خريطة المنهج</button>
        <span class="learning-eyebrow">${this.level} · ${lesson.unit.title} · ${lesson.category}</span>
        <h1>${word.article ? `${word.article} ` : ''}${word.word}</h1>
        <p class="lesson-meaning">${word.arabic}</p>
        <div class="lesson-example" dir="ltr">${word.sentenceDe}<button type="button" data-action="play-example" aria-label="استمع للمثال">🔊</button><p dir="rtl">${word.sentenceAr}</p></div>
        <div class="lesson-skill-grid">
          <section class="lesson-skill-card lesson-content-card"><span class="skill-card-icon">📖</span><h2>القراءة</h2><p>اقرأ النص ثم أجب عن سؤال الفهم.</p><blockquote class="curriculum-passage" lang="de" dir="ltr">${lessonContent.reading.text}</blockquote><details class="curriculum-translation"><summary>عرض المعنى بالعربية</summary><p dir="rtl">${lessonContent.reading.translation}</p></details><strong class="curriculum-question" lang="de" dir="ltr">${lessonContent.reading.question}</strong><div class="lesson-options">${readingOptions.map(option => `<button data-action="check-reading" data-correct="${option.correct}">${option.text}</button>`).join('')}</div><p class="lesson-feedback" data-feedback="reading" aria-live="polite"></p></section>
          <section class="lesson-skill-card lesson-content-card"><span class="skill-card-icon">🎧</span><h2>الاستماع</h2><p>استمع للنص المنطوق آلياً ثم اختر الإجابة التي فهمتها.</p><button class="learning-secondary-btn" data-action="play-listening">استمع إلى المقطع 🔊</button><strong class="curriculum-question" lang="de" dir="ltr">${lessonContent.listening.question}</strong><div class="lesson-options">${listeningQuestion.options.map((option, index) => `<button data-action="check-listening" data-correct="${index === listeningQuestion.correct}">${option}</button>`).join('')}</div><details class="curriculum-translation"><summary>عرض نص المقطع</summary><p lang="de" dir="ltr">${lessonContent.listening.audio}</p></details><p class="lesson-feedback" data-feedback="listening" aria-live="polite"></p></section>
          <section class="lesson-skill-card lesson-output-card"><span class="skill-card-icon">✍️</span><h2>الكتابة</h2><p>${outputPrompts.writingPrompt} اكتب ${outputPrompts.minWords} كلمات على الأقل، ثم راجع عملك بنفسك.</p><textarea data-writing-input rows="5" maxlength="1000" lang="de" dir="ltr" aria-label="اكتب إجابتك بالألمانية" placeholder="اكتب إجابتك بالألمانية..."></textarea><details class="curriculum-translation"><summary>عرض مثال للمراجعة</summary><p lang="de" dir="ltr">${outputPrompts.writingExample}</p></details><fieldset class="self-review-list"><legend>قائمة مراجعة ذاتية</legend><label><input type="checkbox" data-writing-check> بدأت الجمل بحرف كبير وأنهيتها بعلامة مناسبة.</label><label><input type="checkbox" data-writing-check> راجعت كتابة الأسماء الألمانية بحرف كبير.</label><label><input type="checkbox" data-writing-check> تحققت من ترتيب الكلمات والفعل.</label></fieldset><label class="self-assessment-check"><input type="checkbox" data-action="confirm-writing-review"> راجعت إجابتي وأعتبر أنني أنجزت المهمة.</label><button class="learning-secondary-btn" data-action="complete-writing">سجل إنجاز الكتابة</button><p class="lesson-feedback" data-feedback="writing" aria-live="polite"></p></section>
          <section class="lesson-skill-card lesson-output-card"><span class="skill-card-icon">🗣️</span><h2>التحدث</h2><p>الموقف: ${outputPrompts.speakingRole}</p><ul class="speaking-starters" lang="de" dir="ltr">${outputPrompts.speakingStarters.map(starter => `<li>${starter}</li>`).join('')}</ul><p>سجّل إجابتك ثم استمع إليها. يُستخدم الميكروفون داخل المتصفح فقط؛ لا يُرفع التسجيل أو يُقيّم آلياً.</p><button class="learning-secondary-btn" data-action="toggle-lesson-recording">ابدأ التسجيل 🎙️</button><div class="lesson-recording-player" data-recording-player></div><label class="self-assessment-check"><input type="checkbox" data-action="confirm-speaking-review"> استمعت إلى تسجيلي وأقيّم أنني أجبت عن الموقف.</label><button class="lesson-complete-btn" data-action="complete-speaking" disabled>سجل إنجاز التحدث</button><p class="lesson-feedback" data-feedback="speaking" aria-live="polite"></p></section>
        </div>
        <div class="lesson-completion"><span>${lessonComplete ? 'أكملت هذا الدرس سابقاً.' : 'أكمل أنشطة المهارات الأربع لتسجيل الدرس.'}</span><button class="learning-primary-btn" data-action="complete-lesson" ${lessonComplete ? 'disabled' : ''}>${lessonComplete ? 'الدرس مكتمل ✓' : 'تسجيل إتمام الدرس'}</button></div>
      </article>
    `;
    this.container.querySelector('[data-action="back-to-curriculum"]')?.addEventListener('click', () => {
      this.disposeLessonRecording();
      this.currentLesson = null;
      this.renderOverview();
    });
    this.container.querySelector('[data-action="play-example"]')?.addEventListener('click', () => audioPlayer.speak(word.sentenceDe));
    this.container.querySelector('[data-action="play-listening"]')?.addEventListener('click', () => audioPlayer.speak(lessonContent.listening.audio));
    this.bindPracticeOptions('check-reading', 'reading');
    this.bindPracticeOptions('check-listening', 'listening');
    this.container.querySelector('[data-action="complete-writing"]')?.addEventListener('click', () => {
      const text = this.container.querySelector('[data-writing-input]').value.trim();
      const selfReviewed = this.container.querySelector('[data-action="confirm-writing-review"]').checked;
      const submission = validateWritingSubmission(text, outputPrompts.minWords, selfReviewed);
      if (!submission.ready) {
        const message = submission.wordCount < outputPrompts.minWords
          ? `اكتب ${outputPrompts.minWords} كلمات على الأقل (كتبت ${submission.wordCount})، ثم راجعها.`
          : 'أكّد مراجعتك الذاتية قبل تسجيل إنجاز الكتابة.';
        this.showSkillFeedback('writing', message);
        return;
      }
      Storage.recordSkillPractice('writing', true, lesson.id);
      this.container.querySelector('[data-action="complete-writing"]').disabled = true;
      this.showSkillFeedback('writing', 'سُجل إنجاز المهمة بتقييمك الذاتي. لا تتضمن المنصة تصحيحاً لغوياً آلياً.');
    });
    this.container.querySelector('[data-action="toggle-lesson-recording"]')?.addEventListener('click', () => this.toggleLessonRecording());
    this.container.querySelector('[data-action="confirm-speaking-review"]')?.addEventListener('change', event => {
      const completeButton = this.container.querySelector('[data-action="complete-speaking"]');
      completeButton.disabled = !this.lessonRecording?.recorded || !event.currentTarget.checked;
    });
    this.container.querySelector('[data-action="complete-speaking"]')?.addEventListener('click', () => {
      if (!this.lessonRecording?.recorded ||
          !this.container.querySelector('[data-action="confirm-speaking-review"]').checked) {
        this.showSkillFeedback('speaking', 'سجّل إجابتك واستمع إليها ثم أكّد تقييمك الذاتي أولاً.');
        return;
      }
      Storage.recordSkillPractice('speaking', true, lesson.id);
      this.container.querySelector('[data-action="complete-speaking"]').disabled = true;
      this.container.querySelector('[data-action="toggle-lesson-recording"]').disabled = true;
      this.showSkillFeedback('speaking', 'سُجل إنجاز التحدث بتقييمك الذاتي. لا يُرفع التسجيل ولا يُحلل آلياً.');
    });
    this.container.querySelector('[data-action="complete-lesson"]')?.addEventListener('click', () => {
      const current = this.progress();
      const requiredSkills = ['reading', 'listening', 'writing', 'speaking'];
      const hasActivity = requiredSkills.every(skill => current.lessonSkills[lesson.id]?.[skill]?.attempts);
      if (!hasActivity) {
        this.container.querySelector('.lesson-completion span').textContent = 'أكمل نشاط قراءة واستماع وكتابة وتحدث أولاً.';
        return;
      }
      Storage.markLessonCompleted(lesson.id);
      this.renderLesson(lesson);
    });
  }

  async toggleLessonRecording() {
    if (this.lessonRecording?.recorder?.state === 'recording') {
      this.lessonRecording.recorder.stop();
      return;
    }
    const feedback = this.container.querySelector('[data-feedback="speaking"]');
    const button = this.container.querySelector('[data-action="toggle-lesson-recording"]');
    if (this.lessonRecording?.url) URL.revokeObjectURL(this.lessonRecording.url);
    this.lessonRecording?.stream?.getTracks().forEach(track => track.stop());
    this.lessonRecording = null;
    this.container.querySelector('[data-recording-player]').replaceChildren();
    this.container.querySelector('[data-action="confirm-speaking-review"]').checked = false;
    this.container.querySelector('[data-action="complete-speaking"]').disabled = true;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      feedback.textContent = 'التسجيل الصوتي غير مدعوم في هذا المتصفح. جرّب مدرب النطق من القائمة أو استخدم متصفحاً حديثاً.';
      return;
    }
    button.disabled = true;
    feedback.textContent = 'نطلب إذن الميكروفون لبدء التسجيل...';
    let openedStream;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      openedStream = stream;
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      this.lessonRecording = { stream, recorder, chunks, url: null, recorded: false };
      recorder.addEventListener('dataavailable', event => {
        if (event.data.size > 0) chunks.push(event.data);
      });
      recorder.addEventListener('error', event => {
        feedback.textContent = `تعذر تسجيل الصوت: ${event.error?.message || 'حدث خطأ في مسجل الصوت.'}`;
      });
      recorder.addEventListener('stop', () => {
        if (this.lessonRecording?.recorder !== recorder) return;
        clearInterval(this.lessonRecording?.timer);
        stream.getTracks().forEach(track => track.stop());
        if (!chunks.length) {
          feedback.textContent = 'لم يُسجل صوت. تحقق من الميكروفون ثم حاول مجدداً.';
          button.disabled = false;
          button.textContent = 'إعادة التسجيل 🎙️';
          return;
        }
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        this.lessonRecording.url = URL.createObjectURL(blob);
        this.lessonRecording.recorded = true;
        const player = this.container.querySelector('[data-recording-player]');
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = this.lessonRecording.url;
        audio.setAttribute('aria-label', 'استمع إلى تسجيل إجابتك');
        player.replaceChildren(audio);
        button.disabled = false;
        button.textContent = 'إعادة التسجيل 🎙️';
        const selfReview = this.container.querySelector('[data-action="confirm-speaking-review"]');
        this.container.querySelector('[data-action="complete-speaking"]').disabled = !selfReview.checked;
        feedback.textContent = 'اكتمل التسجيل. استمع إليه، ثم أكّد تقييمك الذاتي لتسجيل إنجاز التدريب.';
      }, { once: true });
      recorder.start();
      button.disabled = false;
      button.textContent = 'إيقاف التسجيل ⏹️';
      feedback.textContent = 'التسجيل جارٍ (بحد أقصى 30 ثانية). اضغط لإيقافه والاستماع إلى إجابتك.';
      this.lessonRecording.timer = setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, 30000);
    } catch (error) {
      console.error('Unable to record curriculum speaking practice:', error);
      openedStream?.getTracks().forEach(track => track.stop());
      button.disabled = false;
      feedback.textContent = error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError'
        ? 'لم يُسمح باستخدام الميكروفون. غيّر إذنه من إعدادات المتصفح ثم حاول مجدداً.'
        : `تعذر بدء التسجيل: ${error.message || 'تحقق من الميكروفون وإعدادات المتصفح.'}`;
    }
  }

  disposeLessonRecording() {
    const recording = this.lessonRecording;
    if (!recording) return;
    clearTimeout(recording.timer);
    if (recording.recorder?.state === 'recording') recording.recorder.stop();
    recording.stream?.getTracks().forEach(track => track.stop());
    if (recording.url) URL.revokeObjectURL(recording.url);
    this.lessonRecording = null;
  }

  bindPracticeOptions(action, skill) {
    this.container.querySelectorAll(`[data-action="${action}"]`).forEach(button => {
      button.addEventListener('click', () => {
        const correct = button.dataset.correct === 'true';
        Storage.recordSkillPractice(skill, correct, this.currentLesson.id);
        this.showSkillFeedback(skill, correct ? 'إجابة صحيحة، أحسنت!' : 'ليست الإجابة الصحيحة. راجع الجملة والمثال ثم حاول مجدداً.');
        button.parentElement.querySelectorAll('button').forEach(option => {
          option.disabled = true;
          if (option.dataset.correct === 'true') option.classList.add('correct');
          else if (option === button) option.classList.add('incorrect');
        });
      });
    });
  }

  showSkillFeedback(skill, message) {
    const feedback = this.container.querySelector(`[data-feedback="${skill}"]`);
    if (feedback) feedback.textContent = message;
  }
}
