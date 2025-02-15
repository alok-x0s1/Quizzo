import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signupFormSchema } from "@/utils/validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";

const Signup = () => {
	const navigate = useNavigate();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof signupFormSchema>>({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof signupFormSchema>) {
		try {
			const res = await axios.post("/users/register", values);
			if (res.status === 201) {
				toast({
					title: "Signup Successful",
					description: "You have successfully signed up.",
				});
				navigate("/dashboard");
			}
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Signup failed.",
				description:
					errorMessage ?? "An error occurred while signing up.",
				duration: 3000,
				variant: "destructive",
			});
		}
	}

	return (
		<div className="container max-w-lg mx-auto my-20 ">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-3xl font-bold text-center mb-6">
					Signup to Quizo
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5 border p-6 rounded-2xl shadow-sm"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Username"
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="password"
											placeholder="Password"
											{...field}
											className="input-field"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<p className="text-md">
							Already have an account?{" "}
							<Link
								className="text-red-500 hover:underline duration-300"
								to="/login"
							>
								Log-in
							</Link>
						</p>
						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="button col-span-2 w-fit px-8"
						>
							{form.formState.isSubmitting
								? "Signing up..."
								: "Signup"}
						</Button>
					</form>
				</Form>
			</motion.div>
		</div>
	);
};

export default Signup;
