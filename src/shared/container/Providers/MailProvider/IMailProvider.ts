interface IMailProvider {
  sendMail(to: string, subject: string, variables: any, path_template: string): Promise<void>;
}

export { IMailProvider };
