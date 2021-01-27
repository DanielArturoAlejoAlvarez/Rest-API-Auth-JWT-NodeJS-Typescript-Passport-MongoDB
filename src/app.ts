import config from "./config/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import passport from "passport";
import middlewarePassport from "./midlewares/passport";

import authRoute from "./routes/auth.routes";
import userRoute from "./routes/user.routes";

const app = express();

//Settings
app.set("port", config.port);

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Passport
app.use(passport.initialize());
passport.use(middlewarePassport);

//Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send(`The API is at http://127.0.0.1:${app.get("port")}`);
});

export default app;
