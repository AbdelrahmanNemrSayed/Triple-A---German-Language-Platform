// مدير الملفات الشخصية المتعددة - Multi-User Profile Manager
import { Storage } from './storage.js';

export class ProfileManager {
  constructor(options = {}) {
    this.onProfileChange = options.onProfileChange || (() => location.reload());
    this.avatars = ['🎓', '🚀', '👑', '⚡', '🦁', '🦉', '🌟', '🎯', '👨‍💻', '👩‍💻', '🇩🇪', '🔥'];
    this.selectedAvatar = '🎓';
    this.init();
  }

  init() {
    this.renderTopbarBadge();
    this.injectModalHtml();
    this.bindEvents();
  }

  openModal() {
    this.injectModalHtml();
    const modal = document.getElementById('profile-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  renderTopbarBadge() {
    const active = Storage.getActiveProfile();
    const seniority = Storage.getSeniorityInfo(active.createdAt);
    const badgeContainer = document.getElementById('user-profile-badge-mount');

    if (badgeContainer) {
      badgeContainer.innerHTML = `
        <button class="user-profile-btn" id="btn-open-profile-modal" title="الملف الشخصي وتبديل المتعلّم" type="button" aria-haspopup="dialog">
          <span class="user-avatar">${active.avatar || '🎓'}</span>
          <div class="user-info-mini">
            <span class="user-name">${active.name}</span>
            <span class="user-seniority-tag" title="تاريخ الانضمام: ${seniority.formattedDate}">${seniority.label}</span>
          </div>
          <span class="profile-switch-chevron">▾</span>
        </button>
      `;

      const btn = badgeContainer.querySelector('#btn-open-profile-modal');
      if (btn) {
        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openModal();
        };
      }
    }
  }

  injectModalHtml() {
    let modal = document.getElementById('profile-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'profile-modal';
      modal.className = 'modal-overlay hidden';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'profile-modal-title');
      const container = document.getElementById('profile-modal-container') || document.body;
      container.appendChild(modal);
    } else {
      modal.className = 'modal-overlay' + (modal.classList.contains('hidden') ? ' hidden' : '');
    }

    const profiles = Storage.getProfiles();
    const active = Storage.getActiveProfile();

    modal.innerHTML = `
      <div class="modal-card profile-modal-card" role="document">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <span class="modal-icon">👥</span>
            <div>
              <h3 class="modal-title" id="profile-modal-title">إدارة المتعلّمين والملفات الشخصية</h3>
              <p class="modal-subtitle">بدّل بين المتعلّمين أو أضف متعلّماً جديداً لمتابعة قِدمه وتقدمه بشكل مستقل</p>
            </div>
          </div>
          <button class="modal-close-btn" id="btn-close-profile-modal" type="button" title="إغلاق" aria-label="إغلاق">✕</button>
        </div>

        <div class="modal-body profile-modal-body">
          <!-- قائمة المستخدمين الحاليين -->
          <div class="profiles-section-title">
            <span>المتعلّمون المسجلون على هذا الجهاز (${profiles.length}):</span>
          </div>

          <div class="profiles-list-grid" id="profiles-list-grid">
            ${profiles.map(p => {
              const isActive = p.id === active.id;
              const seniority = Storage.getSeniorityInfo(p.createdAt);
              const userXP = Storage.getXPForProfile ? Storage.getXPForProfile(p.id) : 0;
              const levelInfo = Storage.getLevelInfo ? Storage.getLevelInfo(userXP) : { title: 'مبتدئ' };
              return `
                <div class="profile-card-item ${isActive ? 'is-active-profile' : ''}" data-profile-id="${p.id}">
                  <div class="profile-card-main">
                    <span class="profile-avatar-display">${p.avatar || '👤'}</span>
                    <div class="profile-card-details">
                      <div class="profile-name-row">
                        <strong class="profile-item-name">${p.name}</strong>
                        ${isActive ? '<span class="active-badge-pill">النشط حالياً ✨</span>' : ''}
                      </div>
                      <div class="profile-meta-row">
                        <span class="profile-date-tag" title="تاريخ البداية: ${seniority.formattedDate}">📅 ${seniority.label}</span>
                        <span class="profile-xp-tag" title="مستوى المتعلّم: ${levelInfo.title}">⭐ ${userXP} XP (${levelInfo.title})</span>
                      </div>
                    </div>
                  </div>

