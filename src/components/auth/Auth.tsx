import { LockOutlined } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import styled from "styled-components";

const StyledChangeDiv = styled.div`
	margin-top: 10px;
	& a {
		color: #1976d2;
		text-decoration: none;
	}
	& :hover {
		text-decoration: underline;
		opacity: 0.7;
	}
`;

const Auth = () => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setName(e.currentTarget.value);
	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.currentTarget.value);
	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.currentTarget.value);

	const navigate = useNavigate();
	const Register = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				updateProfile(userCredential.user, {
					displayName: name,
				});
				navigate("/");
			})
			.catch((e) => {
				alert(e.message);
			});
	};

	return (
		<>
			<Container>
				<form onSubmit={Register}>
					<Paper
						elevation={3}
						sx={{
							p: 4,
							height: "100%",
							width: "50%",
							m: "20px auto",
						}}
					>
						<Grid container direction="column" alignItems="center">
							<Avatar sx={{ bgcolor: teal[400] }}>
								<LockOutlined />
							</Avatar>
							<Typography variant={"h5"} sx={{ m: "30px" }}>
								Sign Up
							</Typography>
						</Grid>
						<TextField
							style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
							name="name"
							label="name"
							variant="outlined"
							fullWidth
							value={name}
							onChange={handleChangeName}
						/>
						<TextField
							style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
							name="email"
							label="email"
							variant="outlined"
							fullWidth
							value={email}
							onChange={handleChangeEmail}
						/>
						<TextField
							style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
							type="password"
							name="password"
							label="Password"
							variant="outlined"
							fullWidth
							value={password}
							onChange={handleChangePassword}
						/>
						<Box mt={3}>
							<Button
								type="submit"
								color="primary"
								variant="contained"
								fullWidth
							>
								Sign Up
							</Button>
						</Box>
						<StyledChangeDiv>
							アカウントをお持ちの方は
							<Link to="/login">こちら</Link>
						</StyledChangeDiv>
					</Paper>
				</form>
			</Container>
		</>
	);
};

export default Auth;
