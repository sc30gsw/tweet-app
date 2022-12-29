import { Link } from "react-router-dom";
import styled from "styled-components";

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
	return (
		<StyledHeader>
			<StyledHeaderBar>
				<StyledHeaderTitle>
					<Link to="/">PicTweet</Link>
				</StyledHeaderTitle>
				<StyledHeaderRightBar>
					<Link to="/signup">ログイン</Link>
					<Link to="/signup">新規登録</Link>
				</StyledHeaderRightBar>
			</StyledHeaderBar>
		</StyledHeader>
	);
};

export default Header;
