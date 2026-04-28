import { RateLimiter } from "../api/RateLimiter";

export class FixedWindowLimiter implements RateLimiter {
  private requests: Map<string, { count: number; start: number }> = new Map();

  constructor(private limit: number, private windowMs: number) {}

  allow(key: string): boolean {
    const now = Date.now();
    const record = this.requests.get(key);

    if (!record || now - record.start > this.windowMs) {
      this.requests.set(key, { count: 1, start: now });
      return true;
    }

    if (record.count < this.limit) {
      record.count++;
      return true;
    }

    return false;
  }
}
