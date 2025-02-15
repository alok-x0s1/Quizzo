import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const About = () => {
	return (
		<div className="container mx-auto px-4 py-12 min-h-screen">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-12"
			>
				<h1 className="text-4xl font-bold mb-4">About Quizo</h1>
				<p className="text-xl text-muted-foreground">
					Empowering educators with modern quiz management tools
				</p>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<h2 className="text-2xl font-bold mb-4">Our Mission</h2>
					<p className="mb-4">
						At Quizo, we believe in the power of interactive
						learning. Our mission is to provide educators with
						cutting-edge tools to create engaging quizzes, track
						student progress, and ultimately enhance the learning
						experience.
					</p>
					<ul className="space-y-2">
						{[
							"Easy-to-use interface",
							"Comprehensive analytics",
							"Customizable quiz options",
						].map((feature, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.5,
									delay: 0.4 + index * 0.1,
								}}
								className="flex items-center"
							>
								<CheckCircle className="mr-2 text-primary" />
								{feature}
							</motion.li>
						))}
					</ul>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="relative hover:shadow-md hover:border rounded-lg duration-300"
				>
					<div className="aspect-video rounded-lg bg-muted"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-4xl font-bold text-primary">
							Quizo
						</span>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default About;
