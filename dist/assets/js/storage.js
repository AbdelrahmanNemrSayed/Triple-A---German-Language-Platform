// مدير التخزين المحلي - LocalStorage Manager مع دعم كامل لنظام الملفات الشخصية المتعددة
// يحفظ المفضلة، الكلمات المتقنة، الكلمات التي تحتاج مراجعة، ونتائج الاختبارات والـ XP لكل مستخدم بشكل مستقل

const STORAGE_KEYS = {
  PROFILES: 'deutschmeister_profiles',
  ACTIVE_PROFILE: 'deutschmeister_active_profile',
  FAVORITES: 'deutschmeister_favorites',
  MASTERED: 'deutschmeister_mastered',
  NEEDS_REVIEW: 'deutschmeister_needs_review',
  REVIEW_SCHEDULES: 'deutschmeister_review_schedules',
  TANDEM_DAILY_XP: 'deutschmeister_tandem_daily_xp',
  QUIZ_STATS: 'deutschmeister_quiz_stats',
  THEME: 'deutschmeister_theme',
  AUDIO_SPEED: 'deutschmeister_audio_speed',
  DAILY_STREAK: 'deutschmeister_daily_streak',
  USER_XP: 'deutschmeister_user_xp',
  SPEED_RUSH_HIGH: 'deutschmeister_speed_rush_high',
  UNLOCKED_BADGES: 'deutschmeister_unlocked_badges',
  CHECKLISTS: 'deutschmeister_checklists',
  EXAM_HISTORY: 'deutschmeister_exam_history',
  LEARNING_PROGRESS: 'deutschmeister_learning_progress'
};

const PROFILE_DATA_KEYS = [
  STORAGE_KEYS.FAVORITES,
  STORAGE_KEYS.MASTERED,
  STORAGE_KEYS.NEEDS_REVIEW,
  STORAGE_KEYS.REVIEW_SCHEDULES,
  STORAGE_KEYS.TANDEM_DAILY_XP,
  STORAGE_KEYS.QUIZ_STATS,
  STORAGE_KEYS.DAILY_STREAK,
  STORAGE_KEYS.USER_XP,
  STORAGE_KEYS.SPEED_RUSH_HIGH,
  STORAGE_KEYS.UNLOCKED_BADGES,
  STORAGE_KEYS.CHECKLISTS,
  STORAGE_KEYS.EXAM_HISTORY,
  STORAGE_KEYS.LEARNING_PROGRESS
];
const BACKUP_FORMAT = 'deutschmeister-progress';
const BACKUP_VERSION = 1;
const MAX_BACKUP_BYTES = 10 * 1024 * 1024;

function getActiveProfileId() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE) || 'default';
  } catch {
    return 'default';
  }
}

