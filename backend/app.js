import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errors } from "celebrate";
import { connectDatabase } from "./config.js";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";
import errorHandler from "./middlewares/errorHandler.js";

const { PORT = 3001 } = process.env;

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "NewsExplorer API" });
});

app.use("/", authRoutes);
app.use("/", articleRoutes);

app.use(errors());
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
