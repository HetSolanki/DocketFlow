import express from "express";
import morgan from "morgan";
import router from "./routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api", router);
export default app;
