import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookmarkArrayState, bookmarkState } from "src/atom/bookmarkState";
import { getLocalStorage } from "src/utils/util";

// components
import BookmarkCard from "./BookmarkCard";

const Bookmark = () => {
	const setBookmarkedByString = useSetRecoilState(bookmarkState);
	const bookmarkedArray = useRecoilValue(bookmarkArrayState);

	useEffect(() => {
		setBookmarkedByString(getLocalStorage("bookmarkedRepos"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<Inner>
				<Title>북마크 레포지토리</Title>
				<BookmarkBox>
					{bookmarkedArray === null || bookmarkedArray?.length === 0 ? (
						<EmptyBox>북마크한 레포지토리가 없어요!</EmptyBox>
					) : (
						bookmarkedArray?.map((repo) => {
							return (
								<BookmarkCard bookmarkedArray={bookmarkedArray} repo={repo} />
							);
						})
					)}
				</BookmarkBox>
			</Inner>
		</Container>
	);
};

export default Bookmark;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3rem 1rem;
`;

const Inner = styled.div`
	width: 100%;
	max-width: 80rem;
`;

const Title = styled.h1`
	text-align: start;
	font-size: ${({ theme }) => theme.typography.h1.fontSize};
	padding: 1rem;
`;

const EmptyBox = styled.div`
	width: 85%;
	background-color: white;
	padding: 5rem 2rem;
	box-shadow: 1rem 0.5rem 0.5rem lightgray;
	border: 1px solid #f9f8f8;
	border-radius: 1.5rem;
	text-align: center;
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;

const BookmarkBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
