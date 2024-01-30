import { RESPONSE_MESSAGE } from "../constant/responseMessage.js";
import { HTTP_STATUS } from "../constant/statusCode.js";
import { sendResponse } from "./response.js";

export const sendValidationError = (res, validation) => {
  const error = {};
  validation.forEach((ele) => {
    const property = ele.path;
    error[property] = ele.msg;
  });
  return sendResponse(
    res,
    HTTP_STATUS.UNPROCESSABLE_ENTITY,
    RESPONSE_MESSAGE.UNPROCESSABLE_ENTITY,
    error
  );
};
