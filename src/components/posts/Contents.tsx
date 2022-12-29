import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useCurrentUser from "../../lib/UseCurretUser";

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
`;

const StyledMore = styled.div`
	position: absolute;
	cursor: pointer;
	top: 20px;
	right: 30px;
	z-index: 2;
	height: 100px;
	width: 80px;
	text-align: right;
`;

const StyledMoreUL = styled.ul`
	position: absolute;
	text-align: left;
	width: 80px;
	right: 0;
	font-size: 12px;
	background-color: #fff;
	border: 1px solid #ddd;
	display: none;
	box-shadow: 1px 1px 2px rgb(0 0 0 / 20%);
	border-radius: 3px;
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
	& a {
		text-decoration: none;
		display: block;
		color: #aaa;
		:hover {
			text-decoration: underline;
		}
	}
	& span {
		font-size: 9px;
		display: block;
	}
`;
const Contents = () => {
	const user = useCurrentUser();
	return (
		<StyledContents>
			<StyledContentPost>
				<StyledMore>
					<span>
						<img src="images/arrow.png" />
					</span>
					<StyledMoreUL>
						<li>
							<Link to="#">詳細</Link>
						</li>
					</StyledMoreUL>
				</StyledMore>
				<StyledPostText>投稿</StyledPostText>
				<StyledPostUsername>
					<Link to="#">
						<span>投稿者</span>
						{user?.username}
					</Link>
				</StyledPostUsername>
			</StyledContentPost>
		</StyledContents>
	);
};

export default Contents;
