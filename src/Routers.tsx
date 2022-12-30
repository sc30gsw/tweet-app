import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import AuthLogin from "./components/auth/AuthLogin";
import Home from "./components/Home";
import Mypage from "./components/user/Mypage";

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Auth />} />
				<Route path="/login" element={<AuthLogin />} />
				<Route path="/" element={<Home />} />
				<Route path="/users/:userId" element={<Mypage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Routers;
