const increment_alphanumeric_str = (str) => {
  var numeric = str.match(/\d+$/)[0];
  var prefix = str.split(numeric)[0];

  function increment_string_num(str) {
    var inc = String(parseInt(str) + 1);
    return str.slice(0, str.length - inc.length) + inc;
  }

  return prefix + increment_string_num(numeric);
};

module.exports = { increment_alphanumeric_str };
