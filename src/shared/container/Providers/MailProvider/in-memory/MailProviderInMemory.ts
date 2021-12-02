import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private messages: any[] = [];

  async sendMail(to: string, subject: string, variables: any, path_template: string): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      path_template,
    })
  }
}

export { MailProviderInMemory };