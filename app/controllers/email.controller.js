const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Please confirm your account",
      html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MDT Group</a>
                    </div>
                    <p style="font-size:1.1em">Hi,${name}</p>
                    <p>Thank you for subscribing to MDT. Use the following OTP to complete your Sign Up procedures.</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${confirmationCode}</h2>
                    <p style="font-size:0.9em;">Regards,<br />MDT Group</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>http://mdtgroup.in</p>
                    </div>
                </div>
            </div>
          `,
    })
    .catch((err) => console.log(err));
};
