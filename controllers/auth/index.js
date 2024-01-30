import { RESPONSE_MESSAGE } from "../../constant/responseMessage.js";
import { HTTP_STATUS } from "../../constant/statusCode.js";
import { sendResponse } from "../../utils/response.js";

class AuthControllerClass {
  async register(req, res) {
    try {
      console.log("register");
    } catch (error) {
      console.log(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
}

const AuthController = new AuthControllerClass();
export default AuthController;
