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
+app.use(cookieParser());

app.get("/api", (req, res) => {
	res.status(200).json({
		message: "Hello from Quizzo API",
	});
});

export default app;
