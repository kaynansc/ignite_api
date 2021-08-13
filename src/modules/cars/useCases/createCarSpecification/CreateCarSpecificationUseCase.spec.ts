import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able add new specification at the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      brand: "brand",
      category_id: "12321321",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });

  it("should not be able add new specification at the non-existent car", async () => {
    const car_id = "123124";
    const specifications_id = ["31232312"];
    
    await expect(createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })).rejects.toEqual(new AppError("Car does not exists!"));
  });
});
