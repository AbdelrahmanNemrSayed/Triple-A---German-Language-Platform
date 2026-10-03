export function shuffleQuestionOptions(question, random = Math.random) {
  const options = question.options.map((text, index) => ({
    text,
    correct: index === question.correct
  }));

  for (let index = options.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
  }

  return {
    ...question,
    options: options.map(option => option.text),
    correct: options.findIndex(option => option.correct)
  };
}

export function validateWritingSubmission(text, minimumWords, selfReviewed) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return {
    wordCount,
    ready: wordCount >= minimumWords && selfReviewed
  };
}
