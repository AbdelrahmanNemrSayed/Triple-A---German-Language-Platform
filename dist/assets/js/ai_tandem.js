// assets/js/ai_tandem.js
// شريك المحادثة والتصحيح اللغوي الذكي (German AI Tandem Partner)
// منصة Triple A PRO - German Language Platform

import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export const TANDEM_PERSONAS = [
  {
    id: 'persona_lukas',
    name: 'Lukas (برلين)',
    role: 'صديق ألماني للدردشة اليومية',
    level: 'A1 - A2',
    avatar: '🧔',
    greeting: 'Hallo! Schön dich kennenzulernen. Wie geht es dir heute und worüber möchtest du sprechen?',
    greetingAr: 'أهلاً! سعيد بالتعرف عليك. كيف حالك اليوم وماذا تحب أن نتحدث عنه؟',
    context: 'casual'
  },
  {
    id: 'persona_weber',
    name: 'Frau Weber (Bürgeramt)',
    role: 'موظفة استقبال في دائرة شؤون المواطنين',
    level: 'A2 - B1',
    avatar: '👩‍💼',
    greeting: 'Guten Tag! Willkommen beim Bürgeramt. Wie kann ich Ihnen heute bei Ihrem Anliegen behilflich sein?',
    greetingAr: 'طاب يومكم! مرحباً بكم في دائرة شؤون المواطنين. كيف يمكنني مساعدتكم في معاملتكم اليوم؟',
    context: 'official'
  },
  {
    id: 'persona_mueller',
    name: 'Herr Müller (Recruiter)',
    role: 'مدير توظيف للمقابلات الشخصية',
    level: 'B1',
    avatar: '👨‍💼',
    greeting: 'Guten Tag und herzlich willkommen zum Vorstellungsgespräch! Bitte erzählen Sie mir kurz von Ihrem Werdegang.',
    greetingAr: 'طاب يومكم وأهلاً بكم في المقابلة الشخصية! حدثني باختصار عن مسيرتك المهنية.',
    context: 'interview'
  }
];

export class AITandemPartner {
  constructor(containerElement, onXPUpdate) {
    this.container = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.currentPersona = TANDEM_PERSONAS[0];
    this.messages = [];
    this.isRecording = false;
    this.recognition = null;

    this.initPersonaChat();
    this.setupSpeechRecognition();
  }

  initPersonaChat() {
    this.messages = [
      {
        sender: 'ai',
        text: this.currentPersona.greeting,
        translationAr: this.currentPersona.greetingAr,
        timestamp: this.getCurrentTime()
      }
    ];
  }

  getCurrentTime() {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  setupSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.lang = 'de-DE';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = this.container.querySelector('#tandem-user-input');
        if (input) {
          input.value = transcript;
          this.sendMessage(transcript);
        }
        this.stopVoice();
      };

