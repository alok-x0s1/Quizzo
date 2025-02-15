import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Navbar = () => {
	return (
		<header className="w-full border-b">
			<div className="wrapper flex items-center justify-between p-2">
				<Link to="/" className="w-36">
					<img src="/logo.jpeg" alt="logo" width={80} />
				</Link>

				<nav className="hidden md:flex-between w-full max-w-xs">
					<NavItems />
				</nav>

				<div className="flex w-36 justify-end items-center gap-3">
					<Button asChild className="rounded-full" size="lg">
						<Link to="/login">Login</Link>
					</Button>
					<MobileNav />
				</div>
			</div>
		</header>
	);
};

export default Navbar;
