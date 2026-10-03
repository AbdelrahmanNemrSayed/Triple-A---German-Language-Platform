// مدير الملفات الشخصية المتعددة - Multi-User Profile Manager
import { Storage } from './storage.js';
import { CloudProgressSync } from './cloud_progress_sync.js';

export class ProfileManager {
  constructor(options = {}) {
    this.onProfileChange = options.onProfileChange || (() => location.reload());
    this.avatars = ['🎓', '🚀', '👑', '⚡', '🦁', '🦉', '🌟', '🎯', '👨‍💻', '👩‍💻', '🇩🇪', '🔥'];
    this.selectedAvatar = '🎓';
    this.cloudProgressSync = new CloudProgressSync();
    this.cloudAuthSubscription = null;
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
      this.refreshCloudStatus();
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

          <section class="profile-backup-section" aria-labelledby="profile-backup-title">
            <div class="profile-backup-heading">
              <strong id="profile-backup-title">نسخ احتياطي للتقدم</strong>
              <p>صدّر تقدم جميع المتعلمين، أو أضف نسخة محفوظة إلى الملفات الموجودة على هذا الجهاز.</p>
            </div>
            <div class="profile-backup-actions">
              <button class="btn-backup-action" type="button" data-action="export-progress">تنزيل النسخة الاحتياطية</button>
              <button class="btn-backup-action btn-backup-import" type="button" data-action="select-progress-backup">استيراد نسخة احتياطية</button>
              <input id="input-progress-backup" type="file" accept=".json,application/json" hidden>
            </div>
            <p class="profile-backup-status" id="profile-backup-status" role="status" aria-live="polite"></p>
          </section>
          <section class="profile-backup-section profile-cloud-section" aria-labelledby="profile-cloud-title">
            <div class="profile-backup-heading">
              <strong id="profile-cloud-title">نسخ سحابي بين أجهزتك</strong>
              <p>ارفع نسخة مشفرة أثناء النقل إلى حسابك، أو استعدها على جهاز آخر. التعلم يعمل محلياً دون تسجيل دخول.</p>
            </div>
            <form class="profile-cloud-login" data-action="cloud-login">
              <label class="form-label" for="input-cloud-email">البريد الإلكتروني لحساب Supabase</label>
              <div class="input-with-action">
                <input class="form-input" id="input-cloud-email" type="email" autocomplete="email" placeholder="name@example.com" required>
                <button class="btn-backup-action" type="submit" data-action="send-cloud-link">أرسل رابط الدخول</button>
              </div>
            </form>
            <div class="profile-cloud-account" hidden>
              <span data-cloud-account></span>
              <button class="btn-backup-action" type="button" data-action="cloud-signout">تسجيل الخروج</button>
            </div>
            <div class="profile-backup-actions profile-cloud-actions" hidden>
              <button class="btn-backup-action" type="button" data-action="cloud-upload">رفع التقدم إلى السحابة</button>
              <button class="btn-backup-action btn-backup-import" type="button" data-action="cloud-restore">استعادة التقدم من السحابة</button>
            </div>
            <p class="profile-cloud-status" role="status" aria-live="polite"></p>
            <small class="learning-disclaimer">رفع نسخة جديدة يستبدل نسخة الحساب. الاستعادة تستبدل ملفات التعلم على هذا الجهاز؛ ننزّل نسخة محلية احتياطية أولاً. استخدم حساباً خاصاً ولا تشارك رابط الدخول.</small>
          </section>
        </div>
      </div>
    `;
  }

  setBackupStatus(message, isError = false) {
    const status = document.getElementById('profile-backup-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  exportProgress() {
    try {
      const backup = Storage.exportProgressBackup();
      this.downloadBackup(backup);
      this.setBackupStatus(`تم تنزيل نسخة احتياطية تشمل ${backup.profiles.length} ملفات شخصية.`);
    } catch (error) {
      console.error('Progress backup export failed:', error);
      this.setBackupStatus(`تعذر إنشاء النسخة الاحتياطية: ${error.message}`, true);
    }
  }

  downloadBackup(backup, suffix = '') {
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `deutschmeister-progress${suffix}-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  setCloudStatus(message, isError = false) {
    const status = document.querySelector('.profile-cloud-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  async refreshCloudStatus() {
    const loginForm = document.querySelector('.profile-cloud-login');
    const account = document.querySelector('.profile-cloud-account');
    const actions = document.querySelector('.profile-cloud-actions');
    if (!loginForm || !account || !actions) return;
    if (!this.cloudProgressSync.configured()) {
      loginForm.hidden = true;
      account.hidden = true;
      actions.hidden = true;
      this.setCloudStatus('المزامنة غير مفعّلة بعد. يلزم إعداد مشروع Supabase ومفتاح anon في ملف الإعدادات.');
      return;
    }
    try {
      const session = await this.cloudProgressSync.getSession();
      loginForm.hidden = Boolean(session);
      account.hidden = !session;
      actions.hidden = !session;
      if (session) {
        account.querySelector('[data-cloud-account]').textContent = `متصل بالحساب: ${session.user.email}`;
        this.setCloudStatus('الحساب جاهز. اختر رفع نسخة هذا الجهاز أو استبدال بياناته بنسخة السحابة.');
      } else {
        this.setCloudStatus('أدخل بريدك لإرسال رابط دخول لمرة واحدة.');
      }
      if (!this.cloudAuthSubscription) {
        const client = this.cloudProgressSync.getClient();
        const { data } = client.auth.onAuthStateChange((event, nextSession) => {
          loginForm.hidden = Boolean(nextSession);
          account.hidden = !nextSession;
          actions.hidden = !nextSession;
          if (nextSession) account.querySelector('[data-cloud-account]').textContent = `متصل بالحساب: ${nextSession.user.email}`;
          if (event === 'SIGNED_IN') this.setCloudStatus('تم تسجيل الدخول. يمكنك الآن رفع التقدم أو استعادته.');
          if (event === 'SIGNED_OUT') this.setCloudStatus('تم تسجيل الخروج. بيانات التعلم المحلية لم تتغير.');
        });
        this.cloudAuthSubscription = data.subscription;
      }
    } catch (error) {
      console.error('Unable to initialize cloud progress:', error);
      this.setCloudStatus(`تعذر الاتصال بإعدادات Supabase: ${error.message}`, true);
    }
  }

  async sendCloudLoginLink() {
    const email = document.getElementById('input-cloud-email')?.value;
    const button = document.querySelector('[data-action="send-cloud-link"]');
    if (!email || !button) return;
    button.disabled = true;
    try {
      await this.cloudProgressSync.sendMagicLink(email);
      this.setCloudStatus(`أرسلنا رابط دخول إلى ${email.trim()}. افتحه على هذا الجهاز لإكمال تسجيل الدخول.`);
    } catch (error) {
      console.error('Sending Supabase sign-in link failed:', error);
      this.setCloudStatus(`تعذر إرسال رابط الدخول: ${error.message}`, true);
    } finally {
      button.disabled = false;
    }
  }

  async uploadCloudProgress() {
    try {
      const cloud = await this.cloudProgressSync.readCloudSnapshot();
      const confirmation = cloud
        ? `يوجد إصدار سحابي ${cloud.revision} بتاريخ ${new Date(cloud.updated_at).toLocaleString('ar-EG')}. رفع هذه النسخة سيستبدله بالكامل. هل تريد المتابعة؟`
        : 'سيُنشأ حسابك بنسخة من جميع الملفات الشخصية والتقدم المحفوظ على هذا الجهاز. هل تريد المتابعة؟';
      if (!confirm(confirmation)) return;
      const result = await this.cloudProgressSync.uploadLocalSnapshot(cloud?.revision ?? null);
      this.setCloudStatus(`تم رفع النسخة رقم ${result.revision} وتشمل ${Storage.getProfiles().length} ملفات شخصية.`);
    } catch (error) {
      console.error('Cloud progress upload failed:', error);
      this.setCloudStatus(`تعذر رفع التقدم: ${error.message}`, true);
    }
  }

  async restoreCloudProgress() {
    try {
      const cloud = await this.cloudProgressSync.readCloudSnapshot();
      if (!cloud) {
        this.setCloudStatus('لا توجد نسخة سحابية لهذا الحساب حتى الآن.', true);
        return;
      }
      if (!confirm(`سيستبدل هذا بيانات الملفات الشخصية والتقدم على الجهاز بنسخة ${cloud.revision} المؤرخة ${new Date(cloud.updated_at).toLocaleString('ar-EG')}. سننزّل نسخة من بيانات هذا الجهاز أولاً. هل تريد المتابعة؟`)) return;
      const localBackup = Storage.exportProgressBackup();
      this.downloadBackup(localBackup, '-before-cloud-restore');
      const restored = await this.cloudProgressSync.restoreCloudSnapshot(cloud.revision);
      this.setCloudStatus(`تمت الاستعادة بنجاح. نُزّلت نسخة الجهاز السابقة، وأُعيدت ${restored.profiles} ملفات شخصية.`);
      this.injectModalHtml();
      this.renderTopbarBadge();
      this.onProfileChange();
    } catch (error) {
      console.error('Cloud progress restore failed:', error);
      this.setCloudStatus(`تعذرت الاستعادة: ${error.message}`, true);
    }
  }

  async importProgress(file) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      this.setBackupStatus('حجم الملف أكبر من الحد المسموح (10 ميجابايت).', true);
      return;
    }
    if (!confirm('ستُضاف الملفات المستوردة إلى الملفات الموجودة دون حذفها، مع إنشاء معرّفات جديدة لتجنب التعارض. هل تريد المتابعة؟')) {
      return;
    }

    try {
      const backup = JSON.parse(await file.text());
      const result = Storage.importProgressBackup(backup);
      this.injectModalHtml();
      this.renderTopbarBadge();
      this.onProfileChange();
      this.setBackupStatus(`تم استيراد ${result.importedProfiles} ملفات شخصية. بقي ملفك النشط كما هو.`);
    } catch (error) {
      console.error('Progress backup import failed:', error);
      this.setBackupStatus(`تعذر استيراد النسخة: ${error.message}`, true);
    }
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

      const exportBtn = e.target.closest('[data-action="export-progress"]');
      if (exportBtn) {
        this.exportProgress();
        return;
      }

      const importBtn = e.target.closest('[data-action="select-progress-backup"]');
      if (importBtn) {
        document.getElementById('input-progress-backup')?.click();
        return;
      }

      if (e.target.closest('[data-action="cloud-upload"]')) {
        this.uploadCloudProgress();
        return;
      }

      if (e.target.closest('[data-action="cloud-restore"]')) {
        this.restoreCloudProgress();
        return;
      }

      if (e.target.closest('[data-action="cloud-signout"]')) {
        this.cloudProgressSync.signOut()
          .then(() => this.refreshCloudStatus())
          .catch(error => {
            console.error('Supabase sign-out failed:', error);
            this.setCloudStatus(`تعذر تسجيل الخروج: ${error.message}`, true);
          });
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target?.id !== 'input-progress-backup') return;
      const input = e.target;
      this.importProgress(input.files?.[0]).finally(() => {
        input.value = '';
      });
    });

    // إغلاق عبر مفتاح Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // إرسال نموذج إضافة متعلم جديد
    document.addEventListener('submit', (e) => {
      if (e.target?.matches('[data-action="cloud-login"]')) {
        e.preventDefault();
        this.sendCloudLoginLink();
        return;
      }
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
