import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET = "dev-secret", MONGODB_URI = "mongodb://127.0.0.1:27017/news-explorer" } =
  process.env;

export { JWT_SECRET, MONGODB_URI };

export async function connectDatabase() {
  await mongoose.connect(MONGODB_URI);
}
