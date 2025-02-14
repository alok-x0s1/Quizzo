import { Router } from "express";
import {
	createQuiz,
	deleteQuiz,
	getQuizById,
	getQuizzes,
	updateQuiz,
} from "../controllers/quiz.controller";

const router = Router();

router.route("/").get(getQuizzes);
router.route("/").post(createQuiz);
router.route("/:id").get(getQuizById).patch(updateQuiz).delete(deleteQuiz);

export default router;
