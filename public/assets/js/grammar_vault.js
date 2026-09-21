// assets/js/grammar_vault.js
// بنك القواعد الألمانية التفاعلي وحاسبة تصريف الصفات - منصة Triple A PRO

import { KASUS_DATA, ADJECTIVE_DECLENSION_RULES, SENTENCE_CONNECTORS, MODAL_VERBS_DATA } from '../../data/grammar_rules.js';
import { AudioPlayer } from './audio.js';

export class GrammarVault {
  constructor(mountSelector = '#grammar-mount') {
    this.mountEl = document.querySelector(mountSelector);
    this.activeTab = 'kasus'; // 'kasus' | 'adjective' | 'connectors' | 'modal'
    this.selectedKasus = 'nominativ';
    
    // Calculator state
    this.calcArticleType = 'definite'; // 'definite' | 'indefinite' | 'zero'
    this.calcCase = 'nominativ';       // 'nominativ' | 'akkusativ' | 'dativ' | 'genitiv'
    this.calcGender = 'm';            // 'm' | 'f' | 'n' | 'pl'
    this.calcAdjective = 'gut';
    this.calcNoun = 'Mann';

    this.sampleNouns = {
      m: { noun: 'Mann', meaning: 'رجل' },
      f: { noun: 'Frau', meaning: 'امرأة' },
      n: { noun: 'Auto', meaning: 'سيارة' },
      pl: { noun: 'Leute', meaning: 'ناس / أشخاص' }
    };
  }

  init() {
    if (!this.mountEl) return;
    this.render();
  }

