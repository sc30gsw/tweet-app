import { LockOutlined } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase/firebase";

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

const AuthLogin = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.currentTarget.value);
	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.currentTarget.value);

	const navigate = useNavigate();
	const Login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				navigate("/");
			})
			.catch((e) => {
				alert(e.message);
			});
	};
	return (
		<>
			<Container>
				<form onSubmit={Login}>
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
						<FormControlLabel
							labelPlacement="end"
							label="パスワードを忘れました"
							control={
								<Checkbox name="checkboxA" size="small" color="primary" />
							}
						/>
						<Box mt={3}>
							<Button
								type="submit"
								color="primary"
								variant="contained"
								fullWidth
							>
								Sign In
							</Button>
						</Box>
						<StyledChangeDiv>
							アカウントをお持ちでない方は
							<Link to="/signup">こちら</Link>
						</StyledChangeDiv>
					</Paper>
				</form>
			</Container>
		</>
	);
};

export default AuthLogin;
