import { Response } from "express";

export const errorResponse = (
	res: Response,
	errorCode: number = 500,
	message: string,
	errorDetails?: any
) => {
	return res.status(errorCode).json({
		success: false,
		statusCode: errorCode,
		message,
		...(errorDetails && { errorDetails }),
	});
};

export const successResponse = (
	res: Response,
	statusCode: number = 200,
	message: string,
	data: any = {}
) => {
	return res.status(statusCode).json({
		success: true,
		statusCode,
		message,
		data,
	});
};
