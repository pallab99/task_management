import dotEnv from "dotenv";
import express from "express";
import { HTTP_STATUS } from "./constant/statusCode.js";
import { sendResponse } from "./utils/response.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { RESPONSE_MESSAGE } from "./constant/responseMessage.js";
dotEnv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

const port = process.env.PORT || 8000;

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return sendResponse(
      res,
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      "Invalid JSON provided"
    );
  }
  next();
});

app.use("/api", router);
app.get("/", (req, res) => {
  return sendResponse(res, HTTP_STATUS.OK, RESPONSE_MESSAGE.BASE_ROUTE);
});

app.use((req, res, next) => {
  return sendResponse(res, HTTP_STATUS.BAD_GATEWAY, RESPONSE_MESSAGE.NOT_FOUND);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
