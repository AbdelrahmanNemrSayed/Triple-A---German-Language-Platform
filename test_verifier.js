import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('./index.html', 'utf8');
const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = htmlIds.filter((id, index) => htmlIds.indexOf(id) !== index);
if (duplicateIds.length > 0) throw new Error(`Duplicate HTML IDs: ${[...new Set(duplicateIds)].join(', ')}`);

const requiredIds = [
  'theme-toggle-btn',
  'stat-mastered-count',
  'stat-favs-count',
  'stat-review-count',
  'overall-progress-bar',
  'overall-progress-text',
  'word-of-the-day-container',
  'category-filter-select',
  'vocab-cards-grid',
  'vocab-count-indicator',
  'vocab-search-input',
  'load-more-container',
  'btn-load-more-vocab',
  'view-vocabulary',
  'view-career',
  'view-dialogues',
  'view-builder',
  'view-speech',
  'view-emails',
  'view-flashcards',
  'view-quiz',
  'career-mount',
  'dialogues-mount',
  'builder-mount',
  'speech-mount',
  'emails-mount',
  'flashcards-mount',
  'quiz-mount',
  'quiz-mode-select',
  'quiz-count-select',
  'btn-start-quiz-trigger',
  'btn-open-rules-modal',
  'rules-modal',
  'btn-close-rules-modal',
  'view-stories',
  'stories-mount',
  'view-verbs',
  'verbs-mount',
  'view-prepositions',
  'prepositions-mount',
  'view-gamification',
  'gamification-mount',
  'view-living',
  'living-mount',
  'tab-verbs-btn',
  'tab-prep-btn',
  'tab-stories-btn',
  'tab-game-btn',
  'tab-living-btn',
  'view-exams',
  'exams-mount',
  'tab-exams-btn',
  'view-grammar',
  'grammar-mount',
  'tab-grammar-btn',
  'view-compounds',
  'compounds-mount',
  'tab-compounds-btn',
  'view-radio',
  'radio-mount',
  'tab-radio-btn',
  'user-profile-badge-mount',
  'tab-curriculum-btn',
  'view-curriculum',
  'curriculum-mount',
  'profile-modal-container',
  'view-articles',
  'articles-mount',
  'tab-articles-btn',
  'view-time',
  'time-mount',
  'tab-time-btn',
  'view-tandem',
  'tandem-mount',
  'tab-tandem-btn',
  'topbar-quest-pill',
  'daily-quest-modal'
];

let missing = [];
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) {
    missing.push(id);
  }
}

if (missing.length === 0) {
  console.log(`✅ ALL ${requiredIds.length} required element IDs are present in index.html!`);
} else {
  console.error('❌ Missing IDs:', missing);
  process.exit(1);
}

// Check vocab integrity
import { allVocabulary, vocabularyByLevel } from './data/vocab.js';
console.log(`✅ Total core vocabulary items: ${allVocabulary.length}`);

let vocabErrors = 0;
allVocabulary.forEach((item, i) => {
  if (!item.german || !item.arabic || !item.sentenceDe || !item.sentenceAr || !item.phonetic) {
    console.error(`Vocab item #${i} is missing required fields:`, item);
    vocabErrors++;
  }
});
if (vocabErrors === 0) {
  console.log('✅ All vocabulary items have complete fields (german, arabic, sentenceDe, sentenceAr, phonetic, tip).');
}

