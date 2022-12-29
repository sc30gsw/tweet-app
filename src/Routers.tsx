import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/Home";

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Auth />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Routers;
