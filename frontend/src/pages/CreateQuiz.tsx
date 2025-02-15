import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createQuizSchema } from "@/utils/validator";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";

const CreateQuiz = () => {
	const navigate = useNavigate();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof createQuizSchema>>({
		resolver: zodResolver(createQuizSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof createQuizSchema>) {
		try {
			const res = await axios.post("/quizzes", values);
			if (res.status === 201) {
				toast({
					title: "Create quiz successful.",
					description: "You have successfully created a new quiz.",
				});
				navigate("/dashboard");
			}
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Create quiz failed.",
				description:
					errorMessage ?? "An error occurred while creating quiz.",
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
					Create New Quiz
				</h1>
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
								? "Creating..."
								: `Create Quiz`}
						</Button>
					</form>
				</Form>
			</motion.div>
		</div>
	);
};

export default CreateQuiz;
