const Validator = require("validator");
const isEmpty = require("is-empty");
const { default: validator } = require("validator");

module.exports = function validateChangeEmail(data) {
  let errors = {};


  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.confirmEmail = !isEmpty(data.confirmEmail) ? data.confirmEmail : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Veuillez indiquer une adresse e-mail";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Veuillez indiquer une adresse e-mail valide";
  }
  // Confirm email checks
  if (Validator.isEmpty(data.confirmEmail)) {
    errors.confirmEmail = "Veuillez confirmer l'adresse e-mail";
  } else if (data.confirmEmail !== data.email) {
    errors.confirmEmail = "Les adresses e-mail ne correspondent pas";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
