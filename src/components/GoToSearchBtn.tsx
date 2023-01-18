import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";

const GoToSearchBtn = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<Button
				variant="contained"
				size="medium"
				aria-label="goToSearchBtn"
				onClick={() => navigate("/search")}
			>
				레포지토리 검색하러 가기
			</Button>
		</Container>
	);
};

export default GoToSearchBtn;

const Container = styled.div`
	padding: 1rem;
	margin-top: 1rem;

	button {
		background-color: ${({ theme }) => theme.palette.primary.main};
		font-size: ${({ theme }) => theme.typography.body2.fontSize};
	}
`;
