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

	const user = useAuthContext();
	const username = user.currentUser?.displayName;

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
			{posts.map((post) => (
				<div key={post.id}>
					<StyledText>{post.username}さんの投稿一覧</StyledText>
					<StyledContents>
						<Item post={post} detail={false} docId={docId} />
					</StyledContents>
				</div>
			))}
			<Footer />
		</>
	);
};

export default Mypage;
