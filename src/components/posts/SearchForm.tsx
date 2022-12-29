import React from "react";
import styled from "styled-components";

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
	return (
		<StyledSearchForm>
			<StyledSearchInput placeholder="投稿を検索する" type="text" />
			<StyledSearchBtn type="submit" value="検索" />
		</StyledSearchForm>
	);
};

export default SearchForm;
