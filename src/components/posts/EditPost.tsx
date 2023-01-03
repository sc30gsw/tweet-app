import { doc, DocumentData, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
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
	transition: 0.5s;
	:hover {
		opacity: 0.7;
		cursor: pointer;
	}
`;

type State = {
	post: DocumentData;
	docId: string[];
};

const EditPost = () => {
	useAuthState();
	const location = useLocation();
	const { post, docId } = location.state as State;
	const [imageUrl, setImageUrl] = useState<string>(post.imageUrl);
	const [text, setText] = useState<string>(post.text);

	const handleChangeImageUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
		setImageUrl(e.target.value);

	const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setText(e.target.value);

	const navigate = useNavigate();

	const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (text !== "") {
			await updateDoc(doc(db, "posts", docId[0]), {
				image: imageUrl,
				text: text,
			});
			setImageUrl("");
			setText("");
			navigate("/posts/edit/confirm");
		} else {
			alert("textは空では更新できません。");
		}
	};

	return (
		<>
			<Header />
			<StyledContents>
				<StyledContainer>
					<form onSubmit={updatePost}>
						<h3>編集する</h3>
						<StyledTextInput
							type="text"
							placeholder="Image Url"
							onChange={handleChangeImageUrl}
						/>
						<StyledTextArea
							rows={10}
							value={text}
							onChange={handleChangeText}
						/>
						<StyledSubmitBtn type="submit" value="SEND" />
					</form>
				</StyledContainer>
			</StyledContents>
			<Footer />
		</>
	);
};

export default EditPost;
