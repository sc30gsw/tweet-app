import { getAuth } from "firebase/auth";
import {
	collection,
	DocumentData,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthProvider";
import { db } from "../../firebase/firebase";
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

const Mypage = () => {
	const params = useParams();
	const userId = params.userId;

	const [posts, setPosts] = useState<DocumentData[]>([]);
	const [username, setUsername] = useState<string>("");

	const postData = collection(db, "posts");

	useEffect(() => {
		const userPostData = query(
			postData,
			where("userId", "==", userId),
			orderBy("createAt", "desc")
		);
		onSnapshot(userPostData, (querySnapshot) => {
			setPosts(querySnapshot.docs.map((doc) => doc.data()));
		});
		posts.map((post) => setUsername(post.username));
	}, [posts]);

	return (
		<>
			<Header />
			<StyledText>{username}さんの投稿一覧</StyledText>
			<StyledContents>
				{posts.map((post) => (
					<Item key={post.id} post={post} detail={false} />
				))}
			</StyledContents>
			<Footer />
		</>
	);
};

export default Mypage;
