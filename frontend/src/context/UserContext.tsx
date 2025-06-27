import axios from "../utils/axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface User {
	id: string;
	username: string;
}

interface UserContextType {
	user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
	fetchUser: () => Promise<void>;
}
const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = async () => {
		try {
			const response = await axios.get<{ data: User }>("/users");
			const data = response.data.data;
			setUser(data);
		} catch (error) {
			setUser(null);
			console.error(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, fetchUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserContextProvider");
	}
	return context;
};
