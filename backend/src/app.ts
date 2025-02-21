import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config";

const app: Express = express();

app.use(
	cors({
		origin: [`${config.clientUrl}`],
		credentials: true,
	})
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.route";
import quizRouter from "./routes/quiz.route";

// Define routes
app.use("/api/users", userRouter);
app.use("/api/quizzes", quizRouter);

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Hello from Quizzo API",
	});
});

export default app;