      this.recognition.onerror = () => this.stopVoice();
      this.recognition.onend = () => this.stopVoice();
    }
  }

  toggleVoice() {
    if (!this.recognition) {
      alert('المتصفح لا يدعم الإدخال الصوتي المباشر. يرجى استخدام متصفح Chrome أو الكتابة اليدوية.');
      return;
    }

    if (this.isRecording) {
      this.stopVoice();
    } else {
      this.isRecording = true;
      this.recognition.start();
      const micBtn = this.container.querySelector('#btn-tandem-mic');
      if (micBtn) micBtn.classList.add('recording');
    }
  }

  stopVoice() {
    this.isRecording = false;
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    const micBtn = this.container?.querySelector('#btn-tandem-mic');
    if (micBtn) micBtn.classList.remove('recording');
  }

  selectPersona(personaId) {
    const target = TANDEM_PERSONAS.find(p => p.id === personaId);
    if (target) {
      this.currentPersona = target;
      this.initPersonaChat();
      this.render();
      audioPlayer.speak(this.currentPersona.greeting);
    }
  }

  analyzeGrammar(userText) {
    const text = userText.trim();
    const corrections = [];

    // Rule 1: Lowercase "ich"
    if (/\bich\b/.test(text) && text.startsWith('ich')) {
      corrections.push('تذكر أن الضمير "ich" في بداية الجملة يكتب دائماً بحرف كبير (Ich).');
    }

    // Rule 2: Age phrasing "ich bin ... Jahre" without "alt"
    if (/ich bin \d+ jahre\b/i.test(text) && !/alt/i.test(text)) {
      corrections.push('عند ذكر العمر بالألمانية، الأصح أن تقول: "Ich bin ... Jahre alt" بإضافة كلمة "alt".');
    }

    // Rule 3: Missing question mark
    if (/^(wie|was|wo|warum|wann|woher|wohin|kann|haben|sind|haben Sie|können Sie)\b/i.test(text) && !text.endsWith('?')) {
      corrections.push('صيغة السؤال بالألمانية تنتهي دائماً بعلامة استفهام (?) لتوضيح النبرة الاستفهامية.');
    }

    // Rule 4: Verb position check in main clause
    if (/^(heute|morgen|jetzt|leider|vielleicht)\s+(ich|du|er|sie|wir)\s+\w+/i.test(text)) {
      corrections.push('قاعدة موقع الفعل (Verb auf Position 2): عندما تبدأ الجملة بظرف زمان مثل (Heute, Morgen)، يجب أن يسبق الفعل الضمير! مثال: "Heute gehe ich..." وليس "Heute ich gehe".');
    }

    return corrections.length > 0 ? corrections : null;
  }

  generateAIResponse(userText) {
    const lower = userText.toLowerCase();
    const p = this.currentPersona;

    if (p.context === 'casual') {
      if (lower.includes('hallo') || lower.includes('hi') || lower.includes('guten tag')) {
        return {
          de: 'Hallo! Freut mich sehr. Wie läuft deine Woche bisher? Hast du heute schon Deutsch gelernt?',
          ar: 'أهلاً! يسعدني جداً. كيف يسير أسبوعك حتى الآن؟ هل تعلمت بعض الألمانية اليوم؟'
        };
      }
      if (lower.includes('wochenende') || lower.includes('samstag') || lower.includes('sonntag')) {
        return {
          de: 'Am Wochenende gehe ich oft im Park spazieren oder treffe mich mit Freunden im Café. Was sind deine Pläne?',
          ar: 'في نهاية الأسبوع أذهب غالباً للتنزه في الحديقة أو أقابل أصدقائي في المقهى. ما هي خططك؟'
        };
      }
      if (lower.includes('gut') || lower.includes('super') || lower.includes('prima')) {
        return {
          de: 'Das freut mich zu hören! Gibt es ein bestimmtes Thema, das du auf Deutsch üben möchtest? Vielleicht Essen, Reisen oder Hobbys?',
          ar: 'يسعدني سماع ذلك! هل هناك موضوع معين ترغب بالتدرب عليه بالألمانية؟ ربما الطعام، السفر، أو الهوايات؟'
        };
      }
      return {
        de: 'Das ist interessant! Erzähl mir gerne mehr darüber. Wie sagt man das in deiner Muttersprache?',
        ar: 'هذا أمر مشوق! حدثني أكثر عن ذلك رجاءً. كيف يُقال هذا بلغتك الأم؟'
      };
    } else if (p.context === 'official') {
      if (lower.includes('anmeldung') || lower.includes('wohnsitz') || lower.includes('termin')) {
        return {
          de: 'Für die Wohnsitzanmeldung benötigen Sie Ihren Reisepass und die Wohnungsgeberbestätigung vom Vermieter. Haben Sie das Formular bereits ausgefüllt?',
          ar: 'لتسجيل السكن، تحتاج إلى جواز سفرك وتأكيد المؤجر (Wohnungsgeberbestätigung). هل ملأت الاستمارة بالفعل؟'
        };
      }
      return {
        de: 'Verstehe. Bitte legen Sie mir die erforderlichen Unterlagen vor, damit ich Ihren Antrag im System erfassen kann.',
        ar: 'مفهوم. يرجى إبراز المستندات المطلوبة حتى أتمكن من تسجيل طلبك في النظام.'
      };
    } else {
      // interview
      if (lower.includes('erfahrung') || lower.includes('beruf') || lower.includes('arbeit') || lower.includes('it')) {
        return {
          de: 'Sehr beeindruckend! Was war bisher Ihr größter beruflicher Erfolg und wie gehen Sie mit schwierigen Herausforderungen im Team um?',
          ar: 'مثير للإعجاب جداً! ما هو أكبر نجاح مهني حققته حتى الآن، وكيف تتعامل مع التحديات الصعبة داخل الفريق؟'
        };
      }
      return {
        de: 'Vielen Dank für Ihre Ausführungen. Warum möchten Sie genau bei unserem Unternehmen in Deutschland arbeiten?',
        ar: 'شكراً جزيلاً لشرحك. لماذا ترغب بالعمل تحديداً في شركتنا هنا في ألمانيا؟'
      };
    }
  }

  sendMessage(text) {
    if (!text || !text.trim()) return;

    const userMsg = text.trim();
    const grammarTips = this.analyzeGrammar(userMsg);

    // Push user message
    this.messages.push({
      sender: 'user',
      text: userMsg,
      grammarTips,
      timestamp: this.getCurrentTime()
    });

    // Reward XP (+5 per message exchange)
    try {
      Storage.addXP(5);
      if (this.onXPUpdate) this.onXPUpdate();
    } catch (e) {}

    this.render();

    // Scroll to bottom
    this.scrollToBottom();

    // AI thinking delay
    setTimeout(() => {
      const reply = this.generateAIResponse(userMsg);
      this.messages.push({
        sender: 'ai',
        text: reply.de,
        translationAr: reply.ar,
        timestamp: this.getCurrentTime()
      });
      this.render();
      this.scrollToBottom();
      audioPlayer.speak(reply.de);
    }, 600);
  }

  scrollToBottom() {
    const container = this.container.querySelector('#tandem-chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="tandem-wrapper">
        <!-- Header -->
        <div class="tandem-header">
          <div>
            <span class="vault-badge"><i class="fa-solid fa-robot"></i> الذكاء الاصطناعي التفاعلي</span>
            <h2 class="tandem-title">شريك المحادثة الألماني الذكي (AI Tandem)</h2>
            <p class="tandem-sub">تحدث واكتب بحرية مع شخصيات ألمانية واقعية واحصل على تصحيح فوري لقواعدك ونطقك</p>
          </div>

          <!-- Personas Switcher -->
          <div class="personas-nav-bar">
            ${TANDEM_PERSONAS.map(p => `
              <button class="btn-persona-pill ${this.currentPersona.id === p.id ? 'active' : ''}" data-persona-id="${p.id}">
                <span class="persona-emoji">${p.avatar}</span>
                <div class="persona-meta">
                  <span class="persona-p-name">${p.name}</span>
                  <small class="persona-p-lvl">${p.level}</small>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Chat Container Card -->
        <div class="tandem-chat-card">
          <!-- Chat Top Bar -->
          <div class="chat-top-status">
            <div class="persona-active-badge">
              <span class="avatar-circle">${this.currentPersona.avatar}</span>
              <div>
                <h4>${this.currentPersona.name}</h4>
                <small class="persona-role-tag">${this.currentPersona.role}</small>
              </div>
            </div>
            <div class="live-indicator on-air">
              <span class="pulse-dot"></span>
              <span>جاهز للدردشة</span>
            </div>
          </div>

          <!-- Messages Stream -->
          <div class="chat-messages-scroll" id="tandem-chat-messages">
            ${this.messages.map(msg => `
              <div class="chat-bubble-wrap ${msg.sender === 'user' ? 'bubble-user' : 'bubble-ai'}">
                <div class="chat-bubble">
                  <div class="bubble-content" dir="ltr">${msg.text}</div>
                  
                  ${msg.translationAr ? `
                    <div class="bubble-ar-translation">${msg.translationAr}</div>
                  ` : ''}

                  <div class="bubble-footer">
                    <span class="bubble-time">${msg.timestamp}</span>
                    ${msg.sender === 'ai' ? `
                      <button class="btn-bubble-audio" data-speak-msg="${encodeURIComponent(msg.text)}" title="استمع للرسالة">
                        <i class="fa-solid fa-volume-high"></i>
                      </button>
                    ` : ''}
                  </div>
                </div>

                <!-- Grammar Coach Accordion Tip -->
                ${msg.grammarTips ? `
                  <div class="grammar-coach-card">
                    <div class="coach-header">
                      <span>💡 <strong>نصيحة مدرب القواعد (Grammatik-Coach):</strong></span>
                    </div>
                    <ul class="coach-tips-list">
                      ${msg.grammarTips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>

          <!-- Chat Input Bar -->
          <div class="chat-input-bar">
            <button class="btn-tandem-voice" id="btn-tandem-mic" title="تحدث بالميكروفون">
              <i class="fa-solid fa-microphone"></i>
            </button>
            <input type="text" 
                   class="chat-text-input" 
                   id="tandem-user-input" 
                   dir="ltr" 
                   placeholder="اكتب رسالتك بالألمانية هنا (مثال: Hallo Lukas!)..." />
            <button class="btn-primary btn-tandem-send" id="btn-tandem-send">
              <span>إرسال 🚀</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // 1. Personas Switching
    this.container.querySelectorAll('[data-persona-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectPersona(btn.dataset.personaId);
      });
    });

    // 2. Send message
    const sendBtn = this.container.querySelector('#btn-tandem-send');
    const input = this.container.querySelector('#tandem-user-input');

    const handleSend = () => {
      if (input && input.value.trim()) {
        const text = input.value.trim();
        input.value = '';
        this.sendMessage(text);
      }
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    // 3. Microphone voice input
    const micBtn = this.container.querySelector('#btn-tandem-mic');
    if (micBtn) {
      micBtn.addEventListener('click', () => this.toggleVoice());
    }

    // 4. Audio speakers
    this.container.querySelectorAll('[data-speak-msg]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = decodeURIComponent(btn.dataset.speakMsg);
        audioPlayer.speak(text);
      });
    });
  }
}
