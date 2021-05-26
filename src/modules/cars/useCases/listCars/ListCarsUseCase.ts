import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, category_id, name);

    return cars;
  }
}

export { ListCarsUseCase };
