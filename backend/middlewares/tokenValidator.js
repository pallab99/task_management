import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
dotEnv.config();
import { RESPONSE_MESSAGE } from "../constant/responseMessage.js";
import { HTTP_STATUS } from "../constant/statusCode.js";
import { sendResponse } from "../utils/response.js";
const tokenAuthorization = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS
      );
    }
    const token = accessToken;
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const validate = jwt.verify(token, secretKey);

    if (validate) {
      req.user = validate;
      next();
    } else {
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS
      );
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS
      );
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS
      );
    }
    return sendResponse(
      res,
      HTTP_STATUS.UNAUTHORIZED,
      RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS
    );
  }
};

export { tokenAuthorization };
