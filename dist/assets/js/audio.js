// محرك النطق والصوتيات باللغة الألمانية - German Speech & Audio Engine
// يعتمد على Web Speech Synthesis API مع تحكم في السرعة واختيار نبرة النطق الألمانية

import { Storage } from './storage.js';

class AudioEngine {
  constructor() {
    this.synth = (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
    this.germanVoice = null;
    this.currentSpeed = Storage.getAudioSpeed();
    this.isSupported = !!this.synth;
    this.activeElement = null;

    if (this.isSupported) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // البحث عن أفضل صوت ألماني متوفر
    this.germanVoice = voices.find(v => v.lang === 'de-DE' || v.lang.startsWith('de')) || null;
  }

  setSpeed(speed) {
    this.currentSpeed = speed;
    Storage.setAudioSpeed(speed);
  }

  getSpeed() {
    return this.currentSpeed;
  }

  /**
   * نطق النص الألماني
   * @param {string} text - النص المراد نطقه
   * @param {HTMLElement|null} triggerBtn - الزر الذي تم النقر عليه لإظهار التأثير البصري
   * @param {number|null} customRate - سرعة مخصصة إن وجدت
   */
  speak(text, triggerBtn = null, customRate = null) {
    if (!this.isSupported) {
      alert('عذراً، محرك النطق الصوتي غير مدعوم في هذا المتصفح. يرجى تجربة متصفح حديث مثل Chrome أو Edge.');
      return;
    }

    // إيقاف أي صوت قيد التشغيل حالياً
    this.synth.cancel();

    if (this.activeElement) {
      this.activeElement.classList.remove('is-speaking');
    }

    if (!text || text.trim() === '') return;

    // تنظيف النص من أدوات التعريف إن أردنا نطق الكلمة فقط أو الجملة
    const cleanText = text.replace(/\[.*?\]/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.rate = customRate || this.currentSpeed;
    utterance.pitch = 1.0;

    if (this.germanVoice) {
      utterance.voice = this.germanVoice;
    }

    if (triggerBtn) {
      this.activeElement = triggerBtn;
      triggerBtn.classList.add('is-speaking');
    }

    utterance.onend = () => {
      if (triggerBtn) {
        triggerBtn.classList.remove('is-speaking');
      }
      this.activeElement = null;
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      if (triggerBtn) {
        triggerBtn.classList.remove('is-speaking');
      }
      this.activeElement = null;
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.activeElement) {
      this.activeElement.classList.remove('is-speaking');
      this.activeElement = null;
    }
  }
}

export const audioPlayer = new AudioEngine();
export const AudioPlayer = audioPlayer;
export { AudioEngine };
