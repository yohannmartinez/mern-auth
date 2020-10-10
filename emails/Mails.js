const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

function registerEmail(email, checkTokenEmail) {
  transporter.sendMail({
    to: email,
    subject: "Spoots - Confirmation de création du compte",
    html: `<div style="text-align:center;background-color:white;display:block;padding:15px;margin:20px 20px;">
      <img src="https://spoots.s3.eu-west-3.amazonaws.com/logo.png"/>
      <p style="font-weight:700;font-size:12px;color:#292841;display:block">Bonjour,<br>Votre compte à bien été créé, pour finaliser l'inscription merci de confirmer votre adresse email en allant sur le lien ci-dessous</p>
      <a  href="http://localhost:3000/mailConfirm/${checkTokenEmail}" style="padding:7px 15px;display:inline-block;border-radius:5px;background-color:#292841;color:white;font-weight:700;text-decoration:none">Confirmer votre compte</a>
      <p style="font-weight:700;font-size:12px;color:#292841;display:block">Cordialement,
      <br>L'équipe Spoots</p>
      </div>`,

  });
}

function changeEmailAddressMail(oldEmail) {
  transporter.sendMail({
    to: oldEmail,
    subject: "Spoots - Changement d'adresse e-mail",
    html: `<div style="text-align:center;background-color:white;display:block;padding:15px;margin:20px 20px;">
      <img src="https://spoots.s3.eu-west-3.amazonaws.com/logo.png"/>
      <p style="font-weight:700;font-size:12px;color:#292841;display:block">
      Cher utilisteur,<br>
      L'adresse email de votre compte spoots à été changée le ${new Date().toLocaleDateString()}
      <br>Cordialement,
      <br>L'équipe Spoots
      </p>
      </div>`,
  });
}

function changePasswordMail(email) {
  transporter.sendMail({
    to: email,
    subject: "Spoots - Changement de mot de passe",
    html: `<div style="text-align:center;background-color:white;display:block;padding:15px;margin:20px 20px;">
    <img src="https://spoots.s3.eu-west-3.amazonaws.com/logo.png"/>
    <p style="font-weight:700;font-size:12px;color:#292841;display:block">Bonjour, 
    <br>Le mot de passe de votre compte spoots à été changée le ${new Date().toLocaleDateString()}
    <br>Cordialement,
    <br>L'équipe Spoots
    </p>
    </div>`,

  });
}


function forgotPassword(email, digit) {
  transporter.sendMail({
    to: email,
    subject: "Spoots - Voici votre code",
    html: `<div style="text-align:center;background-color:white;display:block;padding:15px;margin:20px 20px;">
      <img src="https://spoots.s3.eu-west-3.amazonaws.com/logo.png"/>
      <p style="font-weight:700;font-size:12px;color:#292841;display:block">Cher utilisateur, nous avons reçu une demande de réinitialisation<br>du mot de passe de votre compte Spoots</p>
      <p style="font-weight:700;font-size:20px;color:#292841;display:block;margin:20px 0">${digit}</p>
      <p style="font-weight:700;font-size:12px;color:#292841;display:block">Saisissez ce code pour terminer la réinisitialisation.</p>
      <p style="font-weight:700;font-size:12px;color:#292841;display:block">Merci de nous aider à préserver la sécurité de votre compte.<br>L'équipe Spoots</p>
      </div>`,
  });
}

module.exports = {
  changeEmailAddressMail,
  changePasswordMail,
  registerEmail,
  forgotPassword,
}