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
import SearchForm from "./SearchForm";

const StyledContents = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
	margin-bottom: 0;
	max-width: 660px;
`;

type Props = {
	posts: DocumentData[];
};

const Contents = ({ posts }: Props) => {
	return (
		<StyledContents>
			{posts.map((post) => (
				<Item key={post.id} post={post} detail={false} />
			))}
		</StyledContents>
	);
};

export default Contents;