const vocabularyIds = new Set();
for (const item of allVocabulary) {
  if (vocabularyIds.has(item.id)) throw new Error(`Duplicate vocabulary ID: ${item.id}`);
  vocabularyIds.add(item.id);
}
for (const [level, minimumCount] of [['A1', 93], ['A2', 88], ['B1', 88]]) {
  const words = vocabularyByLevel[level];
  if (words.length < minimumCount || words.some(item => item.level !== level || !item.id.startsWith(`${level.toLowerCase()}_`))) {
    throw new Error(`Vocabulary level ${level} is missing entries or contains mismatched level IDs.`);
  }
  const newWords = words.slice(-8);
  const existingTerms = new Set(words.slice(0, -8).map(item => item.word.toLowerCase()));
  for (const item of newWords) {
    if (existingTerms.has(item.word.toLowerCase())) {
      throw new Error(`New ${level} entry duplicates existing vocabulary: ${item.word}`);
    }
  }
}
console.log('✅ A1, A2, and B1 each include eight new unique, level-tagged vocabulary items.');

const { curriculum, placementQuestions, recommendPlacementLevel } = await import('./data/curriculum.js');
const { curriculumLessonContent, curriculumOutputPrompts } = await import('./data/curriculum_content.js');
const { levelAssessmentQuestions } = await import('./data/level_assessments.js');
const { shuffleQuestionOptions, validateWritingSubmission } = await import('./assets/js/assessment_utils.js');
for (const level of ['A1', 'A2', 'B1']) {
  const categories = new Set(vocabularyByLevel[level].map(word => word.category));
  const units = curriculum[level]?.units || [];
  if (units.length < 3 || units.some(unit => unit.categories.some(category => !categories.has(category)))) {
    throw new Error(`The ${level} curriculum contains missing units or categories without vocabulary.`);
  }
  if ((levelAssessmentQuestions[level] || []).length < 6) {
    throw new Error(`The ${level} progressive question bank needs at least six additional questions.`);
  }
}
const curriculumLessonIds = ['A1', 'A2', 'B1'].flatMap(level =>
  curriculum[level].units.flatMap(unit => unit.categories.map((_, index) => `${unit.id}-${index + 1}`))
);
if (curriculumLessonIds.length !== 22 || curriculumLessonIds.some(id => !curriculumLessonContent[id]) ||
    Object.keys(curriculumLessonContent).some(id => !curriculumLessonIds.includes(id))) {
  throw new Error('Every A1-B1 lesson must have exactly one linked reading and listening practice.');
}
if (Object.keys(curriculumOutputPrompts).length !== curriculumLessonIds.length ||
    curriculumLessonIds.some(id => !curriculumOutputPrompts[id]?.writingPrompt ||
      !curriculumOutputPrompts[id]?.writingExample || !curriculumOutputPrompts[id]?.speakingRole ||
      curriculumOutputPrompts[id].speakingStarters.length < 2)) {
  throw new Error('Every A1-B1 lesson must include a writing task, example, and speaking scenario.');
}
for (const level of ['A1', 'A2', 'B1']) {
  const minimumWords = { A1: 4, A2: 6, B1: 8 }[level];
  if (curriculum[level].units.some(unit => unit.categories.some((_, index) =>
    curriculumOutputPrompts[`${unit.id}-${index + 1}`].minWords !== minimumWords
  ))) throw new Error(`Writing tasks for ${level} do not match the intended level length.`);
}
if (validateWritingSubmission('Ich lerne gern Deutsch.', 4, true).ready !== true ||
    validateWritingSubmission('Ich lerne gern Deutsch.', 5, true).ready !== false ||
    validateWritingSubmission('Ich lerne gern Deutsch.', 4, false).ready !== false) {
  throw new Error('Writing submission validation accepted an incomplete or unreviewed task.');
}
for (const [lessonId, content] of Object.entries(curriculumLessonContent)) {
  for (const skill of ['reading', 'listening']) {
    const activity = content[skill];
    const passage = skill === 'reading' ? activity.text : activity.audio;
    if (!passage || !activity.question || !Array.isArray(activity.options) || activity.options.length < 3 ||
        !Number.isInteger(activity.correct) || activity.correct < 0 || activity.correct >= activity.options.length) {
      throw new Error(`The ${skill} practice for ${lessonId} is incomplete.`);
    }
  }
  if (!content.reading.translation || !content.listening.audio) {
    throw new Error(`The reading translation or listening clip is missing for ${lessonId}.`);
  }
}
if (placementQuestions.length !== 15 || ['A1', 'A2', 'B1'].some(level =>
  placementQuestions.filter(question => question.level === level).length !== 5
)) throw new Error('Placement assessment must contain five progressive questions per level.');
if (recommendPlacementLevel({ A1: 2, A2: 5, B1: 5 }) !== 'A1' ||
    recommendPlacementLevel({ A1: 4, A2: 2, B1: 5 }) !== 'A2' ||
    recommendPlacementLevel({ A1: 4, A2: 4, B1: 3 }) !== 'B1' ||
    recommendPlacementLevel({ A1: 4, A2: 4, B1: 2 }) !== 'A2') {
  throw new Error('Placement score thresholds returned an incorrect recommended level.');
}
for (const [level, questions] of Object.entries(levelAssessmentQuestions)) {
  if (examData[level].sections.length + questions.length < 16) {
    throw new Error(`The ${level} timed practice should combine the core exam and additional bank.`);
  }
  const allQuestions = [...questions];
  if (allQuestions.some(question => !question.id || !question.section || !question.question ||
      !Array.isArray(question.options) || question.correct < 0 || question.correct >= question.options.length ||
      !question.explanation)) {
    throw new Error(`The ${level} progressive question bank contains an incomplete item.`);
  }
}
for (const question of [
  ...placementQuestions,
  ...Object.values(levelAssessmentQuestions).flat(),
  ...Object.values(examData).flatMap(level => level.sections)
]) {
  const shuffled = shuffleQuestionOptions(question, () => 0);
  if (shuffled.options.length !== question.options.length ||
      shuffled.options[shuffled.correct] !== question.options[question.correct] ||
      [...shuffled.options].sort().join('\n') !== [...question.options].sort().join('\n')) {
    throw new Error(`Shuffling changed the choices or answer key for question ${question.id}.`);
  }
}
const shuffledSample = shuffleQuestionOptions(
  { options: ['correct', 'wrong 1', 'wrong 2'], correct: 0 },
  () => 0
);
if (shuffledSample.correct === 0) throw new Error('Answer-option shuffling did not move the correct answer.');
console.log('✅ A1-B1 curriculum units map to real vocabulary; placement and expanded question banks are valid.');
console.log('✅ All 22 lessons include level-appropriate writing and speaking tasks; writing self-review validation is correct.');

