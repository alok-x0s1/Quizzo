import { UserContextProvider } from "./context/UserContext.tsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<UserContextProvider>
		<App />
	</UserContextProvider>
);
