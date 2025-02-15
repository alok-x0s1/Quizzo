import { config } from "../config/config";
import jwt from "jsonwebtoken";

export const generateToken = (id: string, username: string) => {
	const token = jwt.sign({ id, username }, config.jwtSecret, {
		expiresIn: "7d",
	});

	return token;
};
