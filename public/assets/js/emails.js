// مدرب الإيميلات والمراسلات المهنية والرسمية
import { emailTemplates } from '../../data/email_templates.js';

export class EmailTrainer {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentEmailId = emailTemplates[0].id;
  }

  setEmail(id) {
    this.currentEmailId = id;
    this.render();
  }

  copyToClipboard(text, triggerBtn) {
    navigator.clipboard.writeText(text).then(() => {
      const originalHtml = triggerBtn.innerHTML;
      triggerBtn.innerHTML = '<span>تم النسخ بنجاح! ✅</span>';
      triggerBtn.style.background = '#10b981';
      triggerBtn.style.color = '#ffffff';
      setTimeout(() => {
        triggerBtn.innerHTML = originalHtml;
        triggerBtn.style.background = '';
        triggerBtn.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  }

  render() {
    if (!this.container) return;

    const current = emailTemplates.find(e => e.id === this.currentEmailId) || emailTemplates[0];

    this.container.innerHTML = `
      <div class="emails-wrapper">
        <!-- شريط اختيار نموذج الإيميل -->
        <div class="email-tabs-bar">
          ${emailTemplates.map(item => `
            <button class="email-tab-btn ${item.id === this.currentEmailId ? 'active' : ''}" data-id="${item.id}">
              <span class="tab-icon">${item.icon}</span>
              <span class="tab-title">${item.title}</span>
            </button>
          `).join('')}
        </div>

        <div class="email-card">
          <div class="email-header-meta">
            <div>
              <span class="level-badge badge-b1">${current.category}</span>
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 0.35rem;">
                ${current.germanTitle}
              </h3>
              <p style="color: var(--text-secondary); font-size: 0.95rem;">${current.title}</p>
            </div>

            <button class="btn-primary" id="btn-copy-full-email">
              <span>نسخ الإيميل للألمانية 📋</span>
            </button>
          </div>

          <!-- سطر الموضوع (Subject) -->
          <div class="email-subject-line">
            <strong>الموضوع (Betreff):</strong> ${current.subject}
          </div>

          <!-- النص المقسم: ألماني وعربي -->
          <div class="email-split-view">
            <div>
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-der); margin-bottom: 0.35rem; display: block;">
                🇩🇪 النص الرسمي بالألمانية (قابل للتعديل والنسخ):
              </span>
              <div class="email-de-box" id="email-de-content">${current.bodyDe}</div>
            </div>

            <div>
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.35rem; display: block;">
                🇸🇦 الترجمة العربية والشرح الدقيق:
              </span>
              <div class="email-ar-box">${current.bodyAr}</div>
            </div>
          </div>

          <!-- نصيحة الإتيكيت والمراسلة الرسمية -->
          <div class="email-etiquette-box">
            💡 <strong>إتيكيت المراسلات في ألمانيا:</strong> ${current.etiquetteTip}
          </div>
        </div>
      </div>
    `;

    this.bindEvents(current);
  }

  bindEvents(current) {
    // تبديل القوالب
    const tabs = this.container.querySelectorAll('.email-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.setEmail(tab.getAttribute('data-id'));
      });
    });

    // زر نسخ الإيميل
    const copyBtn = this.container.querySelector('#btn-copy-full-email');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const fullText = `Betreff: ${current.subject}\n\n${current.bodyDe}`;
        this.copyToClipboard(fullText, copyBtn);
      });
    }
  }
}
