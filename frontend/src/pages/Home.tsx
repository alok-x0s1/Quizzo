import { motion } from "framer-motion";
import { ArrowRight, Book, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="container mx-auto px-4 py-12 min-h-screen">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-12"
			>
				<h1 className="text-4xl font-bold mb-4">Welcome to Quizo</h1>
				<p className="text-xl text-muted-foreground mb-8">
					The modern quiz management platform for educators
				</p>
				<Button asChild size="lg">
					<Link to="/login">
						Get Started <ArrowRight className="ml-2" />
					</Link>
				</Button>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-8 mb-12">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Create Engaging Quizzes</CardTitle>
							<CardDescription>
								Design interactive quizzes to enhance learning
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Book className="w-12 h-12 mb-4 text-primary" />
							<p>
								Easily create and manage quizzes with our
								intuitive interface.
							</p>
						</CardContent>
					</Card>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Track Student Progress</CardTitle>
							<CardDescription>
								Monitor and analyze student performance
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Users className="w-12 h-12 mb-4 text-primary" />
							<p>
								Get insights into student performance with
								detailed analytics.
							</p>
						</CardContent>
					</Card>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="text-center"
			>
				<h2 className="text-2xl font-bold mb-4">
					Ready to revolutionize your teaching?
				</h2>
				<Button asChild>
					<Link to="/login">Join Quizo Today</Link>
				</Button>
			</motion.div>
		</div>
	);
};

export default Home;
