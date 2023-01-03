import {
	collection,
	DocumentData,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthProvider";
import { db } from "../../firebase/firebase";
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

type Props = {
	confirmText: string;
};

const Confirm = ({ confirmText }: Props) => {
	const params = useParams();
	const postId = params.id;

	const currentUser = useAuthContext().currentUser;

	const [posts, setPosts] = useState<DocumentData[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (postId) {
			const postData = collection(db, "posts");
			const postDetailData = query(postData, where("id", "==", postId));
			onSnapshot(postDetailData, (querySnapshot) => {
				setPosts(querySnapshot.docs.map((doc) => doc.data()));
			});

			posts.map((post) => {
				if (post.userId !== currentUser?.uid) {
					navigate("/");
				}
			});
		}
	}, [posts]);

	return (
		<>
			<Header />
			<StyledContents>
				<StyledSuccessDiv>
					<h3>{confirmText}が完了しました。</h3>
					<Link to="/">投稿一覧へ戻る</Link>
				</StyledSuccessDiv>
			</StyledContents>
			<Footer />
		</>
	);
};

export default Confirm;
