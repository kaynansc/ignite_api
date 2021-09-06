import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/Providers/DataProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    password: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const { expires_in_token, secret_refesh_token, secret_token, expires_in_refresh_token, expires_in_refresh_token_days } = auth;

    if (!user) {
      throw new AppError("Email or password invalid!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password invalid!");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });
    
    const refresh_token = sign({ email }, secret_refesh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })

    const expires_date_refresh_token = this.dateProvider.addDays(expires_in_refresh_token_days);

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: expires_date_refresh_token, 
    })

    return {
      user: {
        name: user.name,
        password: user.password,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
