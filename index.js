/**
 * Module Dependencies
 */

var strtojs = require('string-to-js');

/**
 * Export `string-to-js`
 */

module.exports = plugin;

/**
 * Initialize `plugin`
 *
 * @param {Object} file
 * @param {Object} entry
 */

function plugin() {
  return function stoj(file, entry) {
    if ('js' != entry.type) return;
    if ('js' == file.type) return;

    if ('json' == file.type) {
      if (validateJSON(file.src)) {
        file.src = 'module.exports = ' + file.src + ';';
      } else {
        throw new SyntaxError('invalid json format');
      }
    } else {
      file.src = strtojs(file.src);
    }

    file.type = 'js';
  }
}

/**
 * validate JSON
 *
 * @param {String} str
 * @return {Boolean}
 * @api private
 */

function validateJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}
