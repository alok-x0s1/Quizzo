import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger className="align-middle">
					<img
						src="/icons/menu.svg"
						alt="menu"
						width={120}
						height={120}
						className="cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-6 bg-white md:hidden">
					<SheetTitle className="hidden">
						Mobile Navigation
					</SheetTitle>
					<SheetDescription className="hidden">
						This contains the mobile navigation
					</SheetDescription>
					<img src="/logo.jpeg" alt="logo" width={80} height={38} />
					<Separator className="border border-gray-50" />
					<NavItems />
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default MobileNav;
