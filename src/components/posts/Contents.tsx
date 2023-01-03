import {
	collection,
	DocumentData,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase";

import Item from "./Item";

const StyledContents = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
`;

const Contents = () => {
	const [posts, setPosts] = useState<DocumentData[]>([]);
	const [docId, setDocId] = useState<string[]>([]);
	useEffect(() => {
		const postData = collection(db, "posts");
		const latestPosts = query(postData, orderBy("createAt", "desc"));
		onSnapshot(latestPosts, (querySnapshot) => {
			setPosts(querySnapshot.docs.map((doc) => doc.data()));
			setDocId(querySnapshot.docs.map((doc) => doc.id));
		});
	}, []);
	return (
		<StyledContents>
			{posts.map((post) => (
				<Item key={post.id} post={post} detail={false} docId={docId} />
			))}
		</StyledContents>
	);
};

export default Contents;
