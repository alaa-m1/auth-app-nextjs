import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

export default async function sendCustomEmail(
  to: string,
  name: string,
  image: string,
  activationLink: string,
  subject: string,
  template: string
) {
  const {
    MAILING_EMAIL,
    MAILING_PASSWORD,
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_PORT,
  } = process.env;

  let transport = await nodemailer.createTransport({
    // port: Number(SMTP_PORT),
    // host: SMTP_HOST,
    // auth: {
    //   user: SMTP_EMAIL,
    //   pass: SMTP_PASSWORD,
    // },

    /////OR

    service: "gmail",
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
    },
  });

  const templateData = handlebars.compile(template);
  const replacementVariables = {
    user_name: name,
    activation_link: activationLink,
  };
  const html = templateData(replacementVariables);

  // verify the connection
  await new Promise((resolve, reject) => {
    transport.verify((error, success) => {
      if (error) {
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

  //   send the activation email
  const options = {
    from: MAILING_EMAIL,
    to,
    subject,
    html,
  };
  await new Promise((resolve, reject) => {
    transport.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
