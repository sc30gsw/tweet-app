import {
	collection,
	DocumentData,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import useAuthState from "../../lib/AuthState";
import Footer from "../Footer";
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
	const [docId, setDocId] = useState<string[]>([]);

	const postData = collection(db, "posts");
	useEffect(() => {
		const userPostData = query(
			postData,
			where("userId", "==", userId),
			orderBy("createAt", "desc")
		);
		onSnapshot(userPostData, (querySnapshot) => {
			setPosts(querySnapshot.docs.map((doc) => doc.data()));
			setDocId(querySnapshot.docs.map((doc) => doc.id));
		});
	}, []);

	return (
		<>
			<Header />
			<StyledText>{username}さんの投稿一覧</StyledText>
			<StyledContents>
				{posts.map((post) => (
					<Item key={post.id} post={post} detail={false} docId={docId} />
				))}
			</StyledContents>
			<Footer />
		</>
	);
};

export default Mypage;
