import { Auth, onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { auth } from "../firebase/firebase";

type AuthContextProps = {
	currentUser: User | null | undefined;
	isSignIn: boolean;
	currentAuth: Auth;
};

type AuthSetContextProps = {
	setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
	setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

const AuthContext = createContext<AuthContextProps>({
	currentUser: undefined,
	isSignIn: false,
	currentAuth: auth,
});

const AuthSetContext = createContext<AuthSetContextProps>({
	setCurrentUser: () => {},
	setIsSignIn: () => {},
	setCurrentAuth: () => {},
});

type Props = {
	children: JSX.Element;
};

const AuthProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<User | null | undefined>(
		undefined
	);

	const [isSignIn, setIsSignIn] = useState<boolean>(false);
	const [currentAuth, setCurrentAuth] = useState<Auth>(auth);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentAuth(auth);
				setCurrentUser(user);
				setIsSignIn(true);
			} else {
				setIsSignIn(true);
			}
		});
	}, []);
	return (
		<>
			{isSignIn ? (
				<AuthContext.Provider value={{ currentUser, isSignIn, currentAuth }}>
					<AuthSetContext.Provider
						value={{ setCurrentUser, setIsSignIn, setCurrentAuth }}
					>
						{children}
					</AuthSetContext.Provider>
				</AuthContext.Provider>
			) : (
				<Loading />
			)}
		</>
	);
};

const useAuthContext = () => useContext(AuthContext);
const useAuthSetContext = () => useContext(AuthSetContext);

export { useAuthContext, useAuthSetContext };
export default AuthProvider;
