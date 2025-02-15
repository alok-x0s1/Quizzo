import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import  z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createQuizSchema } from "@/utils/validator";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";

const EditQuiz = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof createQuizSchema>>({
		resolver: zodResolver(createQuizSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				const response = await axios.get(`/quizzes/${id}`);
				if (response.status === 200) {
					const quizData = response.data.data;
					form.reset({
						title: quizData.title,
						description: quizData.description,
					});
				}
			} catch (error) {
				const axiosError = error as AxiosError<ErrorResponse>;
				const errorMessage =
					axiosError.response?.data.message ??
					"Failed to load quiz details.";
				setError(errorMessage);
				toast({
					title: "Error",
					description: errorMessage,
					variant: "destructive",
				});
			} finally {
				setLoading(false);
			}
		};

		fetchQuiz();
	}, [id, form]);

	async function onSubmit(values: z.infer<typeof createQuizSchema>) {
		try {
			const res = await axios.patch(`/quizzes/${id}`, values);
			if (res.status === 200) {
				toast({
					title: "Quiz updated successfully.",
					description: "Your quiz has been updated.",
				});
				navigate(`/quiz/${id}`);
			}
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Update quiz failed.",
				description:
					errorMessage ??
					"An error occurred while updating the quiz.",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="container max-w-2xl mx-auto px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-3xl font-bold text-center mb-6">
					Edit Quiz
				</h1>

				{loading ? (
					<div className="text-center text-gray-500">
						Loading quiz details...
					</div>
				) : error ? (
					<div className="text-center text-red-500">{error}</div>
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8 border shadow-sm p-6 rounded-2xl"
						>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Quiz Title"
												{...field}
												className="input-field"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder="Quiz Description"
												{...field}
												rows={5}
												className="textarea rounded-2xl"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								disabled={form.formState.isSubmitting}
								className="button col-span-2 w-fit px-6"
							>
								{form.formState.isSubmitting
									? "Updating..."
									: "Update Quiz"}
							</Button>
						</form>
					</Form>
				)}
			</motion.div>
		</div>
	);
};

export default EditQuiz;