  render() {
    this.mountEl.innerHTML = `
      <div class="grammar-vault-container">

        <!-- ====== Premium Banner ====== -->
        <div class="grammar-hero-banner">
          <div class="grammar-hero-left">
            <span class="vault-badge">
              <i class="fa-solid fa-scale-balanced"></i>
              مرجع القواعد الذكي
            </span>
            <h2 class="grammar-main-title">🏛️ بنك القواعد الألمانية الذهبي</h2>
            <p class="grammar-subtitle">مصفوفة الإعراب الكاملة • حاسبة تصريف الصفات • أدوات الربط • الأفعال الناقصة</p>
          </div>
          <div class="grammar-hero-stats">
            <div class="g-stat-pill">
              <span class="g-stat-icon">📐</span>
              <div>
                <span class="g-stat-num">4</span>
                <span class="g-stat-label">حالات إعرابية</span>
              </div>
            </div>
            <div class="g-stat-pill">
              <span class="g-stat-icon">✨</span>
              <div>
                <span class="g-stat-num">3</span>
                <span class="g-stat-label">جداول تصريف</span>
              </div>
            </div>
            <div class="g-stat-pill">
              <span class="g-stat-icon">⚡</span>
              <div>
                <span class="g-stat-num">6</span>
                <span class="g-stat-label">أفعال ناقصة</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ====== Navigation Tabs ====== -->
        <div class="grammar-nav-tabs" role="tablist">
          <button class="g-tab-btn ${this.activeTab === 'kasus' ? 'active' : ''}" data-gtab="kasus">
            <span class="g-tab-icon">📋</span>
            <span class="g-tab-text">مصفوفة الحالات الإعرابية</span>
            <span class="g-tab-sub">Kasus</span>
          </button>
          <button class="g-tab-btn ${this.activeTab === 'adjective' ? 'active' : ''}" data-gtab="adjective">
            <span class="g-tab-icon">🧮</span>
            <span class="g-tab-text">حاسبة الصفات</span>
            <span class="g-tab-sub">Adjektivdeklination</span>
          </button>
          <button class="g-tab-btn ${this.activeTab === 'connectors' ? 'active' : ''}" data-gtab="connectors">
            <span class="g-tab-icon">🔗</span>
            <span class="g-tab-text">أدوات الربط</span>
            <span class="g-tab-sub">Konnektoren</span>
          </button>
          <button class="g-tab-btn ${this.activeTab === 'modal' ? 'active' : ''}" data-gtab="modal">
            <span class="g-tab-icon">⚡</span>
            <span class="g-tab-text">الأفعال الناقصة</span>
            <span class="g-tab-sub">Modalverben</span>
          </button>
        </div>

        <!-- Dynamic Content Area -->
        <div class="grammar-body" id="grammar-tab-content">
          ${this.renderActiveTabContent()}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'kasus':
        return this.renderKasusTab();
      case 'adjective':
        return this.renderAdjectiveTab();
      case 'connectors':
        return this.renderConnectorsTab();
      case 'modal':
        return this.renderModalVerbsTab();
      default:
        return '';
    }
  }

  // --- 1. KASUS TAB ---
  renderKasusTab() {
    const isWechsel = this.selectedKasus === 'wechsel';
    const currentCase = KASUS_DATA.cases.find(c => c.id === this.selectedKasus);

    return `
      <div class="kasus-section animate-fade-in">
        <!-- Kasus Selector Pills -->
        <div class="kasus-selector-bar">
          ${KASUS_DATA.cases.map(c => `
            <button class="kasus-chip ${this.selectedKasus === c.id ? 'active' : ''}" data-kasus="${c.id}">
              <span class="chip-de">${c.nameDe}</span>
              <span class="chip-ar">${c.nameAr.split(' ')[0]}</span>
            </button>
          `).join('')}
          <button class="kasus-chip wechsel ${this.selectedKasus === 'wechsel' ? 'active' : ''}" data-kasus="wechsel">
            <span class="chip-de">Wechselpräpositionen</span>
            <span class="chip-ar">حروف الجر المشتركة</span>
          </button>
        </div>

        ${isWechsel ? this.renderWechselCard() : this.renderKasusCard(currentCase)}
      </div>
    `;
  }

  renderKasusCard(c) {
    if (!c) return '';
    return `
      <div class="kasus-detail-card">
        <div class="kasus-hero-header">
          <div class="k-title-group">
            <span class="k-question-tag">${c.question}</span>
            <h3 class="k-headline">${c.nameDe} <span class="k-ar">(${c.nameAr})</span></h3>
            <p class="k-desc">${c.description}</p>
          </div>
          ${c.prepositions ? `
            <div class="k-preps-box">
              <span class="k-prep-label"><i class="fa-solid fa-tags"></i> حروف الجر الخاصة:</span>
              <div class="k-prep-tags">
                ${c.prepositions.map(p => `<span class="prep-tag">${p}</span>`).join('')}
              </div>
              <small class="k-prep-tip">${c.prepTip}</small>
            </div>
          ` : ''}
        </div>

        <!-- Articles Matrix Table -->
        <div class="table-responsive">
          <table class="kasus-table">
            <thead>
              <tr>
                <th>نوع الأداة</th>
                <th>المذكر (Maskulin - der)</th>
                <th>المؤنث (Feminin - die)</th>
                <th>المحايد (Neutral - das)</th>
                <th>الجمع (Plural - die)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>أداة المعرفة (Bestimmt)</strong></td>
                <td><span class="art-badge m">${c.articles.definite.m}</span></td>
                <td><span class="art-badge f">${c.articles.definite.f}</span></td>
                <td><span class="art-badge n">${c.articles.definite.n}</span></td>
                <td><span class="art-badge pl">${c.articles.definite.pl}</span></td>
              </tr>
              <tr>
                <td><strong>أداة النكرة (Unbestimmt)</strong></td>
                <td><span class="art-badge m">${c.articles.indefinite.m}</span></td>
                <td><span class="art-badge f">${c.articles.indefinite.f}</span></td>
                <td><span class="art-badge n">${c.articles.indefinite.n}</span></td>
                <td><span class="art-badge pl">${c.articles.indefinite.pl}</span></td>
              </tr>
              <tr>
                <td><strong>أداة النفي (Negation)</strong></td>
                <td><span class="art-badge m">${c.articles.negative.m}</span></td>
                <td><span class="art-badge f">${c.articles.negative.f}</span></td>
                <td><span class="art-badge n">${c.articles.negative.n}</span></td>
                <td><span class="art-badge pl">${c.articles.negative.pl}</span></td>
              </tr>
              <tr>
                <td><strong>أداة الملكية (Possessiv - mein)</strong></td>
                <td><span class="art-badge m">${c.articles.possessive.m}</span></td>
                <td><span class="art-badge f">${c.articles.possessive.f}</span></td>
                <td><span class="art-badge n">${c.articles.possessive.n}</span></td>
                <td><span class="art-badge pl">${c.articles.possessive.pl}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pronouns & Examples Grid -->
        <div class="kasus-subgrid">
          <div class="k-pronouns-card">
            <h4><i class="fa-solid fa-users"></i> ضمائر الفاعل والمفعول (${c.nameDe})</h4>
            <div class="pronouns-grid">
              ${c.pronouns.map(p => `
                <div class="pronoun-tile">
                  <span class="p-de">${p.de}</span>
                  <span class="p-ar">${p.ar}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="k-examples-card">
            <h4><i class="fa-solid fa-bullhorn"></i> أمثلة تطبيقية نموذجية</h4>
            <div class="examples-list">
              ${c.examples.map(ex => `
                <div class="example-item">
                  <div class="ex-text">
                    <p class="ex-de" dir="ltr">${ex.de}</p>
                    <p class="ex-ar">${ex.ar}</p>
                  </div>
                  <button class="btn-listen-mini" data-speak="${encodeURIComponent(ex.de)}" title="استمع للنطق">
                    <i class="fa-solid fa-volume-high"></i>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderWechselCard() {
    const data = KASUS_DATA.wechselpraepositionen;
    return `
      <div class="kasus-detail-card wechsel-view">
        <div class="kasus-hero-header">
          <div class="k-title-group">
            <span class="k-question-tag">Akkusativ (Wohin?) vs Dativ (Wo?)</span>
            <h3 class="k-headline">${data.title}</h3>
            <p class="k-desc">${data.rule}</p>
          </div>
        </div>

        <div class="wechsel-prep-grid">
          ${data.prepositions.map(p => `
            <div class="wechsel-chip">
              <span class="w-de">${p.de}</span>
              <span class="w-ar">${p.ar}</span>
            </div>
          `).join('')}
        </div>

        <div class="wechsel-rule-duel">
          <div class="duel-box akk">
            <div class="duel-badge"><i class="fa-solid fa-arrow-right-long"></i> حركة (Bewegung) = Akkusativ</div>
            <p class="duel-rule">سؤال: <strong>Wohin? (إلى أين؟)</strong></p>
            <div class="duel-example" dir="ltr">
              <span class="ex-hl">Ich lege das Buch <strong>auf den</strong> Tisch.</span>
            </div>
            <p class="duel-ar">أنا أضع الكتاب فوق الطاولة (فعل حركة: legen).</p>
          </div>

          <div class="duel-box dat">
            <div class="duel-badge"><i class="fa-solid fa-location-dot"></i> سكون وثبات (Position) = Dativ</div>
            <p class="duel-rule">سؤال: <strong>Wo? (أين؟)</strong></p>
            <div class="duel-example" dir="ltr">
              <span class="ex-hl">Das Buch liegt <strong>auf dem</strong> Tisch.</span>
            </div>
            <p class="duel-ar">الكتاب موضوع فوق الطاولة (فعل سكون: liegen).</p>
          </div>
        </div>
      </div>
    `;
  }

  // --- 2. ADJECTIVE DECLENSION TAB & CALCULATOR ---
  renderAdjectiveTab() {
    const calcResult = this.computeAdjectiveDeclension();

    return `
      <div class="adjective-section animate-fade-in">
        <!-- Interactive Calculator Bar -->
        <div class="adj-calculator-card">
          <div class="calc-header">
            <h3><i class="fa-solid fa-calculator"></i> حاسبة تصريف الصفات الألمانية التفاعلية</h3>
            <p>اختر نوع الأداة والحالة الإعرابية والجنس لتشاهد وتسمع النهاية الصحيحة فوراً مع الشرح القاعدي</p>
          </div>

          <div class="calc-controls-grid">
            <!-- 1. Article Type -->
            <div class="ctrl-group">
              <label>1. نوع أداة التعريف</label>
              <div class="ctrl-btn-group">
                <button class="calc-btn ${this.calcArticleType === 'definite' ? 'active' : ''}" data-type="article" data-val="definite">
                  أداة معرفة (der/die/das)
                </button>
                <button class="calc-btn ${this.calcArticleType === 'indefinite' ? 'active' : ''}" data-type="article" data-val="indefinite">
                  أداة نكرة / ملكية (ein/mein)
                </button>
                <button class="calc-btn ${this.calcArticleType === 'zero' ? 'active' : ''}" data-type="article" data-val="zero">
                  بدون أداة (Nullartikel)
                </button>
              </div>
            </div>

            <!-- 2. Case -->
            <div class="ctrl-group">
              <label>2. الحالة الإعرابية (Kasus)</label>
              <div class="ctrl-btn-group">
                <button class="calc-btn ${this.calcCase === 'nominativ' ? 'active' : ''}" data-type="case" data-val="nominativ">Nominativ (رفع)</button>
                <button class="calc-btn ${this.calcCase === 'akkusativ' ? 'active' : ''}" data-type="case" data-val="akkusativ">Akkusativ (نصب)</button>
                <button class="calc-btn ${this.calcCase === 'dativ' ? 'active' : ''}" data-type="case" data-val="dativ">Dativ (جر)</button>
                <button class="calc-btn ${this.calcCase === 'genitiv' ? 'active' : ''}" data-type="case" data-val="genitiv">Genitiv (إضافة)</button>
              </div>
            </div>

            <!-- 3. Gender -->
            <div class="ctrl-group">
              <label>3. جنس وعدد الاسم (Genus & Numerus)</label>
              <div class="ctrl-btn-group">
                <button class="calc-btn ${this.calcGender === 'm' ? 'active' : ''}" data-type="gender" data-val="m">مذكر (Maskulin)</button>
                <button class="calc-btn ${this.calcGender === 'f' ? 'active' : ''}" data-type="gender" data-val="f">مؤنث (Feminin)</button>
                <button class="calc-btn ${this.calcGender === 'n' ? 'active' : ''}" data-type="gender" data-val="n">محايد (Neutral)</button>
                <button class="calc-btn ${this.calcGender === 'pl' ? 'active' : ''}" data-type="gender" data-val="pl">جمع (Plural)</button>
              </div>
            </div>
          </div>

          <!-- Live Result Display Box -->
          <div class="calc-result-box">
            <div class="result-formula" dir="ltr">
              <span class="part-art">${calcResult.article}</span>
              <span class="part-adj">${this.calcAdjective}<strong class="ending-hl">${calcResult.ending}</strong></span>
              <span class="part-noun">${calcResult.nounDisplay}</span>
            </div>
            <div class="result-meta">
              <span class="result-badge">النهاية المطلوبة: <strong>${calcResult.ending}</strong></span>
              <span class="result-meaning">${calcResult.meaningAr}</span>
              <button class="btn-listen-calc" id="btn-listen-phrase" title="استمع للعبارة بالكامل">
                <i class="fa-solid fa-volume-high"></i> نطق العبارة
              </button>
            </div>
            <p class="calc-explanation"><i class="fa-solid fa-circle-info"></i> ${calcResult.ruleExplanation}</p>
          </div>
        </div>

        <!-- Comparative Tables -->
        <div class="adj-reference-tables">
          <h3><i class="fa-solid fa-book-bookmark"></i> الجداول المرجعية الكاملة</h3>
          <div class="ref-tables-grid">
            ${Object.entries(ADJECTIVE_DECLENSION_RULES).map(([key, rule]) => `
              <div class="ref-table-card ${this.calcArticleType === key ? 'highlighted-rule' : ''}">
                <h4>${rule.name}</h4>
                <p class="ref-rule-desc">${rule.ruleAr}</p>
                <table class="compact-adj-table">
                  <thead>
                    <tr>
                      <th>الحالة</th>
                      <th>مذكر</th>
                      <th>مؤنث</th>
                      <th>محايد</th>
                      <th>جمع</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${['nominativ', 'akkusativ', 'dativ', 'genitiv'].map(kasus => `
                      <tr class="${this.calcCase === kasus && this.calcArticleType === key ? 'active-row' : ''}">
                        <td><strong>${kasus.slice(0, 3).toUpperCase()}</strong></td>
                        <td class="${this.calcGender === 'm' && this.calcCase === kasus && this.calcArticleType === key ? 'active-cell' : ''}">${rule.table[kasus].m}</td>
                        <td class="${this.calcGender === 'f' && this.calcCase === kasus && this.calcArticleType === key ? 'active-cell' : ''}">${rule.table[kasus].f}</td>
                        <td class="${this.calcGender === 'n' && this.calcCase === kasus && this.calcArticleType === key ? 'active-cell' : ''}">${rule.table[kasus].n}</td>
                        <td class="${this.calcGender === 'pl' && this.calcCase === kasus && this.calcArticleType === key ? 'active-cell' : ''}">${rule.table[kasus].pl}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  computeAdjectiveDeclension() {
    const ruleObj = ADJECTIVE_DECLENSION_RULES[this.calcArticleType];
    const ending = ruleObj.table[this.calcCase][this.calcGender];

    // Determine article prefix
    let article = '';
    const sample = this.sampleNouns[this.calcGender];
    let nounDisplay = sample.noun;

    if (this.calcArticleType === 'definite') {
      const artMap = {
        nominativ: { m: 'der', f: 'die', n: 'das', pl: 'die' },
        akkusativ: { m: 'den', f: 'die', n: 'das', pl: 'die' },
        dativ: { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
        genitiv: { m: 'des', f: 'der', n: 'des', pl: 'der' }
      };
      article = artMap[this.calcCase][this.calcGender];
      if (this.calcCase === 'genitiv' && (this.calcGender === 'm' || this.calcGender === 'n')) {
        nounDisplay += 'es';
      } else if (this.calcCase === 'dativ' && this.calcGender === 'pl') {
        nounDisplay += 'n';
      }
    } else if (this.calcArticleType === 'indefinite') {
      const artMap = {
        nominativ: { m: 'ein', f: 'eine', n: 'ein', pl: 'meine' },
        akkusativ: { m: 'einen', f: 'eine', n: 'ein', pl: 'meine' },
        dativ: { m: 'einem', f: 'einer', n: 'einem', pl: 'meinen' },
        genitiv: { m: 'eines', f: 'einer', n: 'eines', pl: 'meiner' }
      };
      article = artMap[this.calcCase][this.calcGender];
      if (this.calcCase === 'genitiv' && (this.calcGender === 'm' || this.calcGender === 'n')) {
        nounDisplay += 'es';
      } else if (this.calcCase === 'dativ' && this.calcGender === 'pl') {
        nounDisplay += 'n';
      }
    } else {
      article = '';
      if (this.calcCase === 'genitiv' && (this.calcGender === 'm' || this.calcGender === 'n')) {
        nounDisplay += 'es';
      }
    }

    const fullPhrase = `${article ? article + ' ' : ''}${this.calcAdjective}${ending.replace('-', '')} ${nounDisplay}`.trim();
    const meaningAr = `${sample.meaning} ${this.calcAdjective === 'gut' ? 'جيد' : 'صفة'}`;

    return {
      ending,
      article,
      nounDisplay,
      fullPhrase,
      meaningAr,
      ruleExplanation: ruleObj.ruleAr
    };
  }

  // --- 3. CONNECTORS TAB ---
  renderConnectorsTab() {
    return `
      <div class="connectors-section animate-fade-in">
        <div class="section-intro-card">
          <h3><i class="fa-solid fa-code-merge"></i> أدوات الربط وترتيب الفعل في الجملة الألمانية</h3>
          <p>أهم مفتاح لإتقان التحدث والكتابة في B1: معرفة هل الأداة تبقي الفعل في مكانه، أم تقلب الفاعل، أم ترسله لآخر الجملة تماماً!</p>
        </div>

        <div class="connectors-grid">
          ${SENTENCE_CONNECTORS.map(cat => `
            <div class="conn-category-card">
              <div class="conn-cat-header">
                <span class="conn-badge">${cat.badge}</span>
                <h4 class="conn-cat-title">${cat.category}</h4>
                <p class="conn-cat-rule">${cat.ruleAr}</p>
              </div>

              <div class="connectors-sublist">
                ${cat.connectors.map(c => `
                  <div class="connector-row">
                    <div class="conn-head">
                      <strong class="conn-word" dir="ltr">${c.de}</strong>
                      <span class="conn-meaning">${c.ar}</span>
                    </div>
                    <div class="conn-example-box" dir="ltr">
                      <p class="conn-ex-text">${c.example}</p>
                      <button class="btn-listen-mini" data-speak="${encodeURIComponent(c.example)}" title="استمع للمثال">
                        <i class="fa-solid fa-volume-high"></i>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- 4. MODAL VERBS TAB ---
  renderModalVerbsTab() {
    return `
      <div class="modals-section animate-fade-in">
        <div class="section-intro-card">
          <h3><i class="fa-solid fa-bolt"></i> تصريف واستخدام الأفعال الناقصة (Modalverben)</h3>
          <p>الأفعال الناقصة تغير معنى الفعل الأساسي في الجملة، ويأتي الفعل الأساسي دائماً في المصدر في نهاية الجملة تماماً (Infinitiv am Ende).</p>
        </div>

        <div class="modals-grid">
          ${MODAL_VERBS_DATA.map(m => `
            <div class="modal-verb-card">
              <div class="mv-header">
                <div class="mv-titles">
                  <h4 class="mv-name" dir="ltr">${m.verb}</h4>
                  <span class="mv-meaning">${m.meaning}</span>
                </div>
                <button class="btn-listen-mini" data-speak="${encodeURIComponent(m.verb + '. ' + m.example)}" title="استمع للفعل">
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>

              <!-- Conjugation Table -->
              <div class="mv-conj-table-wrap">
                <table class="mv-table" dir="ltr">
                  <thead>
                    <tr>
                      <th>ich</th>
                      <th>du</th>
                      <th>er/sie/es</th>
                      <th>wir</th>
                      <th>ihr</th>
                      <th>sie/Sie</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="mv-hl">${m.praesens.ich}</td>
                      <td>${m.praesens.du}</td>
                      <td class="mv-hl">${m.praesens.er_sie_es}</td>
                      <td>${m.praesens.wir}</td>
                      <td>${m.praesens.ihr}</td>
                      <td>${m.praesens.sie_Sie}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mv-meta-box">
                <span class="mv-past-tag"><strong>الماضي (Präteritum):</strong> ${m.praeteritum}</span>
                <div class="mv-example-line" dir="ltr">
                  <span>${m.example}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // 1. Navigation Tab Switching
    this.mountEl.querySelectorAll('.g-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.dataset.gtab;
        if (targetTab && targetTab !== this.activeTab) {
          this.activeTab = targetTab;
          this.render();
        }
      });
    });

    // 2. Kasus Chip Switching
    this.mountEl.querySelectorAll('.kasus-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const k = chip.dataset.kasus;
        if (k && k !== this.selectedKasus) {
          this.selectedKasus = k;
          const body = this.mountEl.querySelector('#grammar-tab-content');
          if (body) body.innerHTML = this.renderKasusTab();
          this.bindEvents();
        }
      });
    });

    // 3. Adjective Calculator Controls
    this.mountEl.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const val = btn.dataset.val;
        if (type === 'article') this.calcArticleType = val;
        if (type === 'case') this.calcCase = val;
        if (type === 'gender') this.calcGender = val;
        
        const body = this.mountEl.querySelector('#grammar-tab-content');
        if (body) body.innerHTML = this.renderAdjectiveTab();
        this.bindEvents();
      });
    });

    // 4. Listen buttons
    this.mountEl.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = decodeURIComponent(btn.dataset.speak);
        AudioPlayer.speak(text);
      });
    });

    // 5. Calculator Phrase Audio
    const listenPhraseBtn = this.mountEl.querySelector('#btn-listen-phrase');
    if (listenPhraseBtn) {
      listenPhraseBtn.addEventListener('click', () => {
        const res = this.computeAdjectiveDeclension();
        AudioPlayer.speak(res.fullPhrase);
      });
    }
  }
}
