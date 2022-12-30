import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";

const StyledContents = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
	::before {
		content: " ";
		display: table;
	}
	::after {
		clear: both;
		content: " ";
		display: table;
	}
`;

const StyledSuccessDiv = styled.div`
	margin: 20px 0;
	padding: 30px;
	box-shadow: 0 0 10px rgb(41 41 41 / 20%);
	background-color: white;
	box-sizing: border-box;
	text-align: center;
	h3 {
		margin: 10px auto;
	}
	a {
		padding: 8px 20px;
		font-size: 14px;
		border: 2px solid #57c3e9;
		color: #57c3e9;
		font-weight: bold;
		text-align: center;
		border-radius: 3px;
		display: inline-block;
		transition: 0.5s;
		text-decoration: none;
		:hover {
			opacity: 0.7;
		}
	}
`;

const Confirm = () => {
	return (
		<>
			<Header />
			<StyledContents>
				<StyledSuccessDiv>
					<h3>投稿が完了しました。</h3>
					<Link to="/">投稿一覧へ戻る</Link>
				</StyledSuccessDiv>
			</StyledContents>
			<Footer />
		</>
	);
};

export default Confirm;
