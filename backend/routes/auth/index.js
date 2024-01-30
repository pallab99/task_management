import express from "express";
import AuthController from "../../controllers/auth/index.js";
const router = express.Router();
import { validator } from "../../middlewares/validator.js";

router.post("/register", [validator.register], AuthController.register);
router.post("/login", AuthController.login);

export default router;
