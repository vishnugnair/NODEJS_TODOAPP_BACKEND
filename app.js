import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express();

config({
  path: "./data/config.env",
});

const router = express.Router();

app.use(express.json()); //middleware to access the json data from postman(mainly in body)
app.use(cookieParser());
app.use(
  cors({
    //commands to give to use CORS properly
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/users", userRouter); //to access the router (to be able to use it).
app.use("/api/v1/task/", taskRouter);

app.get("/", (req, res) => {
  res.send("working");
});

app.use(errorMiddleware);
