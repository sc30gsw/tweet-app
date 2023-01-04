import {
	collection,
	DocumentData,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase/firebase";

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
	const params = useParams();
	const postId = params.id;

	const [comments, setComments] = useState<DocumentData[]>([]);
	const commentsData = collection(db, "comments");
	useEffect(() => {
		const latestComments = query(
			commentsData,
			where("postId", "==", postId),
			orderBy("createAt", "desc")
		);
		onSnapshot(latestComments, (querySnapshot) => {
			setComments(querySnapshot.docs.map((doc) => doc.data()));
		});
	}, []);

	return (
		<StyledCommentContainer>
			<h4>＜コメント一覧＞</h4>
			{comments.map((comment) => (
				<p key={comment.id}>
					<strong>
						<Link to={`/users/${comment.userId}`}>{comment.username}</Link>：
					</strong>
					{comment.text}
				</p>
			))}
		</StyledCommentContainer>
	);
};

export default Comment;
