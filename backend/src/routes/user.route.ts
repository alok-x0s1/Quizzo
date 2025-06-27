import { Router } from "express";
import {
	getUser,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/user.controller";
import isLoggedIn from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(isLoggedIn, getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
