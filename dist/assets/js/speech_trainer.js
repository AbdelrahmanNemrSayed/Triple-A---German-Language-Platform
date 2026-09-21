// مدرب النطق الصوتي بالميكروفون (Web Speech Recognition Trainer)
import { audioPlayer } from './audio.js';

export class SpeechTrainer {
  constructor(containerElement) {
    this.container = containerElement;
    this.recognition = null;
    this.isListening = false;
    this.practiceItems = [
      { de: "Guten Tag, wie geht es Ihnen?", ar: "نهارك سعيد، كيف حال حضرتك؟", level: "A1" },
      { de: "Ich lerne jeden Tag Deutsch.", ar: "أنا أتعلم الألمانية كل يوم.", level: "A1" },
      { de: "Entschuldigung, wo ist der Bahnhof?", ar: "معذرة، أين تقع محطة القطار؟", level: "A1" },
      { de: "Ich habe einen Termin um zehn Uhr.", ar: "لديّ موعد في تمام العاشرة.", level: "A2" },
      { de: "Können Sie das bitte wiederholen?", ar: "هل يمكنك إعادة ذلك من فضلك؟", level: "A2" },
      { de: "Meiner Meinung nach ist Übung der Schlüssel.", ar: "في رأيي، التدريب هو مفتاح النجاح.", level: "B1" },
      { de: "Ich freue mich auf das Vorstellungsgespräch.", ar: "أنا متحمس وسعيد جداً بمقابلة العمل.", level: "B1" }
    ];
    this.currentIndex = 0;
    this.initRecognition();
  }

  initRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.lang = 'de-DE';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.handleResult(transcript);
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        this.setListeningState(false);
        const statusEl = this.container.querySelector('#mic-status-text');
        if (statusEl) {
          statusEl.textContent = 'لم يتم التقاط الصوت بوضوح، يرجى المحاولة ثانية ⚠️';
        }
      };

      this.recognition.onend = () => {
        this.setListeningState(false);
      };
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
      statusEl.textContent = isListening 
        ? 'جاري الاستماع إليك... تحدث الآن بالألمانية 🎙️' 
        : 'انقر على الميكروفون وابدأ في نطق الجملة بصوتك';
    }
  }

  toggleListening() {
    if (!this.recognition) {
      alert('عذراً، ميزة التعرف على الصوت عبر الميكروفون تتطلب متصفحاً حديثاً يدعمها (مثل Google Chrome أو Microsoft Edge).');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.setListeningState(false);
    } else {
      try {
        this.recognition.start();
        this.setListeningState(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

  // حساب نسبة التشابه بين ما قاله المستخدم والجملة المستهدفة
  calculateSimilarity(str1, str2) {
    const s1 = str1.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    const s2 = str2.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();

    if (s1 === s2) return 100;

    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);

    let matches = 0;
    words1.forEach(w => {
      if (words2.includes(w)) matches++;
    });

    const percent = Math.round((matches / Math.max(words1.length, words2.length)) * 100);
    return Math.max(percent, Math.min(95, percent + 20)); // تقريب لتشجيع المتعلم
  }

  handleResult(userTranscript) {
    const current = this.practiceItems[this.currentIndex];
    const score = this.calculateSimilarity(userTranscript, current.de);

    const resultBox = this.container.querySelector('#speech-eval-box');
    if (!resultBox) return;

    let cheer = '';
    let color = '#10b981';

    if (score >= 80) {
      cheer = 'نطق رائع ومثالي! مخارج الحروف الألمانية ممتازة 🌟👏';
      color = '#10b981';
    } else if (score >= 50) {
      cheer = 'جيد جداً! استمع للمثال مرة أخرى وحاول تحسين النطق 💪';
      color = '#f59e0b';
    } else {
      cheer = 'لا بأس، التدريب سر الإتقان! استمع للنطق البطيء وجرب ثانية 🌱';
      color = '#ef4444';
    }

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
      <div class="accuracy-score" style="color: ${color};">${score}% دقة النطق</div>
      <p style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">${cheer}</p>
      <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
        ما سمعه النظام: <strong dir="ltr" style="color: var(--text-primary);">"${userTranscript}"</strong>
      </div>
      <div style="font-size: 0.9rem; color: var(--text-secondary);">
        النص المطلوب: <strong dir="ltr" style="color: var(--color-der);">"${current.de}"</strong>
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

    this.container.innerHTML = `
      <div class="speech-trainer-wrapper">
        <div class="speech-trainer-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="level-badge badge-${current.level.toLowerCase().substring(0, 2)}">${current.level}</span>
            <span style="font-size: 0.88rem; color: var(--text-muted);">
              الجملة <strong>${this.currentIndex + 1}</strong> من <strong>${this.practiceItems.length}</strong>
            </span>
          </div>

          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem;">استمع للجملة، ثم انقر على الميكروفون واقرأها بصوتك:</p>

          <h2 class="trainer-target-phrase" dir="ltr">${current.de}</h2>
          <p class="trainer-target-translation">${current.ar}</p>

          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <button class="btn-audio-listen" id="btn-listen-target">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>استمع للنطق النموذجي</span>
            </button>
            <button class="btn-audio-slow" id="btn-listen-slow-target">
              <span>🐢 نطق بطيء</span>
            </button>
          </div>

          <!-- منطقة الميكروفون التفاعلية -->
          <div class="mic-interactive-area">
            <button class="btn-mic-main" id="btn-mic-trigger" title="انقر للتحدث">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            <span class="mic-status-label" id="mic-status-text">انقر على الميكروفون وابدأ في نطق الجملة بصوتك</span>
          </div>

          <!-- صندوق تقييم النطق -->
          <div class="speech-result-display hidden" id="speech-eval-box"></div>

          <!-- أزرار التنقل -->
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