                  <div class="profile-card-actions">
                    ${!isActive ? `
                      <button class="btn-switch-profile" type="button" data-action="switch-profile" data-id="${p.id}">
                        <span>تبديل الحساب 🔄</span>
                      </button>
                      ${profiles.length > 1 ? `
                        <button class="btn-delete-profile" type="button" data-action="delete-profile" data-id="${p.id}" title="حذف الملف الشخصي">
                          🗑️
                        </button>
                      ` : ''}
                    ` : `
                      <span class="profile-active-indicator">✅ قيد الاستخدام</span>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- إضافة مستخدم جديد -->
          <div class="add-profile-divider">
            <span>➕ إضافة متعلّم جديد للبدء من الصفر</span>
          </div>

          <form class="add-profile-form" id="form-add-profile">
            <div class="avatar-selector-wrap">
              <label class="form-label">اختر الأيقونة / الرمز التعبيري:</label>
              <div class="avatar-picker-grid">
                ${this.avatars.map(av => `
                  <button type="button" class="avatar-choice-btn ${av === this.selectedAvatar ? 'selected' : ''}" data-avatar="${av}">
                    ${av}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="form-group" style="margin-top: 1rem;">
              <label for="input-new-profile-name" class="form-label">اسم المتعلّم:</label>
              <div class="input-with-action">
                <input type="text" id="input-new-profile-name" class="form-input" placeholder="مثال: أحمد، سارة، مريم..." required maxlength="25">
                <button type="submit" class="btn-primary" id="btn-submit-add-profile">
                  <span>إضافة وبدء التعلم 🚀</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // فتح النافذة بالوفود العام (Global delegation)
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('#btn-open-profile-modal');
      if (openBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.openModal();
        return;
      }

      const closeBtn = e.target.closest('#btn-close-profile-modal');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
        return;
      }

      // إغلاق عند النقر على الخلفية المعتمة خارج بطاقة النافذة
      const modal = document.getElementById('profile-modal');
      if (modal && !modal.classList.contains('hidden')) {
        const card = e.target.closest('.profile-modal-card');
        if (!card && modal.contains(e.target)) {
          this.closeModal();
          return;
        }
      }

      // اختيار الأفاتار
      const avBtn = e.target.closest('.avatar-choice-btn');
      if (avBtn) {
        const modal = document.getElementById('profile-modal');
        if (modal) {
          modal.querySelectorAll('.avatar-choice-btn').forEach(b => b.classList.remove('selected'));
          avBtn.classList.add('selected');
          this.selectedAvatar = avBtn.getAttribute('data-avatar');
        }
        return;
      }

      // تبديل الحساب
      const switchBtn = e.target.closest('[data-action="switch-profile"]');
      if (switchBtn) {
        const targetId = switchBtn.getAttribute('data-id');
        if (targetId && Storage.setActiveProfile(targetId)) {
          this.renderTopbarBadge();
          this.closeModal();
          this.onProfileChange();
        }
        return;
      }

      // حذف الحساب
      const delBtn = e.target.closest('[data-action="delete-profile"]');
      if (delBtn) {
        const targetId = delBtn.getAttribute('data-id');
        if (targetId && confirm('هل أنت متأكد من رغبتك في حذف هذا الملف الشخصي؟ سيتم مسح بياناته المسجلة على هذا الجهاز.')) {
          Storage.deleteProfile(targetId);
          this.injectModalHtml();
          this.renderTopbarBadge();
          this.onProfileChange();
        }
        return;
      }
    });

    // إغلاق عبر مفتاح Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // إرسال نموذج إضافة متعلم جديد
    document.addEventListener('submit', (e) => {
      if (e.target && e.target.id === 'form-add-profile') {
        e.preventDefault();
        const nameInput = document.getElementById('input-new-profile-name');
        if (nameInput && nameInput.value.trim()) {
          Storage.createProfile(nameInput.value.trim(), this.selectedAvatar);
          nameInput.value = '';
          this.renderTopbarBadge();
          this.closeModal();
          this.onProfileChange();
        }
      }
    });
  }
}
