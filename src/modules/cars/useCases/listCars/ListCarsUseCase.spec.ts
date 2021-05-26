import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "Audi",
      category_id: "434d6b44-a11b-402a-80e2-f0fd3c48eb40",
      daily_rate: 100,
      description: "Carro Topper",
      fine_amount: 60,
      license_plate: "ABC-123465",
    });

    const cars = await listCarsUseCase.execute({});

    console.log(`teste ${cars}`);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name Test",
      brand: "Audi",
      category_id: "434d6b44-a11b-402a-80e2-f0fd3c48eb40",
      daily_rate: 100,
      description: "Carro Topper",
      fine_amount: 60,
      license_plate: "ABC-123465",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car1",
    });

    expect(cars).toEqual([car]);
  });
});