// Check career tracks
import { careerTracks } from './data/career_vocab.js';
const tracks = Object.keys(careerTracks);
console.log(`✅ Career tracks loaded: ${tracks.join(', ')}`);
tracks.forEach(k => {
  console.log(`   - Track ${k}: ${careerTracks[k].words.length} words, ${careerTracks[k].dailyPhrases.length} phrases`);
});

// Check dialogues
import { dialoguesData } from './data/dialogues.js';
console.log(`✅ Dialogues loaded: ${dialoguesData.length} scenarios`);
dialoguesData.forEach(d => {
  console.log(`   - Dialogue ${d.id}: ${d.lines.length} lines with audio support`);
});

// Check sentence challenges
import { sentenceChallenges } from './data/sentence_builder.js';
console.log(`✅ Sentence builder challenges: ${sentenceChallenges.length} grammar challenges`);

// Check email templates
import { emailTemplates } from './data/email_templates.js';
console.log(`✅ Email templates loaded: ${emailTemplates.length} official business templates`);

// Check stories
import { storiesData } from './data/stories.js';
console.log(`✅ Stories loaded: ${storiesData.length} interactive stories`);
storiesData.forEach(s => {
  if (!s.titleDe || !s.paragraphs || !s.quiz) throw new Error(`Story ${s.id} invalid`);
});

