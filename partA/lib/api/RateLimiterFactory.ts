import { RateLimiter } from "./RateLimiter";
import { FixedWindowLimiter } from "../impl/FixedWindowLimiter";
import { SlidingWindowLimiter } from "../impl/SlidingWindowLimiter";
import { TokenBucketLimiter } from "../impl/TokenBucketLimiter";

export type LimiterType = "fixed" | "sliding" | "token";

export class RateLimiterFactory {
  static create(type: LimiterType): RateLimiter {
    switch (type) {
      case "fixed":
        return new FixedWindowLimiter(5, 60000);
      case "sliding":
        return new SlidingWindowLimiter(5, 60000);
      case "token":
        return new TokenBucketLimiter(5, 1);
      default:
        throw new Error("Unknown limiter type");
    }
  }
}
