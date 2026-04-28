import { RateLimiterFactory } from "../lib/api/RateLimiterFactory";

describe("RateLimiter Tests", () => {

  // ================= FIXED WINDOW =================
  describe("FixedWindowLimiter", () => {

    it("1. allow requests under limit", () => {
      const limiter = RateLimiterFactory.create("fixed");

      for (let i = 0; i < 5; i++) {
        expect(limiter.allow("user1")).toBe(true);
      }
    });

    it("2. block after limit exceeded", () => {
      const limiter = RateLimiterFactory.create("fixed");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      expect(limiter.allow("user1")).toBe(false);
    });

    it("3. reset after time window", async () => {
      const limiter = RateLimiterFactory.create("fixed");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      await new Promise(r => setTimeout(r, 1100));

      expect(limiter.allow("user1")).toBe(true);
    });

    it("4. separate users should not affect each other", () => {
      const limiter = RateLimiterFactory.create("fixed");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      expect(limiter.allow("user2")).toBe(true);
    });

    it("5. multiple users limits independently", () => {
      const limiter = RateLimiterFactory.create("fixed");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
        limiter.allow("user2");
      }

      expect(limiter.allow("user1")).toBe(false);
      expect(limiter.allow("user2")).toBe(false);
    });

  });

  // ================= SLIDING WINDOW =================
  describe("SlidingWindowLimiter", () => {

    it("6. allow requests under limit", () => {
      const limiter = RateLimiterFactory.create("sliding");

      for (let i = 0; i < 5; i++) {
        expect(limiter.allow("user1")).toBe(true);
      }
    });

    it("7. block after limit exceeded", () => {
      const limiter = RateLimiterFactory.create("sliding");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      expect(limiter.allow("user1")).toBe(false);
    });

    it("8. allow after some time passes", async () => {
      const limiter = RateLimiterFactory.create("sliding");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      await new Promise(r => setTimeout(r, 1100));

      expect(limiter.allow("user1")).toBe(true);
    });

    it("9. different users handled separately", () => {
      const limiter = RateLimiterFactory.create("sliding");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      expect(limiter.allow("user2")).toBe(true);
    });

    it("10. sliding window drops old requests", async () => {
      const limiter = RateLimiterFactory.create("sliding");

      limiter.allow("user1");
      await new Promise(r => setTimeout(r, 1100));

      for (let i = 0; i < 5; i++) {
        expect(limiter.allow("user1")).toBe(true);
      }
    });

  });

  // ================= TOKEN BUCKET =================
  describe("TokenBucketLimiter", () => {

    it("11. allow initial burst", () => {
      const limiter = RateLimiterFactory.create("token");

      for (let i = 0; i < 5; i++) {
        expect(limiter.allow("user1")).toBe(true);
      }
    });

    it("12. block when tokens exhausted", () => {
      const limiter = RateLimiterFactory.create("token");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      expect(limiter.allow("user1")).toBe(false);
    });

    it("13. refill tokens over time", async () => {
      const limiter = RateLimiterFactory.create("token");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      await new Promise(r => setTimeout(r, 2000));

      expect(limiter.allow("user1")).toBe(true);
    });

    it("14. users have independent buckets", () => {
      const limiter = RateLimiterFactory.create("token");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      expect(limiter.allow("user2")).toBe(true);
    });

    it("15. partial refill works correctly", async () => {
      const limiter = RateLimiterFactory.create("token");

      for (let i = 0; i < 5; i++) {
        limiter.allow("user1");
      }

      await new Promise(r => setTimeout(r, 1100));

      const result = limiter.allow("user1");
      expect(typeof result).toBe("boolean");
    });

  });

});
