import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/Providers/DataProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/Providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot email", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  })

  it("should be able to send email to forgot password mail to user", async () => {
    const sendEmail = spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: 'AAAA3121',
      email: "test@test.com",
      name: "test",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("test@test.com");

    expect(sendEmail).toHaveBeenCalled();
  })

  it("should not be able to send email does user not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("test@test.com")).rejects.toEqual(new AppError("User does not exists!"))
  })
})
