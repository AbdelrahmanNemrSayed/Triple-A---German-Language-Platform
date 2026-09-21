/**
 * Triple A — German Language Platform
 * PWA Installer & Offline Service Worker Manager
 */

export class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.bindEvents();
    this.checkInstallationState();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .then((registration) => {
            console.log('✅ [PWA] Service Worker registered with scope:', registration.scope);
            // Check for updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('🔄 [PWA] New version available, ready for reload.');
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('⚠️ [PWA] Service Worker registration failed:', err);
          });
      });
    }
  }

  bindEvents() {
    // Intercept standard PWA prompt on Android/Chrome/Edge
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('📲 [PWA] beforeinstallprompt event captured.');
      this.showInstallButtons(true);
    });

    // App installed successfully
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.isInstalled = true;
      console.log('🎉 [PWA] App successfully installed on device!');
      this.showInstallButtons(false);
      this.showInstalledCelebration();
    });

    // Handle Install Buttons Click (support multiple buttons in header, nav, drawer)
    document.addEventListener('click', (e) => {
      const installBtn = e.target.closest('.btn-pwa-install-trigger');
      if (installBtn) {
        e.preventDefault();
        this.triggerInstallFlow();
      }
    });
  }

  checkInstallationState() {
    if (this.isStandalone) {
      this.isInstalled = true;
      this.showInstallButtons(false);
      document.body.classList.add('pwa-standalone-mode');
    } else {
      // If iOS Safari, show install button that triggers iOS guidance
      if (this.isIOS) {
        this.showInstallButtons(true);
      }
    }
  }

  showInstallButtons(show) {
    const installBtns = document.querySelectorAll('.btn-pwa-install-trigger');
    installBtns.forEach((btn) => {
      if (show) {
        btn.classList.remove('pwa-hidden');
        btn.classList.add('pwa-visible');
      } else {
        btn.classList.add('pwa-hidden');
        btn.classList.remove('pwa-visible');
      }
    });
  }

  triggerInstallFlow() {
    if (this.deferredPrompt) {
      // Android / Desktop Chrome / Edge prompt
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        } else {
          console.log('User dismissed the PWA install prompt');
        }
        this.deferredPrompt = null;
      });
    } else if (this.isIOS) {
      // iOS Safari guidance sheet
      this.openIOSGuideModal();
    } else {
      // Fallback for browsers that already installed or don't support prompt
      this.openGeneralGuideModal();
    }
  }

  openIOSGuideModal() {
    let modal = document.getElementById('pwa-ios-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pwa-ios-modal';
      modal.className = 'pwa-guide-modal-overlay';
      modal.innerHTML = `
        <div class="pwa-guide-modal-card">
          <div class="pwa-guide-header">
            <div class="pwa-guide-icon-badge">
              <img src="/assets/images/app_icon.svg" alt="App Icon" width="48" height="48" style="border-radius: 12px;" />
            </div>
            <div class="pwa-guide-title-box">
              <h3>تثبيت تطبيق Triple A على الآيفون</h3>
              <p>استمتع بتجربة تطبيق كامل وسريع بدون شريط المتصفح</p>
            </div>
            <button class="pwa-guide-close-btn" id="btn-close-pwa-ios">&times;</button>
          </div>
          <div class="pwa-guide-steps">
            <div class="pwa-step-item">
              <span class="pwa-step-number">1</span>
              <span class="pwa-step-text">اضغط على زر المشاركة <strong>(Share / <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>)</strong> أسفل شاشة Safari.</span>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-number">2</span>
              <span class="pwa-step-text">مرر لأسفل القائمة واختر <strong>"إضافة إلى الشاشة الرئيسية ➕" (Add to Home Screen)</strong>.</span>
            </div>
            <div class="pwa-step-item">
              <span class="pwa-step-number">3</span>
              <span class="pwa-step-text">اضغط على <strong>"إضافة" (Add)</strong> في أعلى الزاوية، وسيظهر التطبيق فوراً على شاشة هاتفك!</span>
            </div>
          </div>
          <button class="pwa-guide-action-btn" id="btn-done-pwa-ios">فهمت ذلك 👍</button>
        </div>
      `;
      document.body.appendChild(modal);

      const close = () => modal.classList.remove('open');
      modal.querySelector('#btn-close-pwa-ios').addEventListener('click', close);
      modal.querySelector('#btn-done-pwa-ios').addEventListener('click', close);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
      });
    }

    setTimeout(() => modal.classList.add('open'), 10);
  }

  openGeneralGuideModal() {
    alert('لتثبيت التطبيق على جهازك: افتح قائمة المتصفح (⋮ أو ⎋) ثم اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية".');
  }

  showInstalledCelebration() {
    const toast = document.createElement('div');
    toast.className = 'pwa-celebration-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">🚀</span>
        <div>
          <strong>تم تثبيت التطبيق بنجاح!</strong>
          <p>يمكنك الآن فتحه مباشرة من شاشة هاتفك الرئيسية في أي وقت.</p>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}
