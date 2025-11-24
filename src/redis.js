const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

const connectRedisClient = async () => {
  if (redisClient.isOpen) {
    return;
  }

  try {
    await redisClient.connect();
    console.log("Redis client connected");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
};

connectRedisClient();

module.exports = redisClient;
