// محرك تجميع وإدارة بيانات المفردات لجميع المستويات (A1, A2, B1)
import { vocabA1 } from './vocab_a1.js';
import { vocabA2 } from './vocab_a2.js';
import { vocabB1 } from './vocab_b1.js';

export const allVocabulary = [
  ...vocabA1,
  ...vocabA2,
  ...vocabB1
];

export const vocabularyByLevel = {
  A1: vocabA1,
  A2: vocabA2,
  B1: vocabB1,
  ALL: allVocabulary
};

// استخراج كافة التصنيفات والموضوعات المتاحة لكل مستوى
export function getCategoriesForLevel(level = 'ALL') {
  const list = vocabularyByLevel[level] || allVocabulary;
  const categoriesMap = new Map();
  
  list.forEach(item => {
    if (item.category && item.categoryAr) {
      categoriesMap.set(item.category, item.categoryAr);
    }
  });

  return Array.from(categoriesMap.entries()).map(([key, label]) => ({
    key,
    label
  }));
}

// دالة لجلب كلمة عشوائية كـ "كلمة اليوم"
export function getWordOfTheDay() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % allVocabulary.length;
  return allVocabulary[index] || allVocabulary[0];
}
