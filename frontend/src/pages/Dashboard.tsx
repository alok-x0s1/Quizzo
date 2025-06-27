import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { ErrorResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

type Quiz = {
	id: string;
	title: string;
	description: string;
	createdAt: string;
};

const Dashboard = () => {
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const res = await axios.get("/quizzes");
				if (res.status === 200) {
					setQuizzes(res.data.data);
				}
			} catch (error) {
				const axiosError = error as AxiosError<ErrorResponse>;
				const errorMessage = axiosError.response?.data.message;

				toast({
					title: "Error",
					description:
						errorMessage ??
						"An error occurred while fetching quizzes.",
					duration: 3000,
					variant: "destructive",
				});

				setError(
					errorMessage ?? "An error occurred while fetching quizzes."
				);
			} finally {
				setLoading(false);
			}
		};

		fetchQuizzes();
	}, []);

	return (
		<div className="container mx-auto px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex justify-between items-center mb-8"
			>
				<h1 className="text-3xl font-bold">Your Quizzes</h1>
				<Button asChild className="rounded-full px-6 py-6">
					<Link to="/create">Create New Quiz</Link>
				</Button>
			</motion.div>

			{loading && (
				<div className="flex justify-center items-center h-40">
					<p className="text-gray-500 text-lg">Loading quizzes...</p>
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

			{!loading && !error && quizzes.length === 0 && (
				<div className="flex flex-col items-center justify-center text-center">
					<p className="text-gray-500 text-lg">
						You havn't created any quizzes yet. Click on right
						corner to create one.
					</p>
				</div>
			)}

			{!loading && !error && quizzes.length > 0 && (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{quizzes.map((quiz, index) => (
						<motion.div
							key={quiz.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card>
								<CardHeader>
									<CardTitle>{quiz.title}</CardTitle>
									<CardDescription>
										-{" "}
										{new Date(
											quiz.createdAt
										).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										{quiz.description}
									</p>
								</CardContent>
								<CardFooter className="flex justify-between">
									<Button variant="outline" asChild>
										<Link to={`/quiz/${quiz.id}`}>
											View Details
										</Link>
									</Button>
									<div className="flex space-x-2">
										<Button
											variant="outline"
											size="icon"
											asChild
										>
											<Link to={`/edit/${quiz.id}`}>
												<Edit className="h-4 w-4" />
											</Link>
										</Button>
									</div>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
