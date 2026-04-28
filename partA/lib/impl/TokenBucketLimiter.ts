import { RateLimiter } from "../api/RateLimiter";

export class TokenBucketLimiter implements RateLimiter {
  private buckets: Map<string, { tokens: number; last: number }> = new Map();

  constructor(private capacity: number, private refillRate: number) {}

  allow(key: string): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = { tokens: this.capacity, last: now };
    }

    const delta = (now - bucket.last) / 1000;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + delta * this.refillRate);
    bucket.last = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      this.buckets.set(key, bucket);
      return true;
    }

    this.buckets.set(key, bucket);
    return false;
  }
}
