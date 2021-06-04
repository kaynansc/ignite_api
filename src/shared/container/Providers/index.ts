import { container } from "tsyringe";

import { IDateProvider } from "./DataProvider/IDateProvider";
import { DayjsDateProvider } from "./DataProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