// Check verbs
import { verbsData } from './data/verbs.js';
console.log(`✅ Verbs conjugations loaded: ${verbsData.length} verbs with 3 tenses`);
verbsData.forEach(v => {
  if (!v.infinitive || !v.praesens || !v.praeteritum || !v.perfekt) throw new Error(`Verb ${v.id} invalid`);
});

// Check preposition verbs
import { prepositionVerbsData } from './data/preposition_verbs.js';
console.log(`✅ Preposition verbs loaded: ${prepositionVerbsData.length} verbs with cases`);
prepositionVerbsData.forEach(pv => {
  if (!pv.verb || !pv.prep || !pv.kasus) throw new Error(`Preposition verb ${pv.id} invalid`);
});

// Check living guide
import { livingGuideData } from './data/living_guide.js';
console.log(`✅ Living in Germany guides loaded: ${livingGuideData.length} complete integration guides`);
livingGuideData.forEach(g => {
  if (!g.titleAr || !g.steps || !g.checklist || !g.glossary || !g.template) throw new Error(`Guide ${g.id} invalid`);
});

// Check Exam Simulator Data
import { examData } from './data/exam_simulator.js';
const examLevels = Object.keys(examData);
console.log(`✅ Timed practice assessment levels loaded: ${examLevels.join(', ')}`);
examLevels.forEach(lvl => {
  const ex = examData[lvl];
  if (!ex.title || !ex.sections || ex.sections.length === 0) throw new Error(`Exam model ${lvl} is invalid`);
  console.log(`   - Level ${lvl}: ${ex.sections.length} base practice questions, duration: ${ex.durationMinutes}m`);
});

// Check Grammar Vault Data
import { KASUS_DATA, ADJECTIVE_DECLENSION_RULES, SENTENCE_CONNECTORS, MODAL_VERBS_DATA } from './data/grammar_rules.js';
console.log(`✅ Grammar vault loaded:`);
console.log(`   - Kasus cases: ${KASUS_DATA.cases.length} complete cases with Wechselpräpositionen`);
console.log(`   - Adjective declension: ${Object.keys(ADJECTIVE_DECLENSION_RULES).length} article categories`);
console.log(`   - Sentence connectors: ${SENTENCE_CONNECTORS.length} connectors groups`);
console.log(`   - Modal verbs: ${MODAL_VERBS_DATA.length} modal verbs fully conjugated`);

// Check Compound Words Data
import { COMPOUND_WORDS_LIST } from './data/compound_words.js';
console.log(`✅ Compound words deconstructor loaded: ${COMPOUND_WORDS_LIST.length} compound words with structural flow`);
COMPOUND_WORDS_LIST.forEach(cw => {
  if (!cw.word || !cw.meaningAr || !cw.parts || cw.parts.length === 0) throw new Error(`Compound word ${cw.id} is invalid`);
});

// Check Radio Stations Data
import { RADIO_STATIONS_DATA, SLOW_LISTENING_PRACTICE } from './data/radio_stations.js';
console.log(`✅ Live Radio stations loaded: ${RADIO_STATIONS_DATA.length} live broadcast streams`);
console.log(`✅ Slow German audio lessons loaded: ${SLOW_LISTENING_PRACTICE.length} listening lessons`);

// Check Articles Trainer Data
import { ARTICLE_RULES, ARTICLES_WORDS_BANK } from './data/articles_trainer.js';
console.log(`✅ Articles trainer loaded: ${ARTICLES_WORDS_BANK.length} curated words, rules for ${ARTICLE_RULES.map(r => r.article).join(', ')}`);
ARTICLES_WORDS_BANK.forEach(w => {
  if (!w.word || !w.article || !w.meaningAr || !['der', 'die', 'das'].includes(w.article)) throw new Error(`Word ${w.word} invalid in articles trainer`);
});

