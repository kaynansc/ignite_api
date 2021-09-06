import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({expires_date, refresh_token, user_id}: ICreateUserTokensDTO):Promise<UserTokens>;
}

export { IUsersTokensRepository };