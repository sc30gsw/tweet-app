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
	a {
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

const StyledHeaderUserNavBar = styled.div`
	float: right;
	text-align: right;
	position: relative;
	height: 100px;
	right: 0;
	span {
		top: 5px;
		display: block;
		float: left;
		margin-left: 30px;
		width: 150px;
		height: 50px;
		font-size: 1em;
		cursor: pointer;
		position: relative;
		:after {
			content: "▼";
			font-size: 0.7em;
			margin-left: 4px;
		}
		:hover {
			ul {
				display: block;
			}
		}
	}
	.post {
		width: 120px;
		margin-left: 10px;
		padding: 8px 20px;
		font-size: 14px;
		border: 2px solid #57c3e9;
		color: #57c3e9;
		font-weight: bold;
		text-align: center;
		border-radius: 3px;
		display: inline-block;
		text-decoration: none;
		transition: 0.5s;
		:hover {
			opacity: 0.7;
		}
	}
`;

const UserInfoUL = styled.ul`
	display: none;
	position: absolute;
	top: 46px;
	right: 0;
	border-left: 1px solid #d8d8d8;
	border-right: 1px solid #d8d8d8;
	box-shadow: 1px 2px 5px rgb(0 0 0 / 10%);
	li {
		background-color: #f0f0f0;
		list-style: none;
	}
	a {
		display: block;
		padding: 10px 20px;
		text-align: left;
		border-bottom: 1px solid #d8d8d8;
		text-decoration: none;
		color: #666666;
		transition: 0.5s;
		:hover {
			color: #57c3e9;
		}
	}
	button {
		padding: 10px 26px;
		font-size: 14px;
		outline: none;
		border: none;
		font-size: 1em;
		text-align: left;
		color: #666666;
		background: transparent;
		transition: 0.5s;
		:hover {
			cursor: pointer;
			color: #57c3e9;
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
					<StyledHeaderUserNavBar>
						<span>
							{user.currentUser.displayName}
							<UserInfoUL>
								<li>
									<Link
										to={`/users/${user.currentUser.uid}`}
										state={{
											username: user.currentUser.displayName,
											userId: user.currentUser.uid,
										}}
									>
										マイページ
									</Link>
									<button onClick={logout}>ログアウト</button>
								</li>
							</UserInfoUL>
						</span>
						<Link className="post" to="#">
							投稿する
						</Link>
					</StyledHeaderUserNavBar>
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
