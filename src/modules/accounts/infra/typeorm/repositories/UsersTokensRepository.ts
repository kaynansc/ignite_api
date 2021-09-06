import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;
  
  constructor() { 
    this.repository = getRepository(UserTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };