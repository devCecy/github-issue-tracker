import { useNavigate } from "react-router-dom";

// style
import styled from "styled-components";
import { Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Header = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Inner>
				<HomeBtn onClick={() => navigate("/")}>ISSUE TRACKER</HomeBtn>
				<div>
					<Button>
						<BookmarkIcon
							fontSize="large"
							color="inherit"
							onClick={() => navigate("/bookmark")}
						/>
					</Button>
					<Button variant="text">Search</Button>
				</div>
			</Inner>
		</Container>
	);
};

export default Header;

const Container = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Inner = styled.div`
	width: 100%;
	max-width: 80rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HomeBtn = styled.button`
	color: white;
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	font-weight: 500;
`;
