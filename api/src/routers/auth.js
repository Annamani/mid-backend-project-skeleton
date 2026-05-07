import express from "express";
import { signUp, logIn, me } from "../controllers/auth.js";
import { authMiddleware } from "../middlewares/auth.js";
import dotenv from "dotenv";
dotenv.config();
const authRouter = express.Router();
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create user
 */
authRouter.post("/signup", signUp);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 */
authRouter.post("/login", logIn);
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Auth
 *     summary: Get current user
 */
authRouter.get("/me", authMiddleware, me);

export default authRouter;
