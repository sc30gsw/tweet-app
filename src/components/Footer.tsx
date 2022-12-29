import styled from "styled-components";

const StyledFooter = styled.footer`
	margin: 30px auto;
	padding: 10px;
	color: #d8d8d8;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<p style={{ textAlign: "center" }}>Copyright PicTweet 2022. </p>
		</StyledFooter>
	);
};

export default Footer;
