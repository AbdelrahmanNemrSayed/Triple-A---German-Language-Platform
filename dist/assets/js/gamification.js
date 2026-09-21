// assets/js/gamification.js - نظام التلعيب، الستريك، ولعبة تحدي السرعة (Gamification & 60-Sec Rush)
import { allVocabulary } from '../../data/vocab.js';
import { audioPlayer } from './audio.js';
import { Storage } from './storage.js';

export class GamificationManager {
  constructor(containerEl, onXPUpdate) {
    this.container = containerEl;
    this.onXPUpdate = onXPUpdate || (() => {});

    // حالة لعبة تحدي السرعة
    this.gameState = 'idle'; // 'idle', 'playing', 'finished'
    this.timer = 60;
    this.timerInterval = null;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.currentWord = null;
    this.wordsPool = [];
    this.lastAnswerResult = null; // 'correct', 'wrong'
  }

  render() {
    const streak = Storage.getDailyStreak();
    const xp = Storage.getXP();
    const levelInfo = Storage.getLevelInfo(xp);
    const highScore = Storage.getSpeedRushHighScore();
    const unlockedBadges = Storage.getUnlockedBadges();

    this.container.innerHTML = `
      <div class="gamification-section">
        <!-- Gamification Banner -->
        <div class="game-banner">
          <div class="game-banner-content">
            <span class="game-banner-badge">🎮 التلعيب والتحفيز اليومي</span>
            <h2 class="game-banner-title">مركز الألعاب، الستريك والتحديات</h2>
            <p class="game-banner-desc">
              حافظ على أيام دراستك المتتالية (Streak 🔥)، ونافس نفسك في لعبة سرعة أدوات التعريف خلال 60 ثانية لجمع نقاط الخبرة (XP) وفتح أوسمة الشرف!
            </p>
          </div>
        </div>

        <!-- Overview Widgets Grid -->
        <div class="game-stats-deck">
          <!-- Streak Card -->
          <div class="game-stat-card streak-card">
            <div class="g-stat-icon">🔥</div>
            <div class="g-stat-info">
              <span class="g-stat-label">أيام الستريك اليومي</span>
              <h3 class="g-stat-value">${streak.count} <small>أيام متتالية</small></h3>
              <p class="g-stat-sub">أطول فترة متتالية: <strong>${streak.longest}</strong> يوم</p>
            </div>
          </div>

          <!-- XP & Level Card -->
          <div class="game-stat-card level-card">
            <div class="g-stat-icon">${levelInfo.badge}</div>
            <div class="g-stat-info">
              <span class="g-stat-label">المستوى الحالي: <strong>${levelInfo.title}</strong></span>
              <h3 class="g-stat-value">${xp} <small>XP</small></h3>
              <div class="xp-progress-bar">
                <div class="xp-progress-fill" style="width: ${levelInfo.progress}%"></div>
              </div>
              <p class="g-stat-sub">${levelInfo.progress}% نحو الترقية للمستوى التالي</p>
            </div>
          </div>

          <!-- Speed Rush High Score Card -->
          <div class="game-stat-card highscore-card">
            <div class="g-stat-icon">⚡</div>
            <div class="g-stat-info">
              <span class="g-stat-label">الرقم القياسي (60-Sec Rush)</span>
              <h3 class="g-stat-value">${highScore} <small>نقطة</small></h3>
              <p class="g-stat-sub">أعلى نتيجة في سرعة الأدوات</p>
            </div>
          </div>
        </div>

        <!-- 60-Second Article Rush Game Arena -->
        <div class="speed-rush-arena" id="speed-rush-arena">
          ${this.renderGameArena(highScore)}
        </div>

        <!-- Badges & Trophies Wall -->
        <div class="badges-wall-section">
          <div class="badges-header">
            <h3 class="badges-wall-title">🏆 لوحة الأوسمة والإنجازات (Erfolge)</h3>
            <span class="badges-count-pill">${unlockedBadges.length} من 8 أوسمة مفتوحة</span>
          </div>

          <div class="badges-grid">
            ${this.renderBadges(unlockedBadges)}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderGameArena(highScore) {
    if (this.gameState === 'idle') {
      return `
        <div class="game-idle-card">
          <div class="rush-icon-badge">⏱️ 60-Sec Rush</div>
          <h3 class="rush-title">تحدي سرعة أدوات التعريف (der - die - das)</h3>
          <p class="rush-desc">
            ستظهر لك كلمات ألمانية متتالية. هدفك هو اختيار أداة التعريف الصحيحة في أسرع وقت ممكن قبل انتهاء الـ 60 ثانية! كل إجابة صحيحة ترفع الـ Combo وتضاعف النقاط!
          </p>
          <button class="btn-start-rush" id="btn-start-rush">
            🚀 بدء التحدي الآن (60 ثانية)
          </button>
        </div>
      `;
    }

    if (this.gameState === 'playing') {
      return `
        <div class="game-playing-card">
          <!-- Top Bar: Timer, Score, Combo -->
          <div class="rush-hud-bar">
            <div class="hud-item timer-item ${this.timer <= 10 ? 'timer-danger' : ''}">
              <span class="hud-label">الوقت المتبقي</span>
              <strong class="hud-val">⏱️ ${this.timer}s</strong>
            </div>

            <div class="hud-item combo-item">
              <span class="hud-label">الكومبو الحالي</span>
              <strong class="hud-val">🔥 x${this.combo}</strong>
            </div>

            <div class="hud-item score-item">
              <span class="hud-label">مجموع النقاط</span>
              <strong class="hud-val">✨ ${this.score}</strong>
            </div>
          </div>

          <!-- Word Display Card -->
          <div class="rush-card-target ${this.lastAnswerResult ? `flash-${this.lastAnswerResult}` : ''}">
            <span class="rush-word-level">${this.currentWord.level}</span>
            <h2 class="rush-word-german" dir="ltr">${this.currentWord.word}</h2>
            <p class="rush-word-arabic">${this.currentWord.arabic}</p>
          </div>

          <!-- Rapid Buttons (der, die, das) -->
          <div class="rush-buttons-grid">
            <button class="btn-rush-article btn-rush-der" data-art="der">
              <span>der</span> <small>(مذكر)</small>
            </button>
            <button class="btn-rush-article btn-rush-die" data-art="die">
              <span>die</span> <small>(مؤنث)</small>
            </button>
            <button class="btn-rush-article btn-rush-das" data-art="das">
              <span>das</span> <small>(محايد)</small>
            </button>
          </div>
        </div>
      `;
    }

    if (this.gameState === 'finished') {
      const isNewHigh = Storage.setSpeedRushHighScore(this.score);
      const accuracy = (this.correctCount + this.wrongCount) > 0
        ? Math.round((this.correctCount / (this.correctCount + this.wrongCount)) * 100)
        : 0;

      return `
        <div class="game-finished-card">
          <div class="finished-trophy">🎉</div>
          <h3 class="finished-title">انتهى التحدي! أحسنت العمل!</h3>

          ${isNewHigh ? `
            <div class="new-highscore-ribbon">🌟 رقم قياسي جديد على حسابك! 🌟</div>
          ` : ''}

          <div class="finished-stats-grid">
            <div class="fin-stat">
              <span class="fin-label">مجموع النقاط</span>
              <strong class="fin-val">${this.score}</strong>
            </div>
            <div class="fin-stat">
              <span class="fin-label">الإجابات الصحيحة</span>
              <strong class="fin-val">${this.correctCount}</strong>
            </div>
            <div class="fin-stat">
              <span class="fin-label">نسبة الدقة</span>
              <strong class="fin-val">${accuracy}%</strong>
            </div>
            <div class="fin-stat">
              <span class="fin-label">أعلى كومبو</span>
              <strong class="fin-val">x${this.maxCombo}</strong>
            </div>
          </div>

          <div class="finished-actions">
            <button class="btn-start-rush" id="btn-restart-rush">
              🔄 إعادة التحدي مرة أخرى
            </button>
          </div>
        </div>
      `;
    }
  }

  renderBadges(unlockedList) {
    const badges = [
      { id: 'badge_streak_3', icon: '🔥', title: 'شعلة الاستمرار', desc: 'دخول المنصة لأيام متتالية' },
      { id: 'badge_articles_master', icon: '⚡', title: 'سيد أدوات التعريف', desc: 'تسجيل نقاط عالية في تحدي السرعة' },
      { id: 'badge_story', icon: '🎧', title: 'مستمع محترف', desc: 'إكمال قصة من قصص الاستماع' },
      { id: 'badge_grammar', icon: '🎯', title: 'عبقري حروف الجر', desc: 'إجابة تحديات الحالات الإعرابية' },
      { id: 'badge_builder', icon: '🧩', title: 'مهندس الجمل', desc: 'بناء جملة ألمانية بنجاح' },
      { id: 'badge_speech', icon: '🎙️', title: 'ناطق برلين', desc: 'اجتياز تدريب النطق الصوتي' },
      { id: 'badge_career', icon: '💼', title: 'جاهز لسوق العمل', desc: 'استكشاف مسارات العمل والوظائف' },
      { id: 'badge_meister', icon: '👑', title: 'الألماني المحترف', desc: 'جمع أكثر من 500 XP في المنصة' }
    ];

    return badges.map(b => {
      const isUnlocked = unlockedList.includes(b.id);
      return `
        <div class="badge-card ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}">
          <div class="badge-icon-wrap">
            <span class="badge-icon">${b.icon}</span>
            ${isUnlocked ? '<span class="badge-check">✓</span>' : '<span class="badge-lock">🔒</span>'}
          </div>
          <div class="badge-info">
            <h4 class="badge-title">${b.title}</h4>
            <p class="badge-desc">${b.desc}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    // زر بدء التحدي
    const startBtn = this.container.querySelector('#btn-start-rush');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame());
    }

    // زر إعادة التحدي
    const restartBtn = this.container.querySelector('#btn-restart-rush');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.startGame());
    }

    // أزرار الاختيار السريع للأدوات
    const articleBtns = this.container.querySelectorAll('.btn-rush-article');
    articleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.gameState !== 'playing') return;
        const chosen = btn.getAttribute('data-art');
        this.submitAnswer(chosen);
      });
    });
  }

  startGame() {
    // تصفية الكلمات التي لها أداة تعريف صريحة
    this.wordsPool = allVocabulary.filter(w => ['der', 'die', 'das'].includes(w.article));
    this.gameState = 'playing';
    this.timer = 60;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.lastAnswerResult = null;
    this.pickNextWord();

    this.render();

    // بدء المؤقت
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer -= 1;
      if (this.timer <= 0) {
        this.endGame();
      } else {
        const timerVal = this.container.querySelector('.hud-val');
        if (timerVal) timerVal.textContent = `⏱️ ${this.timer}s`;
        const timerItem = this.container.querySelector('.timer-item');
        if (timerItem && this.timer <= 10) timerItem.classList.add('timer-danger');
      }
    }, 1000);
  }

  pickNextWord() {
    const randomIndex = Math.floor(Math.random() * this.wordsPool.length);
    this.currentWord = this.wordsPool[randomIndex];
  }

  submitAnswer(chosenArticle) {
    if (!this.currentWord) return;
    const isCorrect = chosenArticle === this.currentWord.article;

    if (isCorrect) {
      this.correctCount += 1;
      this.combo += 1;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      // احتساب النقاط بناء على الكومبو
      const points = 10 + (this.combo * 2);
      this.score += points;
      this.lastAnswerResult = 'correct';
    } else {
      this.wrongCount += 1;
      this.combo = 0;
      this.lastAnswerResult = 'wrong';
    }

    // صوت خفيف / اهتزاز للموبايل
    if (navigator.vibrate) {
      navigator.vibrate(isCorrect ? 30 : [50, 30, 50]);
    }

    this.pickNextWord();
    this.render();
  }

  endGame() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.gameState = 'finished';

    // احتساب XP
    const xpGained = Math.max(20, Math.round(this.score / 2));
    Storage.addXP(xpGained);

    // التحقق من الأوسمة
    if (this.score >= 150) {
      Storage.unlockBadge('badge_articles_master');
    }
    const totalXP = Storage.getXP();
    if (totalXP >= 500) {
      Storage.unlockBadge('badge_meister');
    }

    this.onXPUpdate();
    this.render();
  }
}
