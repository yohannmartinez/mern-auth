const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Nom d'utilisateur requis";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Adresse Email requise";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Adresse Email invalide";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Mot de passe requis";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Veuillez confirmer le mot de passe";
  }

  if (!Validator.isLength(data.password, { min: 9, max: 30 })) {
    errors.password = "incorect : 9 caractères minimum";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Les mots de passe ne se correspondent pas";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
