let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };


exports.originDefaultOwner =  function () { return defaultOwnerData; }
exports.defaultOwner = function () { return Object.assign({}, defaultOwnerData); }
exports.setDefaultOwner = function (arg) { defaultOwnerData = arg; }