import React from "react";
import styled from "styled-components";
import useAuthState from "../../lib/AuthState";
import Footer from "../Footer";
import Header from "../Header";

const StyledContents = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
`;

const StyledContainer = styled.div`
	margin: 20px 0;
	padding: 30px;
	box-shadow: 0 0 10px rgb(41 41 41 / 20%);
	background-color: white;
	box-sizing: border-box;
	h3 {
		margin: 0 0 20px;
		text-align: center;
		font-weight: normal;
		font-size: 20px;
		color: #666;
	}
`;

const StyledTextInput = styled.input`
	width: 100%;
	margin: 5px 0 15px;
	padding: 10px;
	border: 1px solid #d8d8d8;
	border-radius: 5px;
	font-family: "游ゴシック", "YuGothic";
`;

const StyledTextArea = styled.textarea`
	width: 100%;
	margin: 5px 0 15px;
	padding: 10px;
	border: 1px solid #d8d8d8;
	border-radius: 5px;
	font-family: "游ゴシック", "YuGothic";
`;

const StyledSubmitBtn = styled.input`
	background-color: #57c3e9;
	border-radius: 20px;
	color: #fff;
	border: 0;
	font-size: 18px;
`;

const NewPost = () => {
	useAuthState();
	return (
		<>
			<Header />
			<StyledContents>
				<StyledContainer>
					<form>
						<h3>投稿する</h3>
						<StyledTextInput type="text" placeholder="Image Url" />
						<StyledTextArea rows={10} placeholder="text"></StyledTextArea>
						<StyledSubmitBtn type="submit" value="SEND" />
					</form>
				</StyledContainer>
			</StyledContents>
			<Footer />
		</>
	);
};

export default NewPost;