function getScopedKey(baseKey, profileId = getActiveProfileId()) {
  const activeId = profileId;
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

function validateProgressBackup(backup) {
  if (!backup || backup.format !== BACKUP_FORMAT || backup.version !== BACKUP_VERSION) {
    throw new Error('صيغة النسخة الاحتياطية غير مدعومة.');
  }
  if (!Array.isArray(backup.profiles) || backup.profiles.length === 0 || backup.profiles.length > 100) {
    throw new Error('قائمة الملفات الشخصية في النسخة غير صالحة.');
  }
  if (!backup.profileData || typeof backup.profileData !== 'object' || Array.isArray(backup.profileData)) {
    throw new Error('بيانات التقدم في النسخة غير صالحة.');
  }

  const ids = new Set();
  for (const profile of backup.profiles) {
    if (!profile || typeof profile !== 'object' ||
        typeof profile.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(profile.id) ||
        typeof profile.name !== 'string' || !profile.name.trim() || profile.name.length > 100 ||
        (profile.avatar !== undefined && typeof profile.avatar !== 'string') ||
        (profile.createdAt !== undefined && !Number.isFinite(Date.parse(profile.createdAt)))) {
      throw new Error('يوجد ملف شخصي غير صالح في النسخة الاحتياطية.');
    }
    if (ids.has(profile.id)) {
      throw new Error('تحتوي النسخة على معرّفات ملفات شخصية مكررة.');
    }
    ids.add(profile.id);
  }
  if (!ids.has(backup.activeProfileId)) {
    throw new Error('الملف الشخصي النشط في النسخة غير موجود.');
  }
  if (Object.keys(backup.profileData).some(profileId => !ids.has(profileId))) {
    throw new Error('تحتوي النسخة على بيانات مرتبطة بملف شخصي غير موجود.');
  }

  const encodedSize = new TextEncoder().encode(JSON.stringify(backup)).length;
  if (encodedSize > MAX_BACKUP_BYTES) {
    throw new Error('حجم النسخة الاحتياطية أكبر من الحد المسموح (10 ميجابايت).');
  }

  for (const profileId of ids) {
    const data = backup.profileData[profileId] || {};
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('بيانات أحد الملفات الشخصية غير صالحة.');
    }
    for (const [key, value] of Object.entries(data)) {
      const isKnownStateKey = PROFILE_DATA_KEYS.some(baseKey =>
        key === baseKey || key === `${profileId}_${baseKey}`
      );
      const isDailyQuestKey = key.startsWith(`triple_a_${profileId}_daily_quest_`) &&
        /^\d{4}-\d{2}-\d{2}$/.test(key.slice(`triple_a_${profileId}_daily_quest_`.length));
      if ((!isKnownStateKey && !isDailyQuestKey) || typeof value !== 'string') {
        throw new Error('تحتوي النسخة على بيانات غير معروفة أو غير صالحة.');
      }
    }
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
          createdAt: new Date().toISOString(),
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

  exportProgressBackup() {
    const profiles = this.getProfiles().map(profile => ({ ...profile }));
    const profileData = {};

    profiles.forEach(profile => {
      const data = {};
      PROFILE_DATA_KEYS.forEach(baseKey => {
        const key = getScopedKey(baseKey, profile.id);
        const value = localStorage.getItem(key);
        if (value !== null) data[key] = value;
      });

      const questPrefix = `triple_a_${profile.id}_daily_quest_`;
      for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        if (key?.startsWith(questPrefix)) {
          const value = localStorage.getItem(key);
          if (value !== null) data[key] = value;
        }
      }
      profileData[profile.id] = data;
    });

    return {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      activeProfileId: getActiveProfileId(),
      profiles,
      profileData
    };
  },

  importProgressBackup(backup) {
    validateProgressBackup(backup);
    const existingProfiles = this.getProfiles();
    const existingIds = new Set(existingProfiles.map(profile => profile.id));
    const idMap = new Map();
    const importedProfiles = [];

    backup.profiles.forEach(profile => {
      let newId;
      do {
        newId = `import_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      } while (existingIds.has(newId));
      existingIds.add(newId);
      idMap.set(profile.id, newId);
    });

    const writes = [];
    backup.profiles.forEach(profile => {
      const oldId = profile.id;
      const newId = idMap.get(oldId);
      const importedProfile = {
        id: newId,
        name: profile.name.trim(),
        avatar: profile.avatar || '👤',
        createdAt: profile.createdAt || new Date().toISOString(),
        ...(typeof profile.levelTag === 'string' ? { levelTag: profile.levelTag } : {})
      };
      const data = backup.profileData[oldId] || {};

      for (const [key, value] of Object.entries(data)) {
        let newKey;
        if (PROFILE_DATA_KEYS.includes(key)) {
          newKey = `${newId}_${key}`;
        } else if (PROFILE_DATA_KEYS.some(baseKey => key.startsWith(`${oldId}_${baseKey}`))) {
          newKey = `${newId}${key.slice(oldId.length)}`;
        } else {
          newKey = `triple_a_${newId}_daily_quest_${key.slice(`triple_a_${oldId}_daily_quest_`.length)}`;
        }
        writes.push([newKey, value]);
      }
      importedProfiles.push(importedProfile);
    });

    const mergedProfiles = [...existingProfiles, ...importedProfiles];
    const profileStorageKey = STORAGE_KEYS.PROFILES;
    const previousValues = new Map();
    writes.forEach(([key]) => previousValues.set(key, localStorage.getItem(key)));
    previousValues.set(profileStorageKey, localStorage.getItem(profileStorageKey));

    try {
      writes.forEach(([key, value]) => localStorage.setItem(key, value));
      localStorage.setItem(profileStorageKey, JSON.stringify(mergedProfiles));
    } catch (error) {
      for (const [key, value] of previousValues) {
        try {
          if (value === null) localStorage.removeItem(key);
          else localStorage.setItem(key, value);
        } catch (rollbackError) {
          console.error('Error rolling back imported progress:', rollbackError);
        }
      }
      throw new Error(`تعذر حفظ النسخة الاحتياطية في مساحة التخزين: ${error.message}`);
    }

    return { importedProfiles: importedProfiles.length, profiles: mergedProfiles };
  },

  replaceProgressBackup(backup) {
    validateProgressBackup(backup);
    const previousProfiles = this.getProfiles();
    const managedKeys = new Set([
      STORAGE_KEYS.PROFILES,
      STORAGE_KEYS.ACTIVE_PROFILE
    ]);
    previousProfiles.forEach(profile => {
      PROFILE_DATA_KEYS.forEach(baseKey => managedKeys.add(getScopedKey(baseKey, profile.id)));
      const questPrefix = `triple_a_${profile.id}_daily_quest_`;
      for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        if (key?.startsWith(questPrefix)) managedKeys.add(key);
      }
    });
    Object.keys(backup.profileData).forEach(profileId => {
      Object.keys(backup.profileData[profileId]).forEach(key => managedKeys.add(key));
    });
    const changedValues = new Map([...managedKeys].map(key => [key, localStorage.getItem(key)]));

    try {
      changedValues.forEach((_, key) => localStorage.removeItem(key));
      const profiles = backup.profiles.map(profile => ({
        id: profile.id,
        name: profile.name.trim(),
        avatar: profile.avatar || '👤',
        createdAt: profile.createdAt || new Date().toISOString(),
        ...(typeof profile.levelTag === 'string' ? { levelTag: profile.levelTag } : {})
      }));
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, backup.activeProfileId);
      Object.values(backup.profileData).forEach(data => {
        Object.entries(data).forEach(([key, value]) => localStorage.setItem(key, value));
      });
    } catch (error) {
      for (const [key, value] of changedValues) {
        try {
          if (value === null) localStorage.removeItem(key);
          else localStorage.setItem(key, value);
        } catch (rollbackError) {
          console.error('Error rolling back cloud progress restore:', rollbackError);
        }
      }
      throw new Error(`تعذر استعادة التقدم إلى هذا الجهاز: ${error.message}`);
    }

    return { profiles: backup.profiles.length, activeProfileId: backup.activeProfileId };
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
    return [...new Set([...getArray(getScopedKey(STORAGE_KEYS.NEEDS_REVIEW)), ...this.getDueReviewIds()])];
  },
  isNeedsReview(id) {
    return this.getNeedsReview().includes(id);
  },
  markNeedsReview(id) {
    const key = getScopedKey(STORAGE_KEYS.NEEDS_REVIEW);
    const list = getArray(key);
    if (!list.includes(id)) {
      list.push(id);
      setArray(key, list);
    }
    this.unmarkMastered(id);
  },
  removeNeedsReview(id) {
    const key = getScopedKey(STORAGE_KEYS.NEEDS_REVIEW);
    const list = getArray(key).filter(x => x !== id);
    setArray(key, list);
  },

  getReviewSchedules() {
    try {
      const raw = localStorage.getItem(getScopedKey(STORAGE_KEYS.REVIEW_SCHEDULES));
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error('Error reading review schedules from storage:', e);
      return {};
    }
  },
  getDueReviewIds() {
    const now = Date.now();
    return Object.entries(this.getReviewSchedules())
      .filter(([, schedule]) => Number.isFinite(Date.parse(schedule?.nextReviewAt)) && Date.parse(schedule.nextReviewAt) <= now)
      .map(([id]) => id);
  },
  recordReviewResult(id, isCorrect) {
    const key = getScopedKey(STORAGE_KEYS.REVIEW_SCHEDULES);
    const schedules = this.getReviewSchedules();
    const previous = schedules[id] || { repetitions: 0, intervalDays: 0 };
    const repetitions = isCorrect ? previous.repetitions + 1 : 0;
    const intervalDays = isCorrect
      ? (repetitions === 1 ? 1 : Math.min(60, Math.round(previous.intervalDays * 2.5)))
      : 1;
    const nextReviewAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString();
    const schedule = { repetitions, intervalDays, nextReviewAt };

    schedules[id] = schedule;
    try {
      localStorage.setItem(key, JSON.stringify(schedules));
    } catch (e) {
      console.error('Error saving review schedule:', e);
    }
    return schedule;
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

  addXP(amount, profileId = getActiveProfileId()) {
    const current = this.getXPForProfile(profileId);
    const next = current + amount;
    localStorage.setItem(getScopedKey(STORAGE_KEYS.USER_XP, profileId), next.toString());

    // تحديث شارة الـ XP في الـ Topbar فوراً في الـ DOM
    if (typeof document !== 'undefined' && profileId === getActiveProfileId()) {
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
  awardTandemConversationXP(profileId = getActiveProfileId()) {
    const key = getScopedKey(STORAGE_KEYS.TANDEM_DAILY_XP, profileId);
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    let state = { date: today, awarded: 0 };
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        if (saved.date === today && Number.isFinite(saved.awarded) && saved.awarded >= 0) {
          state = saved;
        }
      } catch (e) {
        console.error('Error reading daily conversation XP from storage:', e);
      }
    }

    const gained = Math.min(5, Math.max(0, 25 - state.awarded));
    if (gained === 0) {
      return { gained, earnedToday: state.awarded, dailyLimit: 25, totalXP: this.getXPForProfile(profileId) };
    }

    const nextState = { date: today, awarded: state.awarded + gained };
    try {
      localStorage.setItem(key, JSON.stringify(nextState));
    } catch (e) {
      console.error('Error saving daily conversation XP:', e);
      throw e;
    }

    let reward;
    try {
      reward = this.addXP(gained, profileId);
    } catch (e) {
      try {
        if (raw === null) localStorage.removeItem(key);
        else localStorage.setItem(key, raw);
      } catch (rollbackError) {
        console.error('Error rolling back daily conversation XP:', rollbackError);
      }
      throw e;
    }

    return { ...reward, earnedToday: nextState.awarded, dailyLimit: 25 };
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
  },

  getLearningProgress() {
    const key = getScopedKey(STORAGE_KEYS.LEARNING_PROGRESS);
    const empty = { placement: null, completedLessons: [], skills: {}, lessonSkills: {} };
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return empty;
      const progress = JSON.parse(raw);
      return {
        placement: progress?.placement || null,
        completedLessons: Array.isArray(progress?.completedLessons) ? progress.completedLessons : [],
        skills: progress?.skills && typeof progress.skills === 'object' ? progress.skills : {},
        lessonSkills: progress?.lessonSkills && typeof progress.lessonSkills === 'object' ? progress.lessonSkills : {}
      };
    } catch (error) {
      console.error('Error reading learning progress:', error);
      return empty;
    }
  },
  updateLearningProgress(update) {
    const key = getScopedKey(STORAGE_KEYS.LEARNING_PROGRESS);
    const previous = this.getLearningProgress();
    const next = update(previous);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.error('Error saving learning progress:', error);
      throw error;
    }
    return next;
  },
  savePlacementResult(result) {
    return this.updateLearningProgress(progress => ({ ...progress, placement: result }));
  },
  markLessonCompleted(lessonId) {
    return this.updateLearningProgress(progress => ({
      ...progress,
      completedLessons: [...new Set([...progress.completedLessons, lessonId])]
    }));
  },
  recordSkillPractice(skill, isCorrect = true, lessonId = null) {
    return this.updateLearningProgress(progress => {
      const previous = progress.skills[skill] || { attempts: 0, correct: 0 };
      const lessonSkills = { ...progress.lessonSkills };
      if (lessonId) {
        const lessonProgress = { ...(lessonSkills[lessonId] || {}) };
        const previousLessonSkill = lessonProgress[skill] || { attempts: 0, correct: 0 };
        lessonProgress[skill] = {
          attempts: previousLessonSkill.attempts + 1,
          correct: previousLessonSkill.correct + (isCorrect ? 1 : 0)
        };
        lessonSkills[lessonId] = lessonProgress;
      }
      return {
        ...progress,
        lessonSkills,
        skills: {
          ...progress.skills,
          [skill]: {
            attempts: previous.attempts + 1,
            correct: previous.correct + (isCorrect ? 1 : 0)
          }
        }
      };
    });
  }
};
