import { ArrowDropDown } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthProvider";

const StyledContents = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
`;

const StyledContentPost = styled.div`
	margin: 20px 0;
	padding: 30px;
	position: relative;
	height: 400px;
	color: #fff;
	background-size: cover;
	background-position: center center;
	border-radius: 3px;
	box-shadow: 0 0 10px rgb(41 41 41 / 20%);
	background-image: url("images/img1.jpeg");
	z-index: 1;
	border-radius: 3px;
`;

const StyledMore = styled.div`
	cursor: pointer;
	top: 20px;
	right: 30px;
	z-index: 2;
	height: 100px;
	width: 80px;
	text-align: right;
	position: absolute;
	:hover {
		ul {
			display: block;
		}
	}
`;

const StyledMoreUL = styled.ul`
	position: absolute;
	text-align: left;
	width: 80px;
	right: 0;
	font-size: 12px;
	background-color: #fff;
	border: 1px solid #ddd;
	box-shadow: 1px 1px 2px rgb(0 0 0 / 20%);
	border-radius: 3px;
	display: none;
	:hover {
		background-color: #57c3e9;
		a {
			color: #fff;
		}
	}
`;

const StyledMoreLI = styled.li`
	padding: 5px;
	display: block;
	a {
		color: gray;
		text-decoration: none;
	}
`;

const StyledPostText = styled.p`
	position: absolute;
	left: 30px;
	right: 100px;
	bottom: 30px;
	margin: 0;
	font-size: 20px;
	z-index: 2;
	font-weight: bold;
	text-shadow: 0 0 2px #000, 0 0 1px #000, 0 0 1px #000;
`;

const StyledPostUsername = styled.span`
	position: absolute;
	right: 30px;
	bottom: 30px;
	z-index: 2;
	font-size: 13px;
	a {
		text-decoration: none;
		display: block;
		color: #aaa;
		:hover {
			text-decoration: underline;
		}
	}
	span {
		font-size: 9px;
		display: block;
	}
`;

const Contents = () => {
	const user = useAuthContext();
	return (
		<StyledContents>
			<StyledContentPost>
				<StyledMore>
					<ArrowDropDown
						style={{
							position: "relative",
							color: "gray",
							fontSize: "35px",
						}}
					/>
					<StyledMoreUL>
						<StyledMoreLI>
							<Link to="#">詳細</Link>
						</StyledMoreLI>
					</StyledMoreUL>
				</StyledMore>
				<StyledPostText>投稿</StyledPostText>
				<StyledPostUsername>
					<Link to="#">
						<span>投稿者</span>
						{user.currentUser?.displayName}
					</Link>
				</StyledPostUsername>
			</StyledContentPost>
		</StyledContents>
	);
};

export default Contents;
