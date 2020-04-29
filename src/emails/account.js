const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail=async function(name,email,message=''){
  try {
    await sgMail.send({
      to: `${email}`,
      from: 'rakeshkusrivastav@gmail.com',
      subject: 'Thanks for joining in!',
      text:`Welcome to the app ,${name} let me know how you get along with the app ,${message}`,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    });
    console.log("send")
  } catch (error) {
   console.log(error) 
  }
}


module.exports={
  sendWelcomeEmail
}