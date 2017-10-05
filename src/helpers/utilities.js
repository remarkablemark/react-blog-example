/**
 * Capitalizes string.
 *
 * @param  {String} string
 * @return {String}
 */
const capitalize = string => {
  if (!string) return string;
  return string[0].toUpperCase() + string.slice(1);
};

/**
 * Capitalizes words.
 *
 * @param  {String} words
 * @return {String}
 */
export const capitalizeWords = words => {
  const wordsArray = words.split(' ');

  // single word
  if (wordsArray.length === 1) {
    return capitalize(words);
  }

  // multiple words
  return wordsArray.reduce((accumulatedWords, word) => {
    // first word
    if (!accumulatedWords) return capitalize(word);

    // empty array item
    if (!word) return accumulatedWords;

    // concatenate word
    return `${accumulatedWords} ${capitalize(word)}`;
  }, '');
};

let fullYear;

/**
 * Gets full year.
 *
 * @return {Number}
 */
export const getFullYear = () => {
  if (!fullYear) {
    fullYear = new Date().getFullYear();
  }
  return fullYear;
};

/**
 * Truncates text.
 *
 * @param  {String} text
 * @param  {Number} [limit]
 * @return {String}
 */
export const truncate = (text, limit) => {
  if (typeof text !== 'string') return '';

  if (text.length > limit) {
    // truncate string based on limit
    text = text.substring(0, limit);
  }

  // truncate to last whitespace if applicable
  const lastSpaceIndex = text.lastIndexOf(' ');
  if (lastSpaceIndex !== -1) {
    text = text.substring(0, lastSpaceIndex);
  }

  // trim trailing whitespace/periods
  return text.replace(/[\s.]+$/g, '');
};
