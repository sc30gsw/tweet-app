import React from "react";
import styled from "styled-components";

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
	return (
		<form>
			<StyledCommentArea
				placeholder="コメントする"
				rows={2}
			></StyledCommentArea>
			<StyledCommentBtn type="submit" value="SEND" />
		</form>
	);
};

export default CommentForm;
