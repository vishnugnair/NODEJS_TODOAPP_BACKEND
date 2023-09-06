import express from "express";
import { getMyDetails, login, register, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/me", isAuthenticated, getMyDetails);

router.get("/logout", logout);

export default router;
