// مدير التخزين المحلي - LocalStorage Manager مع دعم كامل لنظام الملفات الشخصية المتعددة
// يحفظ المفضلة، الكلمات المتقنة، الكلمات التي تحتاج مراجعة، ونتائج الاختبارات والـ XP لكل مستخدم بشكل مستقل

const STORAGE_KEYS = {
  PROFILES: 'deutschmeister_profiles',
  ACTIVE_PROFILE: 'deutschmeister_active_profile',
  FAVORITES: 'deutschmeister_favorites',
  MASTERED: 'deutschmeister_mastered',
  NEEDS_REVIEW: 'deutschmeister_needs_review',
  QUIZ_STATS: 'deutschmeister_quiz_stats',
  THEME: 'deutschmeister_theme',
  AUDIO_SPEED: 'deutschmeister_audio_speed',
  DAILY_STREAK: 'deutschmeister_daily_streak',
  USER_XP: 'deutschmeister_user_xp',
  SPEED_RUSH_HIGH: 'deutschmeister_speed_rush_high',
  UNLOCKED_BADGES: 'deutschmeister_unlocked_badges',
  CHECKLISTS: 'deutschmeister_checklists',
  EXAM_HISTORY: 'deutschmeister_exam_history'
};

function getActiveProfileId() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE) || 'default';
  } catch {
    return 'default';
  }
}

function getScopedKey(baseKey) {
  const activeId = getActiveProfileId();
  return activeId === 'default' ? baseKey : `${activeId}_${baseKey}`;
}

function getArray(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return [];
  }
}

