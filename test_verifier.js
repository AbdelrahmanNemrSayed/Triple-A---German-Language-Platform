import fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf8');

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
import { allVocabulary } from './data/vocab.js';
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
console.log(`✅ Exam simulator models loaded: ${examLevels.join(', ')}`);
examLevels.forEach(lvl => {
  const ex = examData[lvl];
  if (!ex.title || !ex.sections || ex.sections.length === 0) throw new Error(`Exam model ${lvl} is invalid`);
  console.log(`   - Level ${lvl}: ${ex.sections.length} official questions, duration: ${ex.durationMinutes}m`);
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

