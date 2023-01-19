import { Link } from "react-router-dom";

// style
import styled from "styled-components";
import { IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
	return (
		<Container>
			<Inner>
				<Link to="/">
					<HomeBtn aria-label="home">ISSUE TRACKER</HomeBtn>
				</Link>
				<ButtonBox>
					<Link to="/bookmark">
						<IconButton aria-label="bookmark">
							<BookmarkIcon fontSize="large" />
						</IconButton>
					</Link>
					<Link to="/search">
						<IconButton aria-label="search">
							<SearchIcon fontSize="large" />
						</IconButton>
					</Link>
				</ButtonBox>
			</Inner>
		</Container>
	);
};

export default Header;

const Container = styled.header`
	position: fixed;
	top: 0;
	z-index: 999;
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 0;
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
	font-weight: 600;
	padding: 0 2rem;
`;

const ButtonBox = styled.div`
	display: flex;
	column-gap: 0.5rem;
	padding: 0 2rem;
`;
