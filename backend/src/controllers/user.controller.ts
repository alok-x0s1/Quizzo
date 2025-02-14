import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";

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

		req.session.userId = user.id;
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

		req.session.userId = user.id;

		successResponse(res, 200, "Logged in successfully", user.id);
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const logoutUser = async (req: Request, res: Response) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				console.error(err);
				errorResponse(res, 500, "Internal server error");
				return;
			}
			successResponse(res, 200, "Logged out successfully");
		});
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

export { registerUser, loginUser, logoutUser };
