import {
	collection,
	DocumentData,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import Comment from "../comments/Comment";
import CommentForm from "../comments/CommentForm";
import Footer from "../Footer";
import Header from "../Header";
import Item from "./Item";

const StyledContents = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
`;

const StyledCommentContainer = styled.div`
	margin: 20px 0;
	padding: 30px;
	box-shadow: 0 0 10px rgb(41 41 41 / 20%);
	background-color: white;
	box-sizing: border-box;
`;

const Detail = () => {
	const params = useParams();
	const postId = params.id;

	const [posts, setPosts] = useState<DocumentData[]>([]);
	const postData = collection(db, "posts");
	useEffect(() => {
		const postDetailData = query(postData, where("id", "==", postId));
		onSnapshot(postDetailData, (querySnapshot) => {
			setPosts(querySnapshot.docs.map((doc) => doc.data()));
		});
	}, []);

	return (
		<>
			<Header />
			<StyledContents>
				{posts.map((post) => (
					<Item key={post.id} post={post} detail />
				))}
				<StyledCommentContainer>
					<CommentForm />
					<Comment />
				</StyledCommentContainer>
			</StyledContents>
			<Footer />
		</>
	);
};

export default Detail;
