// مدرب النطق الصوتي بالميكروفون (Web Speech Recognition Trainer)
// يدعم كافة المتصفحات والهواتف مع معالجة الأذونات والبديل الكتابي الذكي
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class SpeechTrainer {
  constructor(containerElement, onXPUpdate = null) {
    this.container = containerElement;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.recognition = null;
    this.isListening = false;
    this.practiceItems = [
      { de: "Guten Tag, wie geht es Ihnen?", ar: "نهارك سعيد، كيف حال حضرتك؟", level: "A1", tip: "انتبه لنطق حرف G بنعومة ونبرة الترحيب الرسمية." },
      { de: "Ich lerne jeden Tag Deutsch.", ar: "أنا أتعلم الألمانية كل يوم.", level: "A1", tip: "حرف ch في Ich يُنطق كصوت شين رقيقة وناعمة." },
      { de: "Entschuldigung, wo ist der Bahnhof?", ar: "معذرة، أين تقع محطة القطار؟", level: "A1", tip: "حرف h في Bahnhof صامت ويمد حركة الحرف a." },
      { de: "Ich habe einen Termin um zehn Uhr.", ar: "لديّ موعد في تمام العاشرة.", level: "A2", tip: "حرف z في zehn يُنطق مثل ts تماماً." },
      { de: "Können Sie das bitte wiederholen?", ar: "هل يمكنك إعادة ذلك من فضلك؟", level: "A2", tip: "انتبه للإمالة في حرف ö (ضم الشفتين كأنك تنطق o مع نطق e)." },
      { de: "Meiner Meinung nach ist Übung der Schlüssel.", ar: "في رأيي، التدريب هو مفتاح النجاح.", level: "B1", tip: "حرف ü يحتاج ضم الشفتين جيداً، والمقطع ei ينطق 'آي'." },
      { de: "Ich freue mich auf das Vorstellungsgespräch.", ar: "أنا متحمس وسعيد جداً بمقابلة العمل.", level: "B1", tip: "المقطع eu يُنطق 'أوي' (froy-e mich)." }
    ];
    this.currentIndex = 0;
    this.hasAwardedXP = {};
    this.initRecognition();
  }

  hasSpeechSupport() {
    return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  initRecognition() {
    if (!this.hasSpeechSupport()) {
      this.recognition = null;
      return;
    }

    try {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRec();
      this.recognition.lang = 'de-DE';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          this.handleResult(transcript);
        }
        this.setListeningState(false);
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
        this.setListeningState(false);
        const statusEl = this.container.querySelector('#mic-status-text');
        if (statusEl) {
          statusEl.textContent = this.getErrorMessage(event.error);
          statusEl.style.color = '#ef4444';
        }
      };

      this.recognition.onend = () => {
        this.setListeningState(false);
      };
    } catch (e) {
      console.warn('SpeechRecognition init error:', e);
      this.recognition = null;
    }
  }

  getErrorMessage(error) {
    switch (error) {
      case 'not-allowed':
      case 'permission-denied':
        return '⚠️ تم حظر إذن الميكروفون. يرجى تفعيل إذن الميكروفون من إعدادات المتصفح أو أيقونة القفل في شريط العنوان.';
      case 'no-speech':
        return 'لم يتم سماع أي صوت. تحدث بوضوح بالقرب من الميكروفون واضغط مجدداً 🎙️';
      case 'audio-capture':
        return 'تعذر العثور على ميكروفون صالح في جهازك. تأكد من إعدادات الميكروفون.';
      case 'network':
        return 'تعذر الاتصال بخدمة التعرف الصوتي. تأكد من اتصال الإنترنت.';
      default:
        return 'لم يتم التقاط النطق بوضوح، يرجى المحاولة ثانية أو كتابة ما سمعته ⚠️';
    }
  }

  setListeningState(isListening) {
    this.isListening = isListening;
    const btn = this.container.querySelector('#btn-mic-trigger');
    const statusEl = this.container.querySelector('#mic-status-text');
    if (btn) {
      btn.classList.toggle('is-recording', isListening);
    }
    if (statusEl) {
      statusEl.style.color = '';
      statusEl.textContent = isListening 
        ? 'جاري الاستماع إليك... تحدث الآن بالألمانية بصوت واضح 🎙️' 
        : 'انقر على الميكروفون وابدأ في نطق الجملة بصوتك';
    }
  }

  toggleListening() {
    if (!this.hasSpeechSupport()) {
      const statusEl = this.container.querySelector('#mic-status-text');
      if (statusEl) {
        statusEl.innerHTML = '⚠️ متصفحك الحالي لا يدعم التعرف الصوتي المباشر. يمكنك الاستماع بالأزرار، أو استخدام مربع الكتابة بالأسفل لاختبار دقة كتابتك.';
        statusEl.style.color = '#f59e0b';
      }
      return;
    }

    if (this.isListening) {
      try {
        if (this.recognition) this.recognition.stop();
      } catch (e) {}
      this.setListeningState(false);
    } else {
      // Re-instantiate recognition to ensure clean state on iOS/Android
      this.initRecognition();
      if (!this.recognition) return;

      try {
        this.recognition.start();
        this.setListeningState(true);
      } catch (e) {
        console.warn('Error starting speech recognition:', e);
        this.setListeningState(false);
        const statusEl = this.container.querySelector('#mic-status-text');
        if (statusEl) {
          statusEl.textContent = 'الميكروفون قيد التشغيل بالفعل أو تم رفض الإذن. يرجى المحاولة ثانية.';
        }
      }
    }
  }

  // حساب نسبة التشابه بين ما قاله المستخدم والجملة المستهدفة
  calculateSimilarity(str1, str2) {
    const s1 = (str1 || '').toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();
    const s2 = (str2 || '').toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();

    if (!s1 || !s2) return 0;
    if (s1 === s2) return 100;

    const words1 = s1.split(/\s+/).filter(Boolean);
    const words2 = s2.split(/\s+/).filter(Boolean);

    let matches = 0;
    words1.forEach(w => {
      if (words2.includes(w)) matches++;
    });

    const percent = Math.round((matches / Math.max(words1.length, words2.length)) * 100);
    return Math.max(percent, Math.min(95, percent + 15)); // تقريب لتشجيع المتعلم
  }

  handleResult(userTranscript) {
    const current = this.practiceItems[this.currentIndex];
    const score = this.calculateSimilarity(userTranscript, current.de);

    const resultBox = this.container.querySelector('#speech-eval-box');
    if (!resultBox) return;

    let cheer = '';
    let color = '#10b981';

    if (score >= 80) {
      cheer = 'نطق رائع وممتاز جداً! مخارج الحروف الألمانية دقيقة 🌟👏';
      color = '#10b981';

      // منح نقاط خبرة XP إذا لم يحصل عليها لهذه الجملة من قبل
      if (!this.hasAwardedXP[this.currentIndex]) {
        this.hasAwardedXP[this.currentIndex] = true;
        try {
          Storage.addXP(15);
          this.onXPUpdate();
        } catch (e) {}
      }
    } else if (score >= 50) {
      cheer = 'جيد جداً! استمع للنطق البطيء وحاول محاكاة مخارج الحروف مجدداً 💪';
      color = '#f59e0b';
    } else {
      cheer = 'لا بأس، التدريب سر الإتقان! استمع للمثال عدة مرات وجرب ثانية 🌱';
      color = '#ef4444';
    }

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
      <div class="accuracy-score" style="color: ${color}; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.35rem;">
        ${score}% دقة النطق ${score >= 80 ? '⭐ (+15 XP)' : ''}
      </div>
      <p style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.65rem;">${cheer}</p>
      <div style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 0.35rem; background: rgba(0,0,0,0.04); padding: 0.5rem 0.75rem; border-radius: 8px;">
        ما سجله النظام: <strong dir="ltr" style="color: var(--text-primary);">"${userTranscript}"</strong>
      </div>
      <div style="font-size: 0.92rem; color: var(--text-secondary); background: rgba(2,132,199,0.06); padding: 0.5rem 0.75rem; border-radius: 8px; margin-top: 0.35rem;">
        الجملة المطلوبة: <strong dir="ltr" style="color: #0284c7;">"${current.de}"</strong>
      </div>
    `;
  }

  next() {
    if (this.currentIndex < this.practiceItems.length - 1) {
      this.currentIndex++;
      this.render();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
    }
  }

  render() {
    if (!this.container) return;

    const current = this.practiceItems[this.currentIndex];
    const isMicAvailable = this.hasSpeechSupport();

    this.container.innerHTML = `
      <div class="speech-trainer-wrapper">
        <div class="speech-trainer-card">
          <!-- الهيدر والتقدم -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="level-badge badge-${current.level.toLowerCase().substring(0, 2)}">${current.level}</span>
            <span style="font-size: 0.88rem; color: var(--text-muted);">
              الجملة <strong>${this.currentIndex + 1}</strong> من <strong>${this.practiceItems.length}</strong>
            </span>
          </div>

          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem;">
            استمع للجملة، ثم انقر على الميكروفون واقرأها بصوتك:
          </p>

          <h2 class="trainer-target-phrase" dir="ltr">${current.de}</h2>
          <p class="trainer-target-translation">${current.ar}</p>

          ${current.tip ? `
            <div style="background: rgba(245, 158, 11, 0.08); border: 1px dashed rgba(245, 158, 11, 0.35); border-radius: 12px; padding: 0.65rem 1rem; margin-bottom: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem;">
              <span>💡</span>
              <span><strong>نصيحة نطق:</strong> ${current.tip}</span>
            </div>
          ` : ''}

          <!-- أزرار الاستماع الصوتي -->
          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            <button class="btn-audio-listen" id="btn-listen-target" title="استمع للنطق">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>استمع للنطق النموذجي</span>
            </button>
            <button class="btn-audio-slow" id="btn-listen-slow-target" title="نطق بطيء للتدريب">
              <span>🐢 نطق بطيء</span>
            </button>
          </div>

          <!-- منطقة الميكروفون التفاعلية -->
          <div class="mic-interactive-area">
            <button class="btn-mic-main" id="btn-mic-trigger" title="${isMicAvailable ? 'انقر للتحدث عبر الميكروفون' : 'التعرف الصوتي المباشر'}">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            <span class="mic-status-label" id="mic-status-text">
              ${isMicAvailable 
                ? 'انقر على الميكروفون وابدأ في نطق الجملة بصوتك' 
                : '💡 الميكروفون المباشر يحتاج متصفح Google Chrome أو Edge. يمكنك كتابة النص بالأسفل لاختبار دقتك!'}
            </span>
          </div>

          <!-- صندوق تقييم النطق -->
          <div class="speech-result-display hidden" id="speech-eval-box" style="margin-top: 1.25rem;"></div>

          <!-- بديل اختياري: كتابة النص واختباره (Keyboard / Text Fallback) -->
          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px dashed var(--border-subtle);">
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>✍️</span>
              <span>أو اكتب الجملة لاختبار دقة كتابتك وهجائك:</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="speech-text-fallback-input" placeholder="اكتب الجملة بالألمانية هنا..." dir="ltr" style="flex: 1; padding: 0.65rem 0.85rem; border-radius: 10px; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary); font-family: inherit; font-size: 0.95rem;">
              <button id="btn-eval-fallback-text" type="button" style="padding: 0.65rem 1.15rem; background: var(--color-der); color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; white-space: nowrap;">
                تقييم 🎯
              </button>
            </div>
          </div>

          <!-- أزرار التنقل بين الجمل -->
          <div style="display: flex; justify-content: space-between; margin-top: 2rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
            <button class="btn-nav" id="btn-trainer-prev" ${this.currentIndex === 0 ? 'disabled' : ''}>
              <span>السابق</span>
            </button>
            <button class="btn-nav" id="btn-trainer-next" ${this.currentIndex === this.practiceItems.length - 1 ? 'disabled' : ''}>
              <span>التالي</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(current);
  }

  bindEvents(current) {
    const listenBtn = this.container.querySelector('#btn-listen-target');
    if (listenBtn) {
      listenBtn.addEventListener('click', () => {
        audioPlayer.speak(current.de, listenBtn, 1.0);
      });
    }

    const listenSlowBtn = this.container.querySelector('#btn-listen-slow-target');
    if (listenSlowBtn) {
      listenSlowBtn.addEventListener('click', () => {
        audioPlayer.speak(current.de, listenSlowBtn, 0.75);
      });
    }

    const micBtn = this.container.querySelector('#btn-mic-trigger');
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        this.toggleListening();
      });
    }

    const fallbackBtn = this.container.querySelector('#btn-eval-fallback-text');
    const fallbackInput = this.container.querySelector('#speech-text-fallback-input');
    if (fallbackBtn && fallbackInput) {
      const runFallbackEval = () => {
        const text = fallbackInput.value.trim();
        if (text) {
          this.handleResult(text);
        }
      };
      fallbackBtn.addEventListener('click', runFallbackEval);
      fallbackInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') runFallbackEval();
      });
    }

    const nextBtn = this.container.querySelector('#btn-trainer-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }

    const prevBtn = this.container.querySelector('#btn-trainer-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }
  }
}
