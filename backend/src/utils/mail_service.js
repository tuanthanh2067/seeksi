const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendMail = (to, subject, text, html) => {
  const msg = {
    to: to, // Change to your recipient
    from: "seeksidating@gmail.com", // Change to your verified sender
    subject: subject,
    text: text,
    html: html,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error("Error with sendgrid mail service", error);
    });
};
