import express from "express";
import AuthController from "../../controllers/auth/index.js";
const router = express.Router();

router.post("/register", AuthController.register);

export default router;
