import { Router } from "express";

import { ensureAuthtenticated } from "../middlewares/ensureAuthtenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthtenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
