import { instanceToInstance } from "class-transformer";
import { IProfileUserResponseDTO } from "@modules/accounts/dtos/IProfileUserResponseDTO";

export class UserMapper {
  static toDTO({
    avatar,
    driver_license,
    email,
    id,
    name,
    avatar_url
  }: IProfileUserResponseDTO) {
    const user = instanceToInstance({
      avatar,
      driver_license,
      email,
      id,
      name,
      avatar_url
    })

    return user;
  }
};