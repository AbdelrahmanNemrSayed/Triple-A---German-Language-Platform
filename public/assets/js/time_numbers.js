// assets/js/time_numbers.js
// مدرب قراءة الأرقام والساعة الألمانية التفاعلية (Uhrzeit & Zahlen)
// منصة Triple A PRO - German Language Platform

import { TIME_PRESETS, NUMBERS_LISTENING_CHALLENGES } from '../../data/time_numbers.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class TimeNumbersTrainer {
  constructor(containerElement, onXPUpdate) {
    this.container = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.activeTab = 'clock'; // 'clock' | 'numbers'

    // Clock state
    this.selectedPresetIndex = 0;
    this.currentHour = 8;
    this.currentMinute = 30;

    // Numbers quiz state
    this.quizIndex = 0;
    this.userNumberGuess = '';
    this.quizAnswered = false;
    this.quizCorrect = false;
    this.quizScore = 0;
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  switchTab(tab) {
    this.activeTab = tab;
    this.render();
  }

  selectPreset(index) {
    this.selectedPresetIndex = index;
    const preset = TIME_PRESETS[index];
    this.currentHour = preset.hour;
    this.currentMinute = preset.minute;
    this.render();
    audioPlayer.speak(`${preset.colloquialDe}. ${preset.officialDe}`);
  }

  setCustomTime(h, m) {
    this.currentHour = parseInt(h, 10);
    this.currentMinute = parseInt(m, 10);
    this.selectedPresetIndex = -1;
    this.render();
  }

  generateGermanTime(hour24, minute) {
    const germanNumbers = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn', 'zwanzig'];
    
    // 1. Official 24h
    let official = `${hour24} Uhr`;
    if (minute > 0) {
      official = `${hour24} Uhr ${minute < 10 ? 'null ' + minute : minute}`;
    }

    // 2. Colloquial 12h
    let hour12 = hour24 % 12;
    if (hour12 === 0) hour12 = 12;
    let nextHour12 = (hour12 % 12) + 1;

    let colloquial = '';
    if (minute === 0) {
      colloquial = `${hour12} Uhr`;
    } else if (minute === 15) {
      colloquial = `Viertel nach ${hour12}`;
    } else if (minute === 30) {
      colloquial = `halb ${nextHour12}`;
    } else if (minute === 45) {
      colloquial = `Viertel vor ${nextHour12}`;
    } else if (minute < 30) {
      colloquial = `${minute} nach ${hour12}`;
    } else {
      colloquial = `${60 - minute} vor ${nextHour12}`;
    }

    return { official, colloquial };
  }

  checkNumberGuess() {
    if (this.quizAnswered) return;

    const challenge = NUMBERS_LISTENING_CHALLENGES[this.quizIndex];
    const cleanedUser = this.userNumberGuess.trim().replace(/,/g, '.').replace(/\s+/g, '');
    const cleanedCorrect = challenge.correctValue.replace(/,/g, '.').replace(/\s+/g, '');

    const isCorrect = cleanedUser === cleanedCorrect;
    this.quizAnswered = true;
    this.quizCorrect = isCorrect;

    if (isCorrect) {
      this.quizScore += 10;
      try {
        Storage.addXP(10);
        if (this.onXPUpdate) this.onXPUpdate();
      } catch (e) {
        console.warn('XP error:', e);
      }
    }

    this.render();
  }

  nextQuizQuestion() {
    this.quizAnswered = false;
    this.quizCorrect = false;
    this.userNumberGuess = '';
    this.quizIndex = (this.quizIndex + 1) % NUMBERS_LISTENING_CHALLENGES.length;
    this.render();
    this.playCurrentChallengeAudio();
  }

  playCurrentChallengeAudio() {
    const ch = NUMBERS_LISTENING_CHALLENGES[this.quizIndex];
    if (ch) {
      audioPlayer.speak(ch.spokenDe);
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="time-trainer-wrapper">
        <!-- Header -->
        <div class="time-header">
          <div>
            <span class="vault-badge"><i class="fa-solid fa-clock"></i> التوقيت والأرقام</span>
            <h2 class="time-title">مدرب قراءة الأرقام والساعة الألمانية</h2>
            <p class="time-sub">أتقن قراءة الوقت بنظاميه الرسمي والعامي وتدرب على التقاط الأرقام والأسعار</p>
          </div>

          <!-- Tabs Switcher -->
          <div class="time-tabs-nav">
            <button class="time-tab-btn ${this.activeTab === 'clock' ? 'active' : ''}" data-tab="clock">
              <i class="fa-solid fa-clock"></i> الساعة التفاعلية (Uhrzeit)
            </button>
            <button class="time-tab-btn ${this.activeTab === 'numbers' ? 'active' : ''}" data-tab="numbers">
              <i class="fa-solid fa-hashtag"></i> مختبر سماع الأرقام (Zahlen-Labor)
            </button>
          </div>
        </div>

        ${this.activeTab === 'clock' ? this.renderClockView() : this.renderNumbersView()}
      </div>
    `;

    this.bindEvents();
  }

  renderClockView() {
    const timeData = this.generateGermanTime(this.currentHour, this.currentMinute);
    const minuteDeg = this.currentMinute * 6;
    const hourDeg = (this.currentHour % 12) * 30 + this.currentMinute * 0.5;

    const formattedHour = this.currentHour < 10 ? `0${this.currentHour}` : this.currentHour;
    const formattedMinute = this.currentMinute < 10 ? `0${this.currentMinute}` : this.currentMinute;

    return `
      <!-- Presets Pills -->
      <div class="time-presets-bar">
        <span class="presets-title"><i class="fa-solid fa-list-check"></i> مواعيد شهيرة:</span>
        <div class="presets-list">
          ${TIME_PRESETS.map((p, i) => `
            <button class="time-preset-chip ${this.selectedPresetIndex === i ? 'active' : ''}" data-preset-idx="${i}">
              <span class="preset-time">${p.time24}</span>
              <span class="preset-name">${p.colloquialDe}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="clock-stage-grid">
        <!-- Visual Analog & Digital Clock -->
        <div class="analog-clock-card">
          <div class="analog-clock-wrap">
            <svg class="analog-clock-svg" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="95" class="clock-face" />
              <!-- Hours markers -->
              ${[...Array(12)].map((_, i) => {
                const angle = (i + 1) * 30 * Math.PI / 180;
                const x = 100 + 74 * Math.sin(angle);
                const y = 100 - 74 * Math.cos(angle);
                return `<text x="${x}" y="${y + 5}" class="clock-hour-text" text-anchor="middle">${i + 1}</text>`;
              }).join('')}
              <!-- Hour hand -->
              <line x1="100" y1="100" x2="100" y2="48" class="hand hour-hand" style="transform: rotate(${hourDeg}deg); transform-origin: 100px 100px;" />
              <!-- Minute hand -->
              <line x1="100" y1="100" x2="100" y2="28" class="hand minute-hand" style="transform: rotate(${minuteDeg}deg); transform-origin: 100px 100px;" />
              <!-- Center cap -->
              <circle cx="100" cy="100" r="6" class="clock-center-cap" />
            </svg>
          </div>

          <div class="digital-time-display">
            <span class="digital-time-digits">${formattedHour}:${formattedMinute}</span>
            <span class="digital-time-format">${this.currentHour >= 12 ? 'PM' : 'AM'}</span>
          </div>

          <!-- Time Sliders for Custom Exploration -->
          <div class="clock-sliders-box" dir="ltr">
            <div class="slider-row">
              <label>الساعة (Stunde): <strong>${formattedHour}</strong></label>
              <input type="range" min="0" max="23" value="${this.currentHour}" id="slider-clock-hour" class="vol-slider" />
            </div>
            <div class="slider-row">
              <label>الدقيقة (Minute): <strong>${formattedMinute}</strong></label>
              <input type="range" min="0" max="59" value="${this.currentMinute}" id="slider-clock-minute" class="vol-slider" />
            </div>
          </div>
        </div>

        <!-- German Time Pronunciation & Rules Card -->
        <div class="time-readout-card">
          <!-- Conversational Style -->
          <div class="time-badge-box colloquial-box">
            <div class="time-badge-header">
              <span class="time-type-badge">العامية الدارجة (Umgangssprachlich)</span>
              <button class="btn-listen-time" id="btn-speak-colloquial" title="استمع للنطق العامي">
                <i class="fa-solid fa-volume-high"></i> استمع
              </button>
            </div>
            <h3 class="time-de-text" dir="ltr">${timeData.colloquial}</h3>
            <p class="time-desc">الأسلوب الأكثر شيوعاً في الحياة اليومية والحديث مع الأصدقاء.</p>
          </div>

          <!-- Official Style -->
          <div class="time-badge-box official-box">
            <div class="time-badge-header">
              <span class="time-type-badge badge-official">الرسمي (Offiziell - 24h)</span>
              <button class="btn-listen-time" id="btn-speak-official" title="استمع للنطق الرسمي">
                <i class="fa-solid fa-volume-high"></i> استمع
              </button>
            </div>
            <h3 class="time-de-text" dir="ltr">${timeData.official}</h3>
            <p class="time-desc">يُستخدم في محطات القطار والمطارات والمواعيد الرسمية والتلفاز.</p>
          </div>

          <!-- Golden Rule Tip Box -->
          <div class="time-tip-box">
            <h4><i class="fa-solid fa-lightbulb"></i> سر قراءة الساعة الألمانية:</h4>
            <ul>
              <li><strong>halb:</strong> تعني "نصف ساعة قبل"، فمثلاً <code>halb 9</code> تعني الثامنة والنصف (وليس التاسعة والنصف)!</li>
              <li><strong>Viertel nach:</strong> تعني ربع بعد (مثال: <code>Viertel nach 8</code> = 08:15).</li>
              <li><strong>Viertel vor:</strong> تعني ربع قبل (مثال: <code>Viertel vor 9</code> = 08:45).</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  renderNumbersView() {
    const ch = NUMBERS_LISTENING_CHALLENGES[this.quizIndex];

    return `
      <div class="numbers-lab-card">
        <div class="numbers-lab-header">
          <div>
            <span class="level-badge badge-b1">${ch.category}</span>
            <h3 class="numbers-lab-title">استمع واكتب الرقم / السعر الصحيح</h3>
            <p class="numbers-lab-sub">درب أذنك على فهم الآحاد قبل العشرات والعملات الأوروبية</p>
          </div>
          <div class="numbers-score-pill">
            <span>النقاط:</span>
            <strong>${this.quizScore} XP</strong>
          </div>
        </div>

        <div class="listening-action-zone">
          <button class="btn-big-listen pulse-btn" id="btn-play-challenge-audio">
            <i class="fa-solid fa-volume-high"></i>
            <span>اضغط للاستماع للجملة الألمانية 🎧</span>
          </button>
          <p class="audio-hint-text">يمكنك تكرار الضغط للاستماع أكثر من مرة بوضوح</p>
        </div>

        <div class="number-input-zone">
          <label class="input-label">اكتب الرقم أو السعر الذي سمعته (مثال: 19.95 أو 47 أو 1995):</label>
          <div class="input-row" dir="ltr">
            <input type="text" 
                   id="input-user-number" 
                   class="number-text-input" 
                   placeholder="اكتب هنا..." 
                   value="${this.userNumberGuess}" 
                   ${this.quizAnswered ? 'disabled' : ''} />
            <button class="btn-primary" id="btn-check-number" ${this.quizAnswered ? 'disabled' : ''}>
              <span>تحقق ✨</span>
            </button>
          </div>
        </div>

        ${this.quizAnswered ? `
          <div class="number-feedback-box ${this.quizCorrect ? 'success' : 'error'}">
            <div class="feedback-icon">${this.quizCorrect ? '🎉' : '💡'}</div>
            <div class="feedback-content">
              <strong>${this.quizCorrect ? 'إجابة صحيحة 100%! أحسنت التقاط الرقم' : 'إجابة غير دقيقة!'}</strong>
              <div class="correct-display-line">
                <span>الإجابة الصحيحة: <strong>${ch.displayLabel}</strong></span>
              </div>
              <div class="spoken-sentence-line" dir="ltr">
                <span>"${ch.spokenDe}"</span>
              </div>
              <p class="arabic-trans-line">${ch.meaningAr}</p>
              <small class="tip-line"><strong>نصيحة الأذن:</strong> ${ch.tip}</small>
            </div>
          </div>

          <div class="number-next-row">
            <button class="btn-primary pulse-next-btn" id="btn-next-number-question">
              <span>السؤال التالي ➔</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  bindEvents() {
    // 1. Tab switching
    this.container.querySelectorAll('.time-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    if (this.activeTab === 'clock') {
      // 2. Presets click
      this.container.querySelectorAll('[data-preset-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.presetIdx, 10);
          this.selectPreset(idx);
        });
      });

      // 3. Custom Sliders
      const hourSlider = this.container.querySelector('#slider-clock-hour');
      const minSlider = this.container.querySelector('#slider-clock-minute');

      if (hourSlider && minSlider) {
        hourSlider.addEventListener('input', (e) => {
          this.setCustomTime(e.target.value, minSlider.value);
        });
        minSlider.addEventListener('input', (e) => {
          this.setCustomTime(hourSlider.value, e.target.value);
        });
      }

      // 4. Audio speakers
      const timeData = this.generateGermanTime(this.currentHour, this.currentMinute);
      const speakColloquial = this.container.querySelector('#btn-speak-colloquial');
      if (speakColloquial) {
        speakColloquial.addEventListener('click', () => audioPlayer.speak(timeData.colloquial));
      }

      const speakOfficial = this.container.querySelector('#btn-speak-official');
      if (speakOfficial) {
        speakOfficial.addEventListener('click', () => audioPlayer.speak(timeData.official));
      }
    } else {
      // Numbers view events
      const playBtn = this.container.querySelector('#btn-play-challenge-audio');
      if (playBtn) {
        playBtn.addEventListener('click', () => this.playCurrentChallengeAudio());
      }

      const checkBtn = this.container.querySelector('#btn-check-number');
      const textInput = this.container.querySelector('#input-user-number');

      if (textInput) {
        textInput.addEventListener('input', (e) => {
          this.userNumberGuess = e.target.value;
        });
        textInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') this.checkNumberGuess();
        });
      }

      if (checkBtn) {
        checkBtn.addEventListener('click', () => this.checkNumberGuess());
      }

      const nextBtn = this.container.querySelector('#btn-next-number-question');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.nextQuizQuestion());
      }
    }
  }
}
