import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, ".env") });

const { JWT_SECRET = "dev-secret", MONGODB_URI = "mongodb://127.0.0.1:27017/news-explorer" } =
  process.env;

export { JWT_SECRET, MONGODB_URI };

export async function connectDatabase() {
  await mongoose.connect(MONGODB_URI);
}
