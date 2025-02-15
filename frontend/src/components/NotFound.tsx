import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center"
			>
				<h1 className="text-4xl font-bold mb-4">
					404 - Page Not Found
				</h1>
				<p className="text-xl text-muted-foreground mb-8">
					Oops! The page you're looking for doesn't exist.
				</p>
				<Button asChild>
					<Link to="/">
						<ArrowLeft className="mr-2" />
						Back to Home
					</Link>
				</Button>
			</motion.div>
		</div>
	);
};

export default NotFound;
