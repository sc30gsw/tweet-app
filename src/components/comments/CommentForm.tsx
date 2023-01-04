import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthProvider";
import Comment from "./Comment";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";

const StyledCommentArea = styled.textarea`
	width: 100%;
	margin: 5px 0 15px;
	padding: 10px;
	border: 1px solid #d8d8d8;
	border-radius: 5px;
	font-family: "游ゴシック", "YuGothic";
`;

const StyledCommentBtn = styled.input`
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

const CommentForm = () => {
	const currentUser = useAuthContext().currentUser;
	const params = useParams();
	const postId = params.id;

	const [text, setText] = useState<string>("");
	const [errMsg, setErrMsg] = useState<string>("");

	const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setText(e.target.value);

	const createComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newComment = {
			id: uuid(),
			text: text,
			postId: postId,
			userId: currentUser?.uid,
			username: currentUser?.displayName,
			createAt: serverTimestamp(),
		};
		if (text !== "") {
			await addDoc(collection(db, "comments"), newComment);
			setText("");
			setErrMsg("");
		} else {
			setErrMsg("textは空では投稿できません。");
		}
	};

	return (
		<>
			{currentUser && (
				<form onSubmit={createComment}>
					<span style={{ color: "red" }}>
						<b>{errMsg}</b>
					</span>
					<StyledCommentArea
						placeholder="コメントする"
						value={text}
						onChange={handleChangeText}
						rows={2}
					></StyledCommentArea>
					<StyledCommentBtn type="submit" value="SEND" />
				</form>
			)}
		</>
	);
};

export default CommentForm;
