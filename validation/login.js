const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Veuillez entrer une adresse email";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Veuillez entrer une adresse email valide";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Mot de passe incorrect";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
