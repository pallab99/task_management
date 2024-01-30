import express from "express";
import authRouter from "./auth/index.js";
import taskRouter from "./task/index.js";

const router = express.Router();

router.use("/", authRouter);
router.use("/", taskRouter);

export default router;