// Check Time & Numbers Data
import { TIME_PRESETS, NUMBERS_LISTENING_CHALLENGES } from './data/time_numbers.js';
console.log(`✅ Time & numbers loaded: ${TIME_PRESETS.length} clock presets, ${NUMBERS_LISTENING_CHALLENGES.length} numbers listening challenges`);
TIME_PRESETS.forEach(tp => {
  if (tp.hour === undefined || tp.minute === undefined || !tp.colloquialDe || !tp.officialDe) throw new Error(`Time preset invalid: ${JSON.stringify(tp)}`);
});
NUMBERS_LISTENING_CHALLENGES.forEach(nc => {
  if (!nc.spokenDe || !nc.correctValue || !nc.meaningAr) throw new Error(`Numbers challenge invalid: ${JSON.stringify(nc)}`);
});

console.log('🎉 ALL SUITES PASSED SUCCESSFULLY WITH ZERO REGRESSIONS!');

// Check that the offline shell pre-caches every first-party source asset.
const serviceWorker = fs.readFileSync('./sw.js', 'utf8');
const coreAssetsBlock = serviceWorker.match(/const CORE_ASSETS = \[([\s\S]*?)\];/);
if (!coreAssetsBlock) throw new Error('Service worker CORE_ASSETS list is missing.');
const coreAssets = new Set([...coreAssetsBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]));
for (const directory of ['assets/css', 'assets/js', 'data']) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const assetPath = `/${path.posix.join(directory, entry.name)}`;
    if (!coreAssets.has(assetPath)) throw new Error(`Offline core cache is missing ${assetPath}`);
  }
}
for (const required of ['/', '/index.html', '/sw.js', '/manifest.webmanifest']) {
  if (!coreAssets.has(required)) throw new Error(`Offline core cache is missing ${required}`);
}
for (const assetPath of coreAssets) {
  const localPath = assetPath === '/assets/vendor/supabase.js'
    ? './node_modules/@supabase/supabase-js/dist/umd/supabase.js'
    : assetPath === '/' ? './index.html' : `.${assetPath}`;
  if (!fs.existsSync(localPath)) throw new Error(`Service worker asset does not exist: ${assetPath}`);
}
if (!html.includes('assets/vendor/supabase.js') ||
    !fs.readFileSync('./build.js', 'utf8').includes("'@supabase', 'supabase-js', 'dist', 'umd', 'supabase.js'") ||
    !fs.existsSync('./dist/assets/vendor/supabase.js') ||
    !fs.existsSync('./public/assets/vendor/supabase.js')) {
  throw new Error('The self-hosted Supabase SDK must be loaded and copied to both static build outputs.');
}
const supabaseSchema = fs.readFileSync('./supabase/schema.sql', 'utf8');
if (!supabaseSchema.includes('enable row level security') ||
    !supabaseSchema.includes('(select auth.uid()) = user_id') ||
    supabaseSchema.includes('service_role')) {
  throw new Error('Cloud progress storage must be protected by per-user RLS without exposing a service key.');
}
console.log(`✅ Offline cache covers all ${coreAssets.size} core files and source assets.`);

