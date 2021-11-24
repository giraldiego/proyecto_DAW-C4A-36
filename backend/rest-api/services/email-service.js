require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(email) {
  // Read params from email
  const { recipient, subject, emailBody } = email;

  const msg = {
    to: recipient, // Change to your recipient
    from: process.env.SENDGRID_VERIFIED_SENDER, // Change to your verified sender
    subject: subject,
    text: emailBody,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log('email sent');
    //   res.json({ message: 'Email sent' });
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    //   res.status(400).json({ message: error.message });
    });
}

module.exports = sendEmail;
