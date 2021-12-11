import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";


import "@shared/container";
import upload from "@config/upload";

createConnection();
const app = express();

app.use(rateLimiter);

if (process.env.SENTRY_DSN.length > 50) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

if (process.env.SENTRY_DSN.length > 50) {
  console.log("Sentry is running!");
  app.use(Sentry.Handlers.errorHandler());
}

export { app };
