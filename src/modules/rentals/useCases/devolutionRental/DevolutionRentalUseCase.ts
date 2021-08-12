import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/Providers/DataProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
  id: string;
};

class DevolutionRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {};

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const mimimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental is not exists!");;
    };

    const dateNow = this.dateProvider.getDateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow,
    );
    
    if (daily <= 0) {
      daily = mimimum_daily;
    };

    let total = daily * car.daily_rate;

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total += calculate_fine;
    };

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  };
}

export { DevolutionRentalUseCase };