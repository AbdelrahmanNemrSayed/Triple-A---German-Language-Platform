// assets/js/living_guide.js - مدير دليل الحياة والمعيشة في ألمانيا (Leben & Alltag in Deutschland)
import { livingGuideData } from '../../data/living_guide.js';
import { Storage } from './storage.js';

export class LivingGuideManager {
  constructor(containerEl, onXPUpdate) {
    this.container = containerEl;
    this.onXPUpdate = onXPUpdate || (() => {});
    this.currentGuideId = livingGuideData[0].id;
  }

  getCurrentGuide() {
    return livingGuideData.find(g => g.id === this.currentGuideId) || livingGuideData[0];
  }

  render() {
    const guide = this.getCurrentGuide();
    const checklistState = Storage.getChecklistState();

    this.container.innerHTML = `
      <div class="living-section">
        <!-- Banner -->
        <div class="living-banner">
          <div class="living-banner-content">
            <span class="living-banner-badge">🇩🇪 دليل الاندماج والحياة الواقعية</span>
            <h2 class="living-banner-title">دليل المعيشة والمعاملات اليومية في ألمانيا</h2>
            <p class="living-banner-desc">
              كل ما تحتاجه للبدء في ألمانيا: تسجيل السكن (Anmeldung)، التأمين الصحي، فتح البنك، إيجار الشقق، قوانين الهدوء، وقوالب رسائل رسمية جاهزة للنسخ.
            </p>
          </div>
        </div>

        <!-- Guides Nav Grid / Tabs -->
        <div class="living-nav-grid">
          ${livingGuideData.map(g => `
            <button class="living-topic-btn ${g.id === this.currentGuideId ? 'active' : ''}" data-guide-id="${g.id}">
              <span class="topic-icon">${g.icon}</span>
              <span class="topic-title">${g.titleAr}</span>
            </button>
          `).join('')}
        </div>

        <!-- Main Guide Card -->
        <div class="living-main-card">
          <div class="living-card-header">
            <div class="guide-header-text">
              <span class="guide-badge">${guide.badge}</span>
              <h3 class="guide-title-ar">${guide.icon} ${guide.titleAr}</h3>
              <h4 class="guide-title-de" dir="ltr">${guide.titleDe}</h4>
            </div>
          </div>

          <div class="guide-summary-box">
            💡 <strong>ملخص هام:</strong> ${guide.summaryAr}
          </div>

          <!-- Step by Step -->
          <div class="guide-steps-section">
            <h4 class="section-subtitle">📌 خطوات المعاملة بالتفصيل:</h4>
            <div class="steps-timeline">
              ${guide.steps.map((step, idx) => `
                <div class="step-timeline-item">
                  <div class="step-num-bubble">${idx + 1}</div>
                  <div class="step-content">
                    <h5 class="step-title">${step.titleAr}</h5>
                    <p class="step-desc">${step.descAr}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Interactive Checklist -->
          <div class="guide-checklist-section">
            <h4 class="section-subtitle">✅ قائمة المهام والمستندات المطلوبة (Checkliste):</h4>
            <div class="checklist-items-grid">
              ${guide.checklist.map(item => {
                const isChecked = !!checklistState[item.id];
                return `
                  <label class="checklist-label-card ${isChecked ? 'item-completed' : ''}" data-chk-id="${item.id}">
                    <input type="checkbox" class="chk-input" data-chk-id="${item.id}" ${isChecked ? 'checked' : ''}>
                    <span class="custom-chk-box"></span>
                    <div class="chk-texts">
                      <div class="chk-de" dir="ltr">${item.textDe}</div>
                      <div class="chk-ar">${item.textAr}</div>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Bureaucracy Terms Glossary -->
          <div class="guide-glossary-section">
            <h4 class="section-subtitle">📖 مصطلحات أساسية للمعاملة (Bürokratie-Deutsch):</h4>
            <div class="glossary-cards-grid">
              ${guide.glossary.map(term => `
                <div class="glossary-term-card">
                  <div class="term-header">
                    <h5 class="term-german" dir="ltr">${term.term}</h5>
                    <span class="term-phonetic">🗣️ ${term.phonetic}</span>
                  </div>
                  <div class="term-arabic">${term.arabic}</div>
                  <div class="term-explanation">${term.explanation}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Ready-to-use Template -->
          <div class="guide-template-section">
            <div class="template-header-row">
              <div>
                <h4 class="section-subtitle">✉️ نموذج رسالة جاهز: ${guide.template.title}</h4>
                <p class="template-subtext">${guide.template.arabicExplanation}</p>
              </div>
              <button class="btn-copy-template" id="btn-copy-guide-template">
                📋 نسخ النموذج
              </button>
            </div>
            <pre class="template-code-box" id="template-text-box" dir="ltr">${guide.template.germanText}</pre>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // تبديل الدليل
    const topicBtns = this.container.querySelectorAll('.living-topic-btn');
    topicBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentGuideId = btn.getAttribute('data-guide-id');
        this.render();
      });
    });

    // قائمة التحقق
    const chkInputs = this.container.querySelectorAll('.chk-input');
    chkInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-chk-id');
        Storage.toggleChecklistItem(id);
        const card = this.container.querySelector(`.checklist-label-card[data-chk-id="${id}"]`);
        if (card) card.classList.toggle('item-completed', e.target.checked);
        Storage.addXP(5);
        this.onXPUpdate();
      });
    });

    // نسخ النموذج
    const copyBtn = this.container.querySelector('#btn-copy-guide-template');
    const textBox = this.container.querySelector('#template-text-box');
    if (copyBtn && textBox) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(textBox.textContent).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '✅ تم النسخ بنجاح!';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
          }, 2500);
        });
      });
    }
  }
}
