/**
 * Capitalizes words.
 *
 * @param  {String} words
 * @return {String}
 */
export const capitalizeWords = words => {
  return words.split(' ').reduce((accumulatedWords, word) => {
    return `${accumulatedWords} ${word[0].toUpperCase() + word.slice(1)}`;
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
