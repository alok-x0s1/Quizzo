import { CookieOptions } from "express";
import { config } from "../config/config";

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	sameSite: config.nodeEnv === "production" ? "none" : "lax",
	secure: config.nodeEnv === "production",
	maxAge: 1000 * 60 * 60 * 24 * 7,
};
