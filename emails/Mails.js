const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mispotsinc@gmail.com",
    pass: "u2315125o"
  }
});

function changeEmailAddressMail(oldEmail) {
  transporter.sendMail({
    to: oldEmail,
    subject: "MiSpots - Changement d'adresse e-mail",
    html: `<div style="text-align:center">
      
      <p>Votre adresse mail à été changée le ${new Date().toLocaleDateString()}</p><br/>
      </div>`,

  });
}

function changePasswordMail(email) {
  transporter.sendMail({
    to: email,
    subject: "MiSpots - Changement de mot de passe",
    html: `<div style="text-align:center">
      
      <p>Votre mot de passe à été changée le ${new Date().toLocaleDateString()}</p><br/>
      </div>`,

  });
}

module.exports = {
  changeEmailAddressMail,
  changePasswordMail
}