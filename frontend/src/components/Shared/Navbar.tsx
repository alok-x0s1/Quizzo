import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import axios from "@/utils/axios";

const Navbar = () => {
	const { user, setUser } = useUser();
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleLogout = async () => {
		try {
			await axios.post("/users/logout");
			setUser(null);
			navigate("/");
		} catch (error) {
			console.error(error);
			toast({
				title: "Logout failed",
				description: "Something went wrong while logging out.",
				variant: "destructive",
			});
		}
	};

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
					{user ? (
						<Button
							onClick={handleLogout}
							className="rounded-full"
							size="lg"
							variant="destructive"
						>
							Logout
						</Button>
					) : (
						<Button asChild className="rounded-full" size="lg">
							<Link to="/login">Login</Link>
						</Button>
					)}
					<MobileNav />
				</div>
			</div>
		</header>
	);
};

export default Navbar;
