import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import AuthLogin from "./components/auth/AuthLogin";
import Page404 from "./components/error/Page404";
import Home from "./components/Home";
import Confirm from "./components/posts/Confirm";
import Detail from "./components/posts/Detail";
import EditPost from "./components/posts/EditPost";
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
				<Route
					path="/posts/confirm"
					element={<Confirm confirmText={"投稿"} />}
				/>
				<Route path="/post/:id" element={<Detail />} />
				<Route path="/post/edit/:id" element={<EditPost />} />
				<Route
					path="/posts/edit/confirm"
					element={<Confirm confirmText={"編集"} />}
				/>
				<Route path="*" element={<Page404 />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Routers;
