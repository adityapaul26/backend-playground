import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/auth.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth API is running");
});

app.use("/api/users", userRoutes);

export default app;
