// assets/js/radio_player.js
// مشغل الراديو الألماني المباشر وجلسات الاستماع البطيئة - منصة Triple A PRO

import { RADIO_STATIONS_DATA, SLOW_LISTENING_PRACTICE } from '../../data/radio_stations.js';
import { AudioPlayer } from './audio.js';

export class RadioPlayer {
  constructor(mountSelector = '#radio-mount') {
    this.mountEl = document.querySelector(mountSelector);
    this.audioElement = new Audio();
    this.currentStation = RADIO_STATIONS_DATA[0];
    this.isPlaying = false;
    this.isLoading = false;
    this.volume = 0.8;
    this.currentSlowIndex = 0;
    this.isSlowPlaying = false;

    this.audioElement.volume = this.volume;
    this.setupAudioListeners();
  }

  setupAudioListeners() {
    this.audioElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.isLoading = false;
      this.updatePlayerUI();
    });

    this.audioElement.addEventListener('waiting', () => {
      this.isLoading = true;
      this.updatePlayerUI();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.isLoading = false;
      this.updatePlayerUI();
    });

    this.audioElement.addEventListener('error', (e) => {
      this.isPlaying = false;
      this.isLoading = false;
      this.updatePlayerUI('تعذر الاتصال بالبث المباشر حالياً. يمكنك الاستمتاع بفقرات الاستماع البطيئة بالأسفل.');
    });
  }

  init() {
    if (!this.mountEl) return;
    this.render();
  }

  render() {
    this.mountEl.innerHTML = `
      <div class="radio-container">
        <!-- Hero Header -->
        <header class="radio-header">
          <div class="radio-title-wrap">
            <span class="vault-badge">
              <i class="fa-solid fa-tower-broadcast"></i>
              استماع حي ومباشر
            </span>
            <h2 class="radio-main-title">راديو اللغة الألمانية والأخبار البطيئة</h2>
            <p class="radio-subtitle">انغمس في البيئة الصوتية الألمانية الحية واستمع لمحطات الأخبار والثقافة والموسيقى لتعويد أذنك على سرعة الناطقين الأصليين</p>
          </div>
        </header>

        <!-- Main Live Player Card -->
        <div class="live-player-card" style="--station-accent: ${this.currentStation.themeColor}">
          <div class="player-top-row">
            <div class="station-meta-block">
              <div class="station-avatar">
                <i class="${this.currentStation.logoIcon}"></i>
              </div>
              <div class="station-info">
                <span class="station-badge">${this.currentStation.badge}</span>
                <h3 class="station-name">${this.currentStation.name}</h3>
                <p class="station-tagline">${this.currentStation.tagline}</p>
                <small class="station-city"><i class="fa-solid fa-location-dot"></i> ${this.currentStation.city}</small>
              </div>
            </div>

            <!-- Sound Visualizer Bars -->
            <div class="sound-visualizer ${this.isPlaying ? 'playing' : ''}">
              <span class="bar bar-1"></span>
              <span class="bar bar-2"></span>
              <span class="bar bar-3"></span>
              <span class="bar bar-4"></span>
              <span class="bar bar-5"></span>
            </div>
          </div>

          <!-- Player Controls Bar -->
          <div class="player-controls-row">
            <button class="btn-live-toggle ${this.isPlaying ? 'playing' : ''} ${this.isLoading ? 'loading' : ''}" id="btn-toggle-live">
              ${this.isLoading ? '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>جاري الاتصال...</span>' :
                this.isPlaying ? '<i class="fa-solid fa-pause"></i> <span>إيقاف مؤقت</span>' :
                '<i class="fa-solid fa-play"></i> <span>تشغيل البث المباشر</span>'}
            </button>

            <div class="volume-control-box" dir="ltr">
              <button class="btn-mute ${this.volume === 0 ? 'muted' : ''}" id="btn-mute-toggle" title="كتم / تشغيل الصوت">
                <i class="fa-solid ${this.volume === 0 ? 'fa-volume-xmark' : (this.volume < 0.35 ? 'fa-volume-low' : 'fa-volume-high')}"></i>
              </button>
              <div class="vol-slider-wrap">
                <input type="range" min="0" max="1" step="0.01" value="${this.volume}" id="volume-slider" class="vol-slider" style="--vol-percent: ${Math.round(this.volume * 100)}%;" />
              </div>
              <span class="vol-val">${Math.round(this.volume * 100)}%</span>
            </div>

            <div class="live-indicator ${this.isPlaying ? 'on-air' : ''}">
              <span class="pulse-dot"></span>
              <span>${this.isPlaying ? 'على الهواء مباشر' : 'جاهز للبث'}</span>
            </div>
          </div>

          <div class="stream-error-notice hidden" id="stream-error-notice"></div>
        </div>

        <!-- Available Stations Grid -->
        <div class="stations-section">
          <h3 class="stations-section-title"><i class="fa-solid fa-satellite-dish"></i> المحطات الألمانية المتاحة للبث:</h3>
          <div class="stations-grid">
            ${RADIO_STATIONS_DATA.map(st => `
              <div class="station-card ${this.currentStation.id === st.id ? 'active' : ''}" data-station-id="${st.id}">
                <div class="card-st-header">
                  <div class="st-icon-pill" style="color: ${st.themeColor}; background: ${st.themeColor}1a">
                    <i class="${st.logoIcon}"></i>
                  </div>
                  <span class="st-card-badge">${st.city}</span>
                </div>
                <h4 class="st-card-title">${st.name}</h4>
                <p class="st-card-genre">${st.genre}</p>
                <div class="st-card-footer">
                  <button class="btn-select-station ${this.currentStation.id === st.id && this.isPlaying ? 'playing' : ''}">
                    ${this.currentStation.id === st.id && this.isPlaying ? '<i class="fa-solid fa-stop"></i> قيد التشغيل' : '<i class="fa-solid fa-play"></i> استمع للمحطة'}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Slow German Listening Section -->
        <div class="slow-listening-section">
          <div class="slow-header-row">
            <div>
              <h3><i class="fa-solid fa-headphones-simple"></i> استديو الاستماع الهادئ والنطق البطيء (Slow Audio)</h3>
              <p>نصوص ألمانية مقروءة بوضوح وسرعة هادئة مع الترجمة الفورية العربية لتدريب الفهم السماعي</p>
            </div>
          </div>

          <div class="slow-cards-grid">
            ${SLOW_LISTENING_PRACTICE.map(item => `
              <div class="slow-audio-card" data-slow-id="${item.id}">
                <div class="slow-top">
                  <span class="slow-level">${item.level}</span>
                  <span class="slow-topic"><i class="fa-solid fa-bookmark"></i> ${item.topic}</span>
                  <span class="slow-dur"><i class="fa-regular fa-clock"></i> ${item.duration}</span>
                </div>
                <h4 class="slow-title">${item.title}</h4>
                <div class="slow-text-de" dir="ltr">${item.textDe}</div>
                <div class="slow-text-ar">${item.textAr}</div>
                <div class="slow-actions">
                  <button class="btn-play-slow" data-speak-slow="${encodeURIComponent(item.textDe)}">
                    <i class="fa-solid fa-circle-play"></i> استمع بالنطق البطيء المتقن
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  updatePlayerUI(errorMsg = null) {
    const btn = this.mountEl.querySelector('#btn-toggle-live');
    const visualizer = this.mountEl.querySelector('.sound-visualizer');
    const liveIndicator = this.mountEl.querySelector('.live-indicator');
    const errorNotice = this.mountEl.querySelector('#stream-error-notice');

    if (btn) {
      btn.classList.remove('loading', 'playing');
      if (this.isLoading) {
        btn.classList.add('loading');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>جاري الاتصال...</span>';
      } else if (this.isPlaying) {
        btn.classList.add('playing');
        btn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>إيقاف مؤقت</span>';
      } else {
        btn.innerHTML = '<i class="fa-solid fa-play"></i> <span>تشغيل البث المباشر</span>';
      }
    }

    if (visualizer) {
      if (this.isPlaying) visualizer.classList.add('playing');
      else visualizer.classList.remove('playing');
    }

    if (liveIndicator) {
      if (this.isPlaying) {
        liveIndicator.classList.add('on-air');
        liveIndicator.querySelector('span:last-child').textContent = 'على الهواء مباشر';
      } else {
        liveIndicator.classList.remove('on-air');
        liveIndicator.querySelector('span:last-child').textContent = 'جاهز للبث';
      }
    }

    if (errorNotice) {
      if (errorMsg) {
        errorNotice.textContent = errorMsg;
        errorNotice.classList.remove('hidden');
      } else {
        errorNotice.classList.add('hidden');
      }
    }

    // تحديث أزرار المحطات في الشبكة
    this.mountEl.querySelectorAll('.station-card').forEach(card => {
      const isCurrent = card.dataset.stationId === this.currentStation.id;
      card.classList.toggle('active', isCurrent);
      const actionBtn = card.querySelector('.btn-select-station');
      if (actionBtn) {
        if (isCurrent && this.isPlaying) {
          actionBtn.classList.add('playing');
          actionBtn.innerHTML = '<i class="fa-solid fa-stop"></i> قيد التشغيل';
        } else {
          actionBtn.classList.remove('playing');
          actionBtn.innerHTML = '<i class="fa-solid fa-play"></i> استمع للمحطة';
        }
      }
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioElement.pause();
    } else {
      if (!this.audioElement.src || this.audioElement.src !== this.currentStation.streamUrl) {
        this.audioElement.src = this.currentStation.streamUrl;
      }
      this.isLoading = true;
      this.updatePlayerUI();
      this.audioElement.play().catch(err => {
        console.warn('Radio stream playback error:', err);
        this.isLoading = false;
        this.isPlaying = false;
        this.updatePlayerUI('تعذر تشغيل هذا البث المباشر. قد يكون مقيداً جغرافياً أو مؤقتاً.');
      });
    }
  }

  changeStation(station) {
    if (this.currentStation.id === station.id && this.isPlaying) {
      this.togglePlay();
      return;
    }

    this.currentStation = station;
    this.audioElement.src = station.streamUrl;
    this.render();
    this.togglePlay();
  }

  bindEvents() {
    // 1. Play/pause live toggle
    const toggleBtn = this.mountEl.querySelector('#btn-toggle-live');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.togglePlay());
    }

    // 2. Volume slider
    const volSlider = this.mountEl.querySelector('#volume-slider');
    const volVal = this.mountEl.querySelector('.vol-val');
    const muteBtn = this.mountEl.querySelector('#btn-mute-toggle');

    const updateVolumeVisuals = (vol) => {
      const pct = Math.round(vol * 100);
      if (volVal) volVal.textContent = `${pct}%`;
      if (volSlider) {
        volSlider.value = vol;
        volSlider.style.setProperty('--vol-percent', `${pct}%`);
      }
      if (muteBtn) {
        const iconClass = vol === 0 ? 'fa-volume-xmark' : (vol < 0.35 ? 'fa-volume-low' : 'fa-volume-high');
        muteBtn.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        if (vol === 0) muteBtn.classList.add('muted');
        else muteBtn.classList.remove('muted');
      }
    };

    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        this.volume = parseFloat(e.target.value);
        this.audioElement.volume = this.volume;
        updateVolumeVisuals(this.volume);
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        if (this.volume > 0) {
          this.previousVolume = this.volume;
          this.volume = 0;
        } else {
          this.volume = this.previousVolume || 0.8;
        }
        this.audioElement.volume = this.volume;
        updateVolumeVisuals(this.volume);
      });
    }

    // 3. Station Selection
    this.mountEl.querySelectorAll('.station-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.stationId;
        const targetStation = RADIO_STATIONS_DATA.find(s => s.id === id);
        if (targetStation) {
          this.changeStation(targetStation);
        }
      });
    });

    // 4. Slow audio listening buttons
    this.mountEl.querySelectorAll('[data-speak-slow]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = decodeURIComponent(btn.dataset.speakSlow);
        // Temporarily set rate slightly slower for slow reading
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'de-DE';
          utterance.rate = 0.82; // Calm, clear slow pace for learners
          window.speechSynthesis.speak(utterance);
        } else {
          AudioPlayer.speak(text);
        }
      });
    });
  }
}
