import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { cookieOptions } from "../utils/cookie";
import { generateToken } from "../utils/jwt";

const registerUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			errorResponse(res, 400, "Please provide username and password");
			return;
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (existingUser) {
			errorResponse(res, 400, "User already exists");
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		const token = generateToken(user.id, user.username);

		res.cookie("token", token, cookieOptions);
		successResponse(res, 201, "User created successfully", user.id);
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			errorResponse(res, 400, "Please provide username and password");
			return;
		}

		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user) {
			errorResponse(res, 400, "User not found");
			return;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			errorResponse(res, 400, "Invalid credentials");
			return;
		}

		const token = generateToken(user.id, user.username);
		res.cookie("token", token, cookieOptions);

		successResponse(res, 200, "Logged in successfully", {
			id: user.id,
			username: user.username,
		});
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const logoutUser = async (req: Request, res: Response) => {
	try {
		res.clearCookie("token");
		successResponse(res, 200, "Logged out successfully");
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 401, "Unauthorized, Please login first");
			return;
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			omit: {
				password: true,
			},
		});

		if (!user) {
			errorResponse(res, 404, "User not found");
			return;
		}

		successResponse(res, 200, "User fetched successfully", user);
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

export { registerUser, loginUser, logoutUser, getUser };
