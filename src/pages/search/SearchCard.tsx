import { getLocalStorage } from "src/utils/util";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookmarkArrayState, bookmarkState } from "src/atom/bookmarkState";
import { SearchResult } from "src/interfaces/search";

// hooks
import useViewport from "src/hooks/useViewport";
import useBookmarkDelete from "src/hooks/useBookmarkDelete";
import useBookmarkAdd from "src/hooks/useBookmarkAdd";

// style
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Chip, IconButton } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const SearchCard = ({ repo }: { repo: SearchResult }) => {
	const { isMobile } = useViewport();

	const handleBookmarkDelete = useBookmarkDelete();
	const handleBookMarkAdd = useBookmarkAdd();

	const setBookmarkedByString = useSetRecoilState(bookmarkState);
	const bookmarkedArray = useRecoilValue(bookmarkArrayState);
	const [starCount, setStarCount] = useState("0");

	useEffect(() => {
		const getBookmarkedRepos = getLocalStorage("bookmarkedRepos");
		typeof getBookmarkedRepos === "string" &&
			setBookmarkedByString(getBookmarkedRepos);

		/**
		 * star 갯수 포맷  ex) 12345 -> 12K
		 */
		const formatter = new Intl.NumberFormat("en", { notation: "compact" });
		const formattedNumber = formatter.format(repo?.stargazers_count);
		setStarCount(formattedNumber);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container props={isMobile}>
			<FlexBox props="title">
				<IconButton>
					{bookmarkedArray?.includes(repo.full_name) ? (
						<BookmarkIcon
							id={repo.full_name}
							fontSize="large"
							color="primary"
							onClick={(e) => handleBookmarkDelete(e.currentTarget.id)}
						/>
					) : (
						<BookmarkBorderIcon
							id={repo.full_name}
							fontSize="large"
							color="primary"
							onClick={(e) => handleBookMarkAdd(e.currentTarget.id)}
						/>
					)}
				</IconButton>

				<Title>{repo.full_name}</Title>
			</FlexBox>
			<Text props="marginLeft">{repo.description}</Text>
			<FlexBox>
				<div style={{ display: "flex" }}>
					<StarOutlineIcon fontSize="medium" />
					<Text>{starCount}</Text>
				</div>
				<Text>{repo.language}</Text>

				<Text>Updated {format(repo.updated_at)}</Text>
			</FlexBox>
			<ChipBox>
				{repo.topics?.map((topic: string) => {
					return <Chip label={topic} size="small" key={`chip-${topic}`} />;
				})}
			</ChipBox>
		</Container>
	);
};

export default SearchCard;

const Container = styled.div<{ props: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	row-gap: 0.6rem;
	width: ${(props) => (props.props ? "85%" : "95%")};
	background-color: white;
	padding: 2rem;
	box-shadow: 1rem 0.5rem 0.5rem lightgray;
	border: 1px solid #f9f8f8;
	border-radius: 1.5rem;
	margin-bottom: 2rem;
`;

const FlexBox = styled.div<{ props?: string }>`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	column-gap: ${(props) => (props.props === "title" ? "0" : "1rem")};
	margin-left: ${(props) => (props.props !== "title" ? "1rem" : "0")};
`;

const Title = styled.h3`
	font-size: ${({ theme }) => theme.typography.h3.fontSize};
	color: ${({ theme }) => theme.palette.primary.main};
	font-weight: 500;
`;

const Text = styled.div<{ props?: string }>`
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	margin-left: ${(props) => (props.props === "marginLeft" ? "1rem" : "0")};
`;

const ChipBox = styled(FlexBox)`
	flex-wrap: wrap;
	row-gap: 0.5rem;
	margin-left: 1rem;
`;
