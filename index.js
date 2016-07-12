const parse = require('path-to-regexp');

function decode(val) {
  if (val) return decodeURIComponent(val);
}

module.exports = function(path, fn) {
  const re = parse(path, {
    end: false,
  });

  return function* (next) {
    const match = re.exec(this.path);
    if (!match) {
      return yield* next;
    }
    const args = match.slice(1).map(decode);
    args.push(next);
    yield* fn.apply(this, args);
  }
};
