const generateUniqueId = function (prefix = "") {
  let id = 0;

  return function () {
    return `${prefix}${++id}`;
  };
};

module.exports = generateUniqueId;
