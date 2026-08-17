import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { errors } from "celebrate";
import { connectDatabase } from "./config.js";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";
import errorHandler from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PORT = 3001, NODE_ENV = "development" } = process.env;
const isProduction = NODE_ENV === "production";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/", authRoutes);
app.use("/", articleRoutes);
app.use(errors());

if (isProduction) {
  const distPath = path.join(__dirname, "../dist");

  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send({ message: "NewsExplorer API" });
  });
}

app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
