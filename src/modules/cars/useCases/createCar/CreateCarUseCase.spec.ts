import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Test",
      brand: "brand",
      category_id: "12321321",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with license plate exists", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      brand: "brand",
      category_id: "12321321",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });
    
    await expect(createCarUseCase.execute({
        name: "Car 2",
        brand: "brand",
        category_id: "12321321",
        daily_rate: 100,
        description: "Description Car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      })).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 2",
      brand: "brand",
      category_id: "12321321",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car.available).toBe(true);
  });
});
