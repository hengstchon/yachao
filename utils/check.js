function isValidPhone(str) {
  var myreg = /^[0-9]+$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  isValidPhone
};
