import { Router } from "express";
import {
	createQuiz,
	deleteQuiz,
	getQuizById,
	getQuizzes,
	updateQuiz,
} from "../controllers/quiz.controller";
import isLoggedIn from "../middlewares/auth.middleware";

const router = Router();

router.use(isLoggedIn);
router.route("/").get(getQuizzes);
router.route("/").post(createQuiz);
router.route("/:id").get(getQuizById).patch(updateQuiz).delete(deleteQuiz);

export default router;
