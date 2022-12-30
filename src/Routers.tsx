import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import AuthLogin from "./components/auth/AuthLogin";
import Home from "./components/Home";
import Confirm from "./components/posts/Confirm";
import NewPost from "./components/posts/NewPost";
import Mypage from "./components/user/Mypage";

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Auth />} />
				<Route path="/login" element={<AuthLogin />} />
				<Route path="/" element={<Home />} />
				<Route path="/users/:userId" element={<Mypage />} />
				<Route path="/posts/new" element={<NewPost />} />
				<Route path="/posts/confirm" element={<Confirm />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Routers;
