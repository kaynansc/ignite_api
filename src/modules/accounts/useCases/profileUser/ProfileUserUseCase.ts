import { IProfileUserResponseDTO } from "@modules/accounts/dtos/IProfileUserResponseDTO";
import { UserMapper } from "@modules/accounts/mappers/UserMapper";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: string): Promise<IProfileUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMapper.toDTO(user);
  }
}