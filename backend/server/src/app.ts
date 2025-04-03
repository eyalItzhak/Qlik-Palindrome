import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { userRoutetr } from "./routes/userRoutes";
import cookieSession from "cookie-session";
import { messageRouter } from "./routes/messageRoutes";
import { devRoutes } from "./routes/devRoutes";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false
  })
);

app.use(userRoutetr);
app.use(messageRouter)
app.use(devRoutes)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }; 
