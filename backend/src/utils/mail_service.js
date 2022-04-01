const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sendMail: (to, subject, text, html) => {
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
  },
  sendPasswordResetMail: async (requester, token) => {
    try {
      const data = {
        to: requester.email,
        from: process.env.SENDGRID_EMAIL,
        templateId: process.env.PASSWORD_RESET_TEMPLATE_ID,
        dynamicTemplateData: {
          recipient_name: `${requester.firstName} ${requester.lastName}`,
          password_reset_token: token,
          user_id: requester._id,
        },
      };

      await sgMail.send(data);
    } catch (err) {
      throw err;
    }
  },
  sendDeactivateAccountMail: async (recipient) => {
    try {
      const data = {
        to: recipient.email,
        from: process.env.SENDGRID_EMAIL,
        templateId: process.env.ACCOUNT_DEACTIVATION_TEMPLATE_ID,
        dynamicTemplateData: {
          recipient_name: `${recipient.firstName} ${recipient.lastName}`,
        },
      };

      await sgMail.send(data);
    } catch (err) {
      throw err;
    }
  },
};
