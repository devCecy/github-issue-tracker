import { useNavigate } from "react-router-dom";

// style
import styled from "styled-components";
import { IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Inner>
				<HomeBtn onClick={() => navigate("/")}>ISSUE TRACKER</HomeBtn>
				<ButtonBox>
					<IconButton onClick={() => navigate("/bookmark")}>
						{/* TODO: color	변경 */}
						<BookmarkIcon fontSize="large" />
					</IconButton>
					<IconButton onClick={() => navigate("/search")}>
						<SearchIcon fontSize="large" />
					</IconButton>
				</ButtonBox>
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

const ButtonBox = styled.div`
	display: flex;
	column-gap: 0.5rem;
`;
