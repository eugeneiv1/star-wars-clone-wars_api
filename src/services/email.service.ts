import { createTransport } from "nodemailer";
import { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

import { configs } from "../configs/configs";
import { emailTemplate } from "../constants/email-action.constant";
import { EEmailAction } from "../enums/email-action.enum";

class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: configs.SMTP_USER,
        pass: configs.SMTP_PASSWORD,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async sendMail(
    email: string,
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    const { subject, templateName } = emailTemplate[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
