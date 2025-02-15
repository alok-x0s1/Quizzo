import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

interface JwtPayload {
	id: string;
	username: string;
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token =
			req.cookies.token ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			errorResponse(res, 401, "Unauthorized, Please login first");
			return;
		}

		const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
		if (!decoded || !decoded.id) {
			errorResponse(res, 401, "Invalid token, Please login again");
			return;
		}
		
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});

		if (!user) {
			errorResponse(res, 401, "Invalid access token, Please login again");
			return;
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

export default isLoggedIn;
