import Footer from "./Shared/Footer";
import Navbar from "./Shared/Navbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen flex-col">
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
