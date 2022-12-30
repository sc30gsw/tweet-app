import { collection, DocumentData, getDocs } from "firebase/firestore";
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
	useEffect(() => {
		const postData = collection(db, "posts");
		getDocs(postData).then((querySnapshot) => {
			setPosts(querySnapshot.docs.map((doc) => doc.data()));
		});
	}, []);
	return (
		<StyledContents>
			{posts.map((post) => (
				<Item key={post.id} post={post} />
			))}
		</StyledContents>
	);
};

export default Contents;
