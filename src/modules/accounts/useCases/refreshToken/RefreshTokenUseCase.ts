import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/Providers/DataProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { sub: user_id, email } = verify(token, auth.secret_refesh_token) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError("User Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refesh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    })

    const expires_date = this.dateProvider.addDays(auth.expires_in_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id: user_id,
      refresh_token,
      expires_date, 
    })

    return refresh_token;
  }

}

export { RefreshTokenUseCase };