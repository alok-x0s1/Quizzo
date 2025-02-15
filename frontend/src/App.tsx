import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import RootLayout from "./components/Layout";
import {
	About,
	Contact,
	CreateQuiz,
	Dashboard,
	EditQuiz,
	Home,
	Login,
	QuizDetails,
	Signup,
} from "@/pages";
import NotFound from "@/components/NotFound";

function App() {
	return (
		<Router>
			<RootLayout>
				<Toaster />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/create" element={<CreateQuiz />} />
					<Route path="/quiz/:id" element={<QuizDetails />} />
					<Route path="/edit/:id" element={<EditQuiz />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</RootLayout>
		</Router>
	);
}

export default App;
