const validator = require("validator");
const isEmpty = require("./empty");
const Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[@$!%?&])(?=.*[A-Z]).{8,}/;
const Regex1 = /(?=.*[ ])/;
module.exports = function SignupValidation(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Name checks
  if (validator.isEmpty(data.firstname)) {
    errors.firstname = " first Name field is required";
  }
  if (validator.isEmpty(data.lastname)) {
    errors.lastname = " Second Name field is required";
  }
  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Format Email required";
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Regex.test(data.password) || Regex1.test(data.password)) {
    errors.password =
      "Password should have 1 lowercase letter, 1 uppercase letter,1 special character,  1 number, and be at least 8 characters long";
  }
  // console.log(!Regex.test(data.password))
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
