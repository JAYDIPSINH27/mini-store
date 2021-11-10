const nodemailer = require('nodemailer');

const requestPasswordTemplate = (name,link) => (
    `<h3>Hi ${name.toUpperCase()}</h3>
    <p>You have requested to reset your password.</p>
    <p>Kindly click on the link below to reset your password.</p>
    <p>If you did not perform this action, please ignore this meassage.</p>
    <a href="${link}">Reset Password</a>`
)

const welcomeTemplate = (name,link) => (
    `<h3>Welcome ${name.toUpperCase()}</h3>
    <p>We are glad to have you at Mini-Store.</p>
    <p>There is one last thing we need before you can get started.</p>
    <a href="${link}">Verify Email</a>
    <p>Enjoy your stay here.</p>`
)

const activationTemplate = (name) => (
    `<h3>Welcome ${name.toUpperCase()}</h3>
    <p>We are glad to have you at Mini-Store.</p>
	<p>Your account has already been activated. You can now login.</p>
    <p>Enjoy your stay here.</p>`
)

const resetPasswordTemplate = (name) => (
    `<h3>Hi ${name.toUpperCase()}</h3>
    <p>Your password has been successfully reset.</p>
    <p>Thank you for your patience.</p>`
)

const sendEmail = async (recipient,subject,html) => {

    try {

        const transporter = await nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        }) 
      
        const mailOptions = {
            from: `"Mini-Store" <${process.env.EMAIL_USER}>`,
            to: recipient.email,
            subject: subject,
            html: html
        };
      
        const results = await transporter.sendMail(mailOptions)
        if (results.rejected.length == 0 && results.response.startsWith("250 2.0.0 OK")) {
            return true
        }
        return false
        
    }catch(err){
        return false
    }
}

const sendWelcomeEmail = async (recipient,link) => {
    let resp = await sendEmail(recipient,'Successful Registration at Mini-Store',welcomeTemplate(recipient.user,link))
    console.log(resp);
    if(resp){
        return true
    }
    return false
}

const sendActivationEmail = async (recipient) => {
    let resp = await sendEmail(recipient,'Successful Registration at Mini-Store',activationTemplate(recipient.user))
    console.log(resp);
    if(resp){
        return true
    }
    return false
}

const sendRequestPasswordEmail = async (recipient,link) => {
    let resp = await sendEmail(recipient,'Request for password change at Mini-Store',requestPasswordTemplate(recipient.user,link))
    if(resp){
        return true
    }
    return false
}

const sendResetPasswordEmail = async (recipient) => {
    let resp = await sendEmail(recipient,'Successful password reset at Mini-Store',resetPasswordTemplate(recipient.user))
    if(resp){
        return true
    }
    return false
}

module.exports = {sendWelcomeEmail,sendActivationEmail,sendRequestPasswordEmail,sendResetPasswordEmail}