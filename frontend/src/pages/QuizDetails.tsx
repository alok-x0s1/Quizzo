import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";

type Quiz = {
	id: string;
	title: string;
	description: string;
	createdAt: string;
};

const QuizDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [quiz, setQuiz] = useState<Quiz | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				const response = await axios.get(`/quizzes/${id}`);
				if (response.status === 200) {
					setQuiz(response.data.data);
				}
			} catch (error) {
				const axiosError = error as AxiosError<ErrorResponse>;
				const errorMessage = axiosError.response?.data.message;
				setError(
					errorMessage ?? "An error occurred while fetching quiz."
				);
				toast({
					title: "Fetching failed.",
					description:
						errorMessage ??
						"An error occurred while fetching quiz.",
					duration: 3000,
					variant: "destructive",
				});
			} finally {
				setLoading(false);
			}
		};

		fetchQuiz();
	}, [id]);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await axios.delete(`/quizzes/${id}`);

			toast({
				title: "Success",
				description: "Quiz deleted successfully.",
			});
			setIsDialogOpen(false);
			navigate("/dashboard");
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Deletion failed.",
				description:
					errorMessage ?? "An error occurred while deleting quiz.",
				duration: 3000,
				variant: "destructive",
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="container max-w-4xl mx-auto px-4 py-12">
			{loading && (
				<div className="flex justify-center items-center h-40">
					<p className="text-gray-500 text-lg">
						Loading quiz details...
					</p>
				</div>
			)}

			{error && (
				<div className="flex flex-col items-center justify-center text-red-500">
					<p>{error}</p>
					<Button
						className="mt-4"
						onClick={() => window.location.reload()}
					>
						Retry
					</Button>
				</div>
			)}

			{!loading && !error && !quiz && (
				<div className="flex flex-col items-center justify-center text-center">
					<p className="text-gray-500 text-lg">Quiz not found.</p>
					<Button asChild className="mt-4">
						<Link to="/dashboard">Go to Dashboard</Link>
					</Button>
				</div>
			)}

			{!loading && !error && quiz && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>{quiz.title}</CardTitle>
							<CardDescription>
								-{" "}
								{new Date(quiz.createdAt).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								{quiz.description}
							</p>
						</CardContent>
						<CardFooter className="flex justify-start gap-2">
							<Button variant="outline" asChild>
								<Link to={`/edit/${quiz.id}`}>
									<Edit className="mr-2 h-4 w-4" /> Edit Quiz
								</Link>
							</Button>
							<AlertDialog
								open={isDialogOpen}
								onOpenChange={setIsDialogOpen}
							>
								<AlertDialogTrigger asChild>
									<Button
										variant="destructive"
										onClick={() => setIsDialogOpen(true)}
									>
										<Trash2 className="mr-2 h-4 w-4" />{" "}
										Delete Quiz
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent className="bg-primary-50">
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This
											will permanently delete the quiz and
											all its associated data.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel
											onClick={() =>
												!isDeleting &&
												setIsDialogOpen(false)
											}
											disabled={isDeleting}
										>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleDelete}
											disabled={isDeleting}
										>
											{isDeleting
												? "Deleting..."
												: "Delete"}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</CardFooter>
					</Card>
				</motion.div>
			)}
		</div>
	);
};

export default QuizDetails;
