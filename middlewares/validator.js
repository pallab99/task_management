import { check } from "express-validator";
import AuthService from "../services/auth/index.js";

import { body } from "express-validator";

export const validator = {
  register: [
    body("username")
      .exists()
      .withMessage("Username is required")
      .bail()
      .custom(async (value) => {
        const userNameExists = await AuthService.findByUserName(value);
        if (userNameExists.success) {
          throw new Error("Username is already registered");
        } else {
          return true;
        }
      }),
    body("email")
      .exists()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Please enter a valid email address")
      .bail()
      .custom(async (value) => {
        const emailExists = await AuthService.findByEmail(value);
        if (emailExists.success) {
          throw new Error("Email is already registered");
        } else {
          return true;
        }
      }),
    body("password")
      .exists()
      .withMessage("Password is required")
      .bail()
      .isStrongPassword()
      .withMessage("Please enter a strong password"),
  ],
};
