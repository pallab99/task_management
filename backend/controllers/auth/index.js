import { validationResult } from "express-validator";
import { RESPONSE_MESSAGE } from "../../constant/responseMessage.js";
import { HTTP_STATUS } from "../../constant/statusCode.js";
import { sendResponse } from "../../utils/response.js";
import { sendValidationError } from "../../utils/sendValidationError.js";
import AuthService from "../../services/auth/index.js";
import { generateAccessToken } from "../../utils/tokenGenerator.js";
class AuthControllerClass {
  async register(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length) {
        return sendValidationError(res, validation);
      }
      const newUser = await AuthService.registerUser(req.body);

      if (!newUser.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.SOMETHING_WENT_WRONG
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.REGISTRATION_SUCCESSFUL,
        newUser.data
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(req, res) {
    try {
      const findByEmail = await AuthService.findByEmail(req.body.email);

      if (!findByEmail.success) {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          RESPONSE_MESSAGE.EMAIL_NOT_EXISTS
        );
      }
      const samePassword = await AuthService.comparePasswords(
        req.body.password,
        findByEmail.data.password
      );
      if (!samePassword.success) {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          RESPONSE_MESSAGE.WRONG_CREDENTIAL
        );
      }

      const accessToken = generateAccessToken(findByEmail.data);
      res.cookie("accessToken", accessToken, { path: "/" });
      const newUserData = {
        ...findByEmail.data,
        accessToken,
      };
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.SIGN_IN_SUCCESSFUL,
        newUserData
      );
    } catch (error) {
      console.log(error);
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