function setArray(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

export const Storage = {
  // ==========================================================================
  // نظام الملفات الشخصية المتعددة (Multi-User Profiles System)
  // ==========================================================================
  getProfiles() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (!raw) {
        // إنشاء المستخدم الأساسي الأول مع توثيق تاريخ انضمامه وقِدمه
        const defaultProfile = {
          id: 'default',
          name: 'المتعلّم الأول',
          avatar: '🎓',
          createdAt: '2026-09-01T10:00:00.000Z',
          levelTag: 'A1.1'
        };
        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify([defaultProfile]));
        localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, 'default');
        return [defaultProfile];
      }
      return JSON.parse(raw);
    } catch {
      return [{ id: 'default', name: 'المتعلّم الأول', avatar: '🎓', createdAt: new Date().toISOString() }];
    }
  },

  getActiveProfile() {
    const profiles = this.getProfiles();
    const activeId = getActiveProfileId();
    return profiles.find(p => p.id === activeId) || profiles[0];
  },

  setActiveProfile(id) {
    const profiles = this.getProfiles();
    const exists = profiles.some(p => p.id === id);
    if (exists) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, id);
      return true;
    }
    return false;
  },

  createProfile(name, avatar = '👤') {
    const profiles = this.getProfiles();
    const cleanName = name.trim() || `متعلم ${profiles.length + 1}`;
    const newId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    const newProfile = {
      id: newId,
      name: cleanName,
      avatar: avatar || '👤',
      createdAt: new Date().toISOString(),
      levelTag: 'A1.1'
    };
    profiles.push(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    // تهيئة نقاط الـ XP والستريك للمتعلم الجديد ليبدأ من الصفر تماماً
    try {
      localStorage.setItem(`${newId}_${STORAGE_KEYS.USER_XP}`, '0');
      localStorage.setItem(`${newId}_${STORAGE_KEYS.DAILY_STREAK}`, JSON.stringify({ count: 1, lastDate: '', longest: 1 }));
    } catch (e) {
      console.error('Error initializing new user XP:', e);
    }
    this.setActiveProfile(newId);
    return newProfile;
  },

  deleteProfile(id) {
    let profiles = this.getProfiles();
    if (profiles.length <= 1) {
      return false; // لا يمكن حذف الحساب الوحيد
    }
    profiles = profiles.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

    // إذا كان المحذوف هو الحساب النشط حالياً، فعّل الحساب الأول
    if (getActiveProfileId() === id) {
      this.setActiveProfile(profiles[0].id);
    }
    return true;
  },

  updateProfile(id, updates) {
    const profiles = this.getProfiles();
    const idx = profiles.findIndex(p => p.id === id);
    if (idx !== -1) {
      profiles[idx] = { ...profiles[idx], ...updates };
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
      return profiles[idx];
    }
    return null;
  },

  // حساب القِدم والأسبقية الزمنية للمتعلم
  getSeniorityInfo(createdAt) {
    if (!createdAt) return { label: 'عضو جديد ✨', days: 0 };
    const joinDate = new Date(createdAt);
    const now = new Date();
    const diffMs = Math.max(0, now - joinDate);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let label = 'انضم اليوم ✨';
    if (diffDays === 1) {
      label = 'انضم بالأمس (منذ يوم) 📅';
    } else if (diffDays > 1 && diffDays < 30) {
      label = `عضو منذ ${diffDays} يوماً 📅`;
    } else if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      label = `عضو قديم منذ ${months} ${months === 1 ? 'شهر' : 'أشهر'} 🎖️`;
    }

    const formattedDate = joinDate.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return { label, days: diffDays, formattedDate };
  },

  // ==========================================================================
  // المفضلة والكلمات المتقنة (Scoped per active user)
  // ==========================================================================
  getFavorites() {
    return getArray(getScopedKey(STORAGE_KEYS.FAVORITES));
  },
  isFavorite(id) {
    return this.getFavorites().includes(id);
  },
  toggleFavorite(id) {
    const key = getScopedKey(STORAGE_KEYS.FAVORITES);
    const favs = this.getFavorites();
    const index = favs.indexOf(id);
    if (index > -1) {
      favs.splice(index, 1);
    } else {
      favs.push(id);
    }
    setArray(key, favs);
    return this.isFavorite(id);
  },

  getMastered() {
    return getArray(getScopedKey(STORAGE_KEYS.MASTERED));
  },
  isMastered(id) {
    return this.getMastered().includes(id);
  },
  markMastered(id) {
    const key = getScopedKey(STORAGE_KEYS.MASTERED);
    const mastered = this.getMastered();
    if (!mastered.includes(id)) {
      mastered.push(id);
      setArray(key, mastered);
    }
    this.removeNeedsReview(id);
  },
  unmarkMastered(id) {
    const key = getScopedKey(STORAGE_KEYS.MASTERED);
    const mastered = this.getMastered().filter(x => x !== id);
    setArray(key, mastered);
  },

  getNeedsReview() {
    return getArray(getScopedKey(STORAGE_KEYS.NEEDS_REVIEW));
  },
  isNeedsReview(id) {
    return this.getNeedsReview().includes(id);
  },
  markNeedsReview(id) {
    const key = getScopedKey(STORAGE_KEYS.NEEDS_REVIEW);
    const list = this.getNeedsReview();
    if (!list.includes(id)) {
      list.push(id);
      setArray(key, list);
    }
    this.unmarkMastered(id);
  },
  removeNeedsReview(id) {
    const key = getScopedKey(STORAGE_KEYS.NEEDS_REVIEW);
    const list = this.getNeedsReview().filter(x => x !== id);
    setArray(key, list);
  },

  // ==========================================================================
  // إحصائيات الاختبارات
  // ==========================================================================
  getQuizStats() {
    try {
      const raw = localStorage.getItem(getScopedKey(STORAGE_KEYS.QUIZ_STATS));
      return raw ? JSON.parse(raw) : { totalQuizzes: 0, totalQuestions: 0, correctAnswers: 0, streak: 0 };
    } catch {
      return { totalQuizzes: 0, totalQuestions: 0, correctAnswers: 0, streak: 0 };
    }
  },
  saveQuizResult(questionsCount, correctCount) {
    const stats = this.getQuizStats();
    stats.totalQuizzes += 1;
    stats.totalQuestions += questionsCount;
    stats.correctAnswers += correctCount;
    if (correctCount === questionsCount && questionsCount > 0) {
      stats.streak += 1;
    }
    try {
      localStorage.setItem(getScopedKey(STORAGE_KEYS.QUIZ_STATS), JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving quiz stats', e);
    }
    return stats;
  },

  // ==========================================================================
  // إعدادات المتصفح العامة
  // ==========================================================================
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },
  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
  getAudioSpeed() {
    const sp = localStorage.getItem(STORAGE_KEYS.AUDIO_SPEED);
    return sp ? parseFloat(sp) : 1.0;
  },
  setAudioSpeed(speed) {
    localStorage.setItem(STORAGE_KEYS.AUDIO_SPEED, speed.toString());
  },

  // ==========================================================================
  // التلعيب: الستريك اليومي (Scoped per active user)
  // ==========================================================================
  getDailyStreak() {
    try {
      const raw = localStorage.getItem(getScopedKey(STORAGE_KEYS.DAILY_STREAK));
      return raw ? JSON.parse(raw) : { count: 1, lastDate: '', longest: 1 };
    } catch {
      return { count: 1, lastDate: '', longest: 1 };
    }
  },
  recordDailyVisit() {
    const today = new Date().toISOString().split('T')[0];
    const data = this.getDailyStreak();
    if (!data.lastDate) {
      data.count = 1;
      data.lastDate = today;
      data.longest = 1;
    } else if (data.lastDate !== today) {
      const last = new Date(data.lastDate);
      const cur = new Date(today);
      const diffDays = Math.round((cur - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        data.count += 1;
        if (data.count > (data.longest || 1)) {
          data.longest = data.count;
        }
      } else if (diffDays > 1) {
        data.count = 1;
      }
      data.lastDate = today;
    }
    try {
      localStorage.setItem(getScopedKey(STORAGE_KEYS.DAILY_STREAK), JSON.stringify(data));
    } catch (e) {
      console.error('Error saving streak', e);
    }
    return data;
  },

  // ==========================================================================
  // التلعيب: نقاط الخبرة والمستويات (Scoped per active user)
  // ==========================================================================
  getXPForProfile(profileId) {
    try {
      const key = profileId === 'default' ? STORAGE_KEYS.USER_XP : `${profileId}_${STORAGE_KEYS.USER_XP}`;
      const raw = localStorage.getItem(key);
      return (raw !== null && raw !== '') ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  },

  getXP() {
    return this.getXPForProfile(getActiveProfileId());
  },

  addXP(amount) {
    const current = this.getXP();
    const next = current + amount;
    localStorage.setItem(getScopedKey(STORAGE_KEYS.USER_XP), next.toString());

    // تحديث شارة الـ XP في الـ Topbar فوراً في الـ DOM
    if (typeof document !== 'undefined') {
      const xpEl = document.getElementById('topbar-xp-num');
      if (xpEl) {
        xpEl.textContent = next;
        const pill = xpEl.closest('.topbar-xp-pill') || xpEl.parentElement;
        if (pill) {
          pill.classList.remove('xp-updated-pop');
          void pill.offsetWidth; // trigger reflow
          pill.classList.add('xp-updated-pop');
        }
      }
      window.dispatchEvent(new CustomEvent('user-xp-updated', {
        detail: { totalXP: next, gained: amount, levelInfo: this.getLevelInfo(next) }
      }));
    }

    return {
      totalXP: next,
      gained: amount,
      levelInfo: this.getLevelInfo(next)
    };
  },
  getLevelInfo(xp) {
    let title = 'مبتدئ A1.1';
    let minXP = 0;
    let maxXP = 200;
    let badge = '🌱';

    if (xp >= 2000) {
      title = 'متقن الألمانية Pro';
      minXP = 2000;
      maxXP = 5000;
      badge = '👑';
    } else if (xp >= 1000) {
      title = 'بطل اللغة B1';
      minXP = 1000;
      maxXP = 2000;
      badge = '⚡';
    } else if (xp >= 500) {
      title = 'متحدث A2';
      minXP = 500;
      maxXP = 1000;
      badge = '🚀';
    } else if (xp >= 200) {
      title = 'متعلم طموح A1.2';
      minXP = 200;
      maxXP = 500;
      badge = '⭐';
    }

    const progress = Math.min(100, Math.max(0, Math.round(((xp - minXP) / (maxXP - minXP)) * 100)));
    return { title, xp, minXP, maxXP, badge, progress };
  },

  // ==========================================================================
  // أرقام السرعة القياسية والأوسمة وقوائم المعيشة (Scoped)
  // ==========================================================================
  getSpeedRushHighScore() {
    try {
      const raw = localStorage.getItem(getScopedKey(STORAGE_KEYS.SPEED_RUSH_HIGH));
      return raw ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  },
  setSpeedRushHighScore(score) {
    const cur = this.getSpeedRushHighScore();
    if (score > cur) {
      localStorage.setItem(getScopedKey(STORAGE_KEYS.SPEED_RUSH_HIGH), score.toString());
      return true;
    }
    return false;
  },

  getUnlockedBadges() {
    return getArray(getScopedKey(STORAGE_KEYS.UNLOCKED_BADGES));
  },
  unlockBadge(badgeId) {
    const key = getScopedKey(STORAGE_KEYS.UNLOCKED_BADGES);
    const list = this.getUnlockedBadges();
    if (!list.includes(badgeId)) {
      list.push(badgeId);
      setArray(key, list);
      return true;
    }
    return false;
  },

  getChecklistState() {
    try {
      const raw = localStorage.getItem(getScopedKey(STORAGE_KEYS.CHECKLISTS));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },
  toggleChecklistItem(itemId) {
    const key = getScopedKey(STORAGE_KEYS.CHECKLISTS);
    const state = this.getChecklistState();
    state[itemId] = !state[itemId];
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving checklist item', e);
    }
    return state[itemId];
  },

  // ==========================================================================
  // سجل امتحانات غوته وتيلك والشهادات الرسمية (Scoped)
  // ==========================================================================
  getExamHistory() {
    return getArray(getScopedKey(STORAGE_KEYS.EXAM_HISTORY));
  },
  saveExamResult(result) {
    const key = getScopedKey(STORAGE_KEYS.EXAM_HISTORY);
    const history = this.getExamHistory();
    history.unshift({
      ...result,
      id: 'cert_' + Date.now().toString(36),
      date: new Date().toISOString()
    });
    setArray(key, history);
  }
};
