import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able add new specification at the car", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Car 1",
        brand: "brand",
        category_id: "12321321",
        daily_rate: 100,
        description: "Description Car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });

      const specifications_id = ["31232312"];

      await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able add new specification at the non-existent car", async () => {
    expect(async () => {
      const car_id = "123124";
      const specifications_id = ["31232312"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
