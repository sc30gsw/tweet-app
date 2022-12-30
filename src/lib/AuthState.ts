import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const useAuthState = () => {
	const navigate = useNavigate();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate("/login");
			}
		});
	}, []);
};

export default useAuthState;
