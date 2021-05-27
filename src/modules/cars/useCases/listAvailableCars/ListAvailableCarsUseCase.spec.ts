import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

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

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car Name Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name Test",
      brand: "Audi",
      category_id: "434d6b44-a11b-402a-80e2-f0fd3c48eb40",
      daily_rate: 100,
      description: "Carro Topper",
      fine_amount: 60,
      license_plate: "ABC-123465",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "434d6b44-a11b-402a-80e2-f0fd3c48eb40",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name Test",
      brand: "Brand Test",
      category_id: "434d6b44-a11b-402a-80e2-f0fd3c48eb40",
      daily_rate: 100,
      description: "Carro Topper",
      fine_amount: 60,
      license_plate: "ABC-123465",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand Test",
    });

    expect(cars).toEqual([car]);
  });
});
