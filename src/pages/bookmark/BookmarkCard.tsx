import useBookmarkDelete from "src/hooks/useBookmarkDelete";

// style
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Button } from "@mui/material";

const BookmarkCard = ({ repo }: { repo: string }) => {
	const handleBookmarkDelete = useBookmarkDelete();

	return (
		<CardContainer>
			<Button>
				<BookmarkIcon
					id={repo}
					fontSize="large"
					onClick={(e) => handleBookmarkDelete(e.currentTarget.id)}
				/>
			</Button>
			<Title>{repo}</Title>
		</CardContainer>
	);
};

export default BookmarkCard;

const CardContainer = styled.div`
	display: flex;
	align-items: center;
	width: 85%;
	background-color: white;
	padding: 2rem;
	box-shadow: 1rem 0.5rem 0.5rem lightgray;
	border: 1px solid #f9f8f8;
	border-radius: 1.5rem;
	margin-bottom: 2rem;
`;

const Title = styled.div`
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	font-weight: 500;
`;
