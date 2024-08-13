import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/models/userModels";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //generate hash token first
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //find and update user with the token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }


    //FOR GOOGLE MAIL
    // //create a transporter with nodemailer
    // const transport = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   auth: {
    //     user: "YOUR EMAIL",
    //     pass: "YOUR PASSWORD",
    //   },
    // });


    //FOR MAIL TRAP
    //create a transporter with nodemailer
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    });

    //create mail options
    const mailOptions = {
      from: "femmytedrey01@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      //   text: "Hello world?",
      html: `<p>Click <a href="${
        emailType === "VERIFY"
          ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
          : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`
      }">here</a>to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and past the link below in your browser. <br> ${
        emailType === "VERIFY"
          ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
          : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`
      }</p>`,
    };

    //send the email with mailOptions
    const mailRespone = await transport.sendMail(mailOptions);
    return mailRespone;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
