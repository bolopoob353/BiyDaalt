import { RateLimiter } from "../api/RateLimiter";

export class SlidingWindowLimiter implements RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(private limit: number, private windowMs: number) {}

  allow(key: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];

    const filtered = timestamps.filter(t => now - t < this.windowMs);

    if (filtered.length < this.limit) {
      filtered.push(now);
      this.requests.set(key, filtered);
      return true;
    }

    this.requests.set(key, filtered);
    return false;
  }
}