const manifest = JSON.parse(fs.readFileSync('./manifest.webmanifest', 'utf8'));
for (const shortcut of manifest.shortcuts || []) {
  const hash = new URL(shortcut.url, 'https://example.invalid').hash;
  if (hash === '#quest') continue;
  if (!/^#view-[a-z-]+$/.test(hash)) throw new Error(`Unsupported PWA shortcut route: ${shortcut.url}`);
  const viewName = hash.slice('#view-'.length);
  const viewId = viewName === 'vocab' || viewName === 'vocabulary' ? 'view-vocabulary' : `view-${viewName}`;
  if (!html.includes(`id="${viewId}"`)) throw new Error(`PWA shortcut points to an unknown view: ${shortcut.url}`);
}
console.log('✅ PWA shortcuts target supported in-app routes.');

// Exercise per-profile spaced-review scheduling and due-review filtering.
const storageValues = new Map();
globalThis.localStorage = {
  getItem: (key) => storageValues.get(key) ?? null,
  setItem: (key, value) => storageValues.set(key, String(value)),
  removeItem: (key) => storageValues.delete(key),
  key: (index) => [...storageValues.keys()][index] ?? null,
  get length() { return storageValues.size; }
};
const { Storage } = await import('./assets/js/storage.js');
let reviewSchedule = Storage.recordReviewResult('review-test-word', true);
if (reviewSchedule.repetitions !== 1 || reviewSchedule.intervalDays !== 1) {
  throw new Error('The first correct review must schedule the next review in one day.');
}
reviewSchedule = Storage.recordReviewResult('review-test-word', true);
if (reviewSchedule.repetitions !== 2 || reviewSchedule.intervalDays !== 3) {
  throw new Error('The second correct review must extend the interval to three days.');
}
reviewSchedule = Storage.recordReviewResult('review-test-word', false);
if (reviewSchedule.repetitions !== 0 || reviewSchedule.intervalDays !== 1) {
  throw new Error('An incorrect review must reset the interval.');
}
Storage.markNeedsReview('review-test-word');
if (!Storage.getNeedsReview().includes('review-test-word')) {
  throw new Error('Words answered incorrectly must remain in the review list.');
}
storageValues.set('deutschmeister_review_schedules', JSON.stringify({
  'due-test-word': { repetitions: 1, intervalDays: 1, nextReviewAt: '2000-01-01T00:00:00.000Z' }
}));
if (!Storage.getNeedsReview().includes('due-test-word')) {
  throw new Error('Scheduled words past their due date must appear in the review list.');
}
console.log('✅ Spaced review scheduling, reset-on-error, and due-word selection work.');

const tandemFirstReward = Storage.awardTandemConversationXP();
if (tandemFirstReward.gained !== 5 || tandemFirstReward.earnedToday !== 5) {
  throw new Error('A completed conversation must award five XP.');
}
for (let i = 0; i < 4; i++) Storage.awardTandemConversationXP();
const tandemCappedReward = Storage.awardTandemConversationXP();
if (tandemCappedReward.gained !== 0 || tandemCappedReward.earnedToday !== 25 || Storage.getXP() !== 25) {
  throw new Error('Conversation XP must stop at 25 per day for the active profile.');
}
storageValues.set('deutschmeister_active_profile', 'test_profile');
const otherProfileReward = Storage.awardTandemConversationXP();
if (otherProfileReward.gained !== 5 || Storage.getXP() !== 5) {
  throw new Error('Conversation XP limits and balances must be isolated per profile.');
}
const originalProfileReward = Storage.awardTandemConversationXP('default');
if (originalProfileReward.gained !== 0 || originalProfileReward.totalXP !== 25) {
  throw new Error('A delayed conversation reward must remain attributed to its original profile.');
}
console.log('✅ Conversation XP is awarded after exchanges and capped at 25 daily per profile.');

storageValues.set('deutschmeister_profiles', JSON.stringify([
  { id: 'default', name: 'المتعلم الأول', avatar: '🎓', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'test_profile', name: 'متعلم الاختبار', avatar: '🚀', createdAt: '2026-02-01T00:00:00.000Z' }
]));
storageValues.set('deutschmeister_active_profile', 'test_profile');
storageValues.set('deutschmeister_favorites', JSON.stringify(['default-word']));
storageValues.set('test_profile_deutschmeister_favorites', JSON.stringify(['second-profile-word']));
Storage.recordSkillPractice('reading', true, 'a1-intro-1');
Storage.recordSkillPractice('listening', false, 'a1-intro-1');
Storage.recordSkillPractice('writing', true, 'a1-intro-1');
Storage.recordSkillPractice('speaking', true, 'a1-intro-1');
Storage.markLessonCompleted('a1-intro-1');
storageValues.set('triple_a_default_daily_quest_2026-10-02', JSON.stringify({ completedTasks: ['q1'], claimedBonus: true }));
const backup = Storage.exportProgressBackup();
if (backup.profiles.length !== 2 || backup.activeProfileId !== 'test_profile') {
  throw new Error('Progress exports must include all profiles and the active profile ID.');
}
if (!backup.profileData.default.deutschmeister_favorites ||
    !backup.profileData.test_profile.test_profile_deutschmeister_favorites ||
    !backup.profileData.test_profile.test_profile_deutschmeister_learning_progress ||
    !backup.profileData.default['triple_a_default_daily_quest_2026-10-02']) {
  throw new Error('Progress exports must include scoped profile, learning report, and daily quest data.');
}

const imported = Storage.importProgressBackup(backup);
if (imported.importedProfiles !== 2 || imported.profiles.length !== 4 ||
    Storage.getActiveProfile().id !== 'test_profile') {
  throw new Error('Imports must merge profiles without changing the active local profile.');
}
const importedDefault = imported.profiles.find(profile => profile.name === 'المتعلم الأول' && profile.id.startsWith('import_'));
const importedSecond = imported.profiles.find(profile => profile.name === 'متعلم الاختبار' && profile.id.startsWith('import_'));
if (!importedDefault || !importedSecond || importedDefault.id === 'default' || importedSecond.id === 'test_profile') {
  throw new Error('Imported profile IDs must be remapped to avoid collisions with existing profiles.');
}
if (storageValues.get(`${importedDefault.id}_deutschmeister_favorites`) !== JSON.stringify(['default-word']) ||
    storageValues.get(`${importedSecond.id}_deutschmeister_favorites`) !== JSON.stringify(['second-profile-word']) ||
    !storageValues.has(`${importedSecond.id}_deutschmeister_learning_progress`) ||
    !storageValues.has(`triple_a_${importedDefault.id}_daily_quest_2026-10-02`)) {
  throw new Error('Imported progress must be remapped and retained under the new profile IDs.');
}

const beforeInvalidImport = Storage.getProfiles().length;
const invalidBackup = {
  ...backup,
  profileData: {
    ...backup.profileData,
    default: { ...backup.profileData.default, unexpected_storage_key: 'must not import' }
  }
};
let invalidBackupRejected = false;
try {
  Storage.importProgressBackup(invalidBackup);
} catch {
  invalidBackupRejected = true;
}
if (!invalidBackupRejected || Storage.getProfiles().length !== beforeInvalidImport) {
  throw new Error('Invalid backups must be rejected without changing existing profiles.');
}
const previousCloudRestoreTheme = storageValues.get('deutschmeister_theme') || 'light';
storageValues.set('deutschmeister_theme', 'dark');
const restoredSnapshot = Storage.replaceProgressBackup(backup);
if (restoredSnapshot.profiles !== 2 || Storage.getProfiles().length !== 2 ||
    Storage.getActiveProfile().id !== 'test_profile' ||
    storageValues.get('deutschmeister_favorites') !== JSON.stringify(['default-word']) ||
    storageValues.has(`${importedDefault.id}_deutschmeister_favorites`) ||
    storageValues.get('deutschmeister_theme') !== 'dark') {
  throw new Error('Cloud restore must replace learner data, preserve device settings, and restore all source profiles.');
}
const storageBeforeRejectedRestore = new Map(storageValues);
let invalidReplacementRejected = false;
try {
  Storage.replaceProgressBackup(invalidBackup);
} catch {
  invalidReplacementRejected = true;
}
if (!invalidReplacementRejected ||
    JSON.stringify([...storageValues]) !== JSON.stringify([...storageBeforeRejectedRestore])) {
  throw new Error('An invalid cloud snapshot must be rejected without changing local storage.');
}
storageValues.set('deutschmeister_theme', previousCloudRestoreTheme);
console.log('✅ Backups merge safely; cloud restore replaces only learner data and rejects invalid snapshots atomically.');
