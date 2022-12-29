import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import AuthLogin from "./components/auth/AuthLogin";
import Home from "./components/Home";

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Auth />} />
				<Route path="/login" element={<AuthLogin />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Routers;
