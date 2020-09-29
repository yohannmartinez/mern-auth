const Validator = require("validator");
const isEmpty = require("is-empty");
const { default: validator } = require("validator");

module.exports = function validateChangePassword(data) {
  let errors = {};


  // Convert empty fields to an empty string so we can use validator functions
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";


  
  // New passsword checks
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "Veuillez entrer un nouveau mot de passe";
  } else if (data.newPassword.length < 8) {
    errors.newPassword = "Votre mot de passe doit contenir au moins 8 caractères";
  }
  // Confirm passsword checks
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Veuillez confirmer le mot de passe";
  } else if (data.confirmPassword !== data.newPassword) {
    errors.confirmPassword = "Les mot de passe ne correspondent pas";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
