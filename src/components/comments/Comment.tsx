import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCommentContainer = styled.div`
	padding: 5px;
	margin-top: 15px;
	a {
		color: #57c3e9;
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const Comment = () => {
	return (
		<StyledCommentContainer>
			<h4>＜コメント一覧＞</h4>
			<p>
				<strong>
					<Link to="#">ユーザー名</Link>：
				</strong>
				コメント
			</p>
		</StyledCommentContainer>
	);
};

export default Comment;
