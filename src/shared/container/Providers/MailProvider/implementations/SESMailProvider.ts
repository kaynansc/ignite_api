import nodemailer, { Transporter } from "nodemailer";
import { SES } from "aws-sdk";
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import fs from "fs";
import handlebars from "handlebars";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      })
    })
  }

  async sendMail(to: string, subject: string, variables: any, path_template: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path_template).toString("utf-8")

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <kaynansc@gmail.com>',
      subject,
      html: templateHTML,
    })
  }
}

export { SESMailProvider };
