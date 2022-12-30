import {
	collection,
	DocumentData,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import useAuthState from "../../lib/AuthState";
import Header from "../Header";
import Item from "../posts/Item";

const StyledText = styled.p`
	max-width: 660px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
`;

const StyledContents = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
`;

type State = {
	username: string;
	userId: string;
};

const Mypage = () => {
	useAuthState();
	const location = useLocation();
	const { username, userId } = location.state as State;
	const [posts, setPosts] = useState<DocumentData[]>([]);

	const postData = collection(db, "posts");
	const userPostData = query(postData, where("userId", "==", userId));
	onSnapshot(userPostData, (querySnapshot) => {
		setPosts(querySnapshot.docs.map((doc) => doc.data()));
	});

	return (
		<>
			<Header />
			<StyledText>{username}さんの投稿一覧</StyledText>
			<StyledContents>
				{posts.map((post) => (
					<Item key={post.id} post={post} />
				))}
			</StyledContents>
		</>
	);
};

export default Mypage;
