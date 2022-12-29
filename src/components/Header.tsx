import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext, useAuthSetContext } from "../context/AuthProvider";

const StyledHeader = styled.header`
	padding-top: 10px;
	border-bottom: 1px solid #d8d8d8;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 5;
	height: 62px; ;
`;

const StyledHeaderBar = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
`;

const StyledHeaderRightBar = styled.div`
	width: 48.2%;
	display: flex;
	justify-content: space-evenly;
	float: right;
	text-align: right;
	& a {
		text-decoration: none;
		padding: 8px 20px;
		font-size: 14px;
		border: 2px solid #57c3e9;
		color: #57c3e9;
		font-weight: bold;
		text-align: center;
		border-radius: 3px;
		display: inline-block;
		:hover {
			opacity: 0.7;
		}
	}
`;

const StyledHeaderLogoutBar = styled.div`
	width: 48.2%;
	float: right;
	text-align: right;
	& button {
		padding: 8px 20px;
		font-size: 14px;
		border: 2px solid #57c3e9;
		color: #57c3e9;
		font-weight: bold;
		text-align: center;
		border-radius: 3px;
		display: inline-block;
		background: transparent;
		:hover {
			cursor: pointer;
			opacity: 0.7;
		}
	}
`;

const StyledHeaderTitle = styled.h1`
	font-size: 20px;
	line-height: 41px;
	float: left;
	& a {
		text-decoration: none;
		color: #666;
		background: transparent;
		:hover {
			color: #57c3e9;
		}
	}
`;

const Header = () => {
	const user = useAuthContext();
	const setAuthContext = useAuthSetContext();
	const navigate = useNavigate();
	const logout = async () => {
		await signOut(user.currentAuth)
			.then(() => {
				alert("ログアウトしました");
				setAuthContext.setCurrentUser(undefined);
				navigate("/");
			})
			.catch((e) => {
				alert(e.message);
			});
	};

	return (
		<StyledHeader>
			<StyledHeaderBar>
				<StyledHeaderTitle>
					<Link to="/">PicTweet</Link>
				</StyledHeaderTitle>
				{user.currentUser ? (
					<StyledHeaderLogoutBar>
						<button onClick={logout}>ログアウト</button>
					</StyledHeaderLogoutBar>
				) : (
					<StyledHeaderRightBar>
						<Link to="/login">ログイン</Link>
						<Link to="/signup">新規登録</Link>
					</StyledHeaderRightBar>
				)}
			</StyledHeaderBar>
		</StyledHeader>
	);
};

export default Header;
