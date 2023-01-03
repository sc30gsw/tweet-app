import { ArrowDropDown } from "@mui/icons-material";
import { display } from "@mui/system";
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthProvider";
import { db } from "../../firebase/firebase";

const StyledContentPost = styled.div`
	margin: 20px 0;
	padding: 30px;
	position: relative;
	height: 400px;
	color: #fff;
	background-size: cover;
	background-position: center center;
	border-radius: 3px;
	box-shadow: 0 0 10px rgb(41 41 41 / 20%);
	z-index: 1;
	border-radius: 3px;
`;

const StyledMore = styled.div`
	cursor: pointer;
	top: 20px;
	right: 30px;
	z-index: 2;
	height: 100px;
	width: 80px;
	text-align: right;
	position: absolute;
	:hover {
		ul {
			display: block;
		}
	}
`;

const StyledMoreUL = styled.ul`
	position: absolute;
	text-align: left;
	width: 80px;
	right: 0;
	font-size: 12px;
	background-color: #fff;
	border: 1px solid #ddd;
	box-shadow: 1px 1px 2px rgb(0 0 0 / 20%);
	border-radius: 3px;
	display: none;
`;

const StyledMoreLI = styled.li`
	padding: 5px;
	display: block;
	a {
		color: gray;
		text-decoration: none;
	}
	:hover {
		background-color: #57c3e9;
		a {
			color: #fff;
		}
		button {
			color: #fff;
		}
	}
`;

const StyledDeleteBtn = styled.button`
	color: gray;
	outline: none;
	border: none;
	background-color: transparent;
	font-size: 12px;
	text-align: left;
	padding: 0;
	cursor: pointer;
`;

const StyledPostText = styled.p`
	position: absolute;
	left: 30px;
	right: 100px;
	bottom: 30px;
	margin: 0;
	font-size: 20px;
	z-index: 2;
	font-weight: bold;
	text-shadow: 0 0 2px #000, 0 0 1px #000, 0 0 1px #000;
`;

const StyledPostUsername = styled.span`
	position: absolute;
	right: 30px;
	bottom: 30px;
	z-index: 2;
	font-size: 13px;
	a {
		text-decoration: none;
		display: block;
		color: #aaa;
		:hover {
			text-decoration: underline;
		}
	}
	span {
		font-size: 9px;
		display: block;
	}
`;

type Props = {
	post: DocumentData;
	detail: boolean;
};

const Item = ({ post, detail }: Props) => {
	const user = useAuthContext().currentUser;
	const currentUserId = user?.uid;

	const [docId, setDocId] = useState<string[]>([]);
	const postData = collection(db, "posts");
	useEffect(() => {
		const postDetailData = query(postData, where("id", "==", post.id));
		onSnapshot(postDetailData, (querySnapshot) => {
			setDocId(querySnapshot.docs.map((doc) => doc.id));
		});
	}, []);

	const deletePost = async () => {
		await deleteDoc(doc(db, "posts", docId[0]));
	};

	return (
		<>
			<StyledContentPost
				key={post.id}
				style={{ backgroundImage: `url(${post.image})` }}
			>
				<StyledMore>
					<ArrowDropDown
						style={{
							position: "relative",
							color: "gray",
							fontSize: "35px",
						}}
					/>
					{post.userId === currentUserId ? (
						<StyledMoreUL>
							{/* 詳細画面で詳細画面に遷移するためのリンクを表示しないようにするための判定 */}
							{detail || (
								<StyledMoreLI>
									<Link to={`/post/${post.id}`}>詳細</Link>
								</StyledMoreLI>
							)}
							<StyledMoreLI>
								<Link to={`/post/edit/${post.id}`}>編集</Link>
							</StyledMoreLI>
							<StyledMoreLI>
								<StyledDeleteBtn onClick={deletePost}>
									<Link to={`/post/delete/${post.id}`}>削除</Link>
								</StyledDeleteBtn>
							</StyledMoreLI>
						</StyledMoreUL>
					) : (
						<StyledMoreUL>
							{/* 詳細画面で詳細画面に遷移するためのリンクを表示しないようにするための判定 */}
							{detail || (
								<StyledMoreLI>
									<Link to={`/post/${post.id}`}>詳細</Link>
								</StyledMoreLI>
							)}
						</StyledMoreUL>
					)}
				</StyledMore>
				<StyledPostText>{post.text}</StyledPostText>
				<StyledPostUsername>
					<Link to={`/users/${post.userId}`}>
						<span>投稿者</span>
						{post.username}
					</Link>
				</StyledPostUsername>
			</StyledContentPost>
		</>
	);
};

export default Item;
