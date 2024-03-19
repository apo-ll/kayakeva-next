import { Redis } from "@upstash/redis";

export const revalidate = 0; // disable cache

export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
