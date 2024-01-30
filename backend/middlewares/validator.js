import AuthService from "../services/auth/index.js";

import { body, param } from "express-validator";

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

  createTask: [
    body("title")
      .exists()
      .withMessage("Title is required")
      .bail()
      .isLength({ min: 5, max: 50 })
      .withMessage("Title must be between 5 and 50 characters"),

    body("description")
      .exists()
      .withMessage("Description is required")
      .bail()
      .isLength({ min: 10, max: 200 })
      .withMessage("Description must be between 10 and 200 characters"),
  ],
  updateTask: [
    param("id").exists().withMessage("Id is required"),
    body("title")
      .optional()
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 5, max: 50 })
      .withMessage("Title must be between 5 and 50 characters"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ min: 10, max: 200 })
      .withMessage("Description must be between 10 and 200 characters"),
    body("status")
      .optional()
      .isIn(["in-complete", "completed"])
      .withMessage("Status must be either 'in-complete' or 'completed'"),
  ],
  deleteTask: [param("id").exists().withMessage("Id is required")],
};
