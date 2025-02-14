import { Request, Response } from "express";
import prisma from "../config/prisma";
import { errorResponse, successResponse } from "../utils/response";

const getQuizzes = async (req: Request, res: Response) => {
	try {
		const teacherId = req.session.userId;
		if (!teacherId) {
			errorResponse(res, 401, "Unauthorized, Please login first");
			return;
		}

		const quizzes = await prisma.quiz.findMany({
			where: {
				teacherId,
			},
		});

		successResponse(res, 200, "Quizzes fetched successfully", quizzes);
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const createQuiz = async (req: Request, res: Response) => {
	try {
		const teacherId = req.session.userId;
		if (!teacherId) {
			errorResponse(res, 401, "Unauthorized, Please login first");
			return;
		}

		const { title, description } = req.body;
		if (!title || !description) {
			errorResponse(res, 400, "Please provide title and description");
			return;
		}

		const quiz = await prisma.quiz.create({
			data: {
				title,
				description,
				teacherId,
			},
		});

		successResponse(res, 201, "Quiz created successfully", quiz);
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const updateQuiz = async (req: Request, res: Response) => {
	try {
		const teacherId = req.session.userId;
		if (!teacherId) {
			errorResponse(res, 401, "Unauthorized, Please login first");
			return;
		}
		const id = req.params.id;

		const { title, description } = req.body;
		if (!id || !title || !description) {
			errorResponse(res, 400, "Please provide all required fields");
			return;
		}

		const quiz = await prisma.quiz.update({
			where: {
				id,
			},
			data: {
				title,
				description,
			},
		});

		if (!quiz) {
			errorResponse(res, 404, "Quiz not found");
			return;
		}

		successResponse(res, 200, "Quiz updated successfully", quiz);
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const deleteQuiz = async (req: Request, res: Response) => {
	try {
		const teacherId = req.session.userId;
		if (!teacherId) {
			errorResponse(res, 401, "Unauthorized, Please login first");
			return;
		}
		const id = req.params.id;

		const quiz = await prisma.quiz.delete({
			where: {
				id,
			},
		});

		if (!quiz) {
			errorResponse(res, 404, "Quiz not found");
			return;
		}

		successResponse(res, 200, "Quiz deleted successfully");
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

const getQuizById = async (req: Request, res: Response) => {
	try {
		const teacherId = req.session.userId;
		if (!teacherId) {
			errorResponse(res, 401, "Unauthorized, Please login first");
			return;
		}
		const id = req.params.id;

		const quiz = await prisma.quiz.findUnique({
			where: {
				id,
			},
		});

		if (!quiz) {
			errorResponse(res, 404, "Quiz not found");
			return;
		}

		successResponse(res, 200, "Quiz fetched successfully", quiz);
	} catch (error) {
		console.error(error);
		errorResponse(res, 500, "Internal server error");
	}
};

export { getQuizzes, createQuiz, updateQuiz, deleteQuiz, getQuizById };
