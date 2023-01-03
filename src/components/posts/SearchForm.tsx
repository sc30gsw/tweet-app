import {
	collection,
	DocumentData,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import Contents from "./Contents";

const StyledSearchForm = styled.form`
	text-align: center;
	padding-top: 32px;
`;

const StyledSearchInput = styled.input`
	width: 30%;
	margin-right: 10px;
	border: 1px solid #d8d8d8;
`;

const StyledSearchBtn = styled.input`
	width: 10%;
	background-color: #57c3e9;
	border-radius: 20px;
	color: #fff;
	border: 0;
	font-size: 18px;
	cursor: pointer;
	:hover {
		opacity: 0.7;
	}
`;

const SearchForm = () => {
	const [posts, setPosts] = useState<DocumentData[]>([]);

	useEffect(() => {
		const postData = collection(db, "posts");
		const latestPosts = query(postData, orderBy("createAt", "desc"));
		onSnapshot(latestPosts, (querySnapshot) => {
			setPosts(querySnapshot.docs.map((doc) => doc.data()));
		});
	}, []);

	const [searchText, setSearchText] = useState<string>("");

	const getSearchText = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchText(e.target.value);

	const searchPosts = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (searchText !== "") {
			const postData = collection(db, "posts");
			const searchResults = query(postData, where("text", ">=", searchText));
			onSnapshot(searchResults, (querySnapshot) => {
				setPosts(querySnapshot.docs.map((doc) => doc.data()));
			});
		}
		setSearchText("");
	};

	return (
		<>
			<StyledSearchForm onSubmit={searchPosts}>
				<StyledSearchInput
					placeholder="投稿を検索する"
					value={searchText}
					type="text"
					onChange={getSearchText}
				/>
				<StyledSearchBtn type="submit" value="検索" />
			</StyledSearchForm>
			<Contents posts={posts} />
		</>
	);
};

export default SearchForm;
