import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/Providers/DataProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHourToRent = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is not available");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's rental in progress for user!");
    }

    const dateNow = this.dateProvider.getDateNow();

    const compareHours = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareHours < minimumHourToRent) {
      throw new AppError("Invalid return time!");
    };

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  };
};

export { CreateRentalUseCase };
