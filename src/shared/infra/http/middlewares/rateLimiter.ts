import { createClient } from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const redisClient = createClient({
  host: 'localhost',
  port: 6379
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 5, // 10 requests
  duration: 5, // per 5 seconds by IP
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}