import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-background border-t">
			<div className="wrapper py-8 md:py-12">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div>
						<Link to="/" className="w-36">
							<img src="/logo.jpeg" alt="logo" width={80} />
						</Link>
						<p className="text-sm text-muted-foreground mt-2">
							Quizo is a modern quiz management platform for
							teachers and educators.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Legal</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/privacy"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/terms"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Follow Us
						</h3>
						<div className="flex space-x-4">
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								<Facebook size={20} />
							</Link>
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								<Twitter size={20} />
							</Link>
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								<Instagram size={20} />
							</Link>
						</div>
					</div>
				</div>
				<div className="mt-8 border-t pt-8 text-center">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Quizo. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
