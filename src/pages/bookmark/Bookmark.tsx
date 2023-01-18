import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { bookmarkArrayState } from "src/atom/bookmarkState";

// components
import BookmarkCard from "./BookmarkCard";
import GoToSearchBtn from "src/components/GoToSearchBtn";

const Bookmark = () => {
	const [bookmarkList, setBookmarkList] = useState([]);
	const bookmarkedArray = useRecoilValue(bookmarkArrayState);

	useEffect(() => {
		setBookmarkList(bookmarkedArray);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bookmarkedArray]);

	return (
		<Container>
			<Inner>
				<Title>나의 레포지토리</Title>
				<BookmarkBox>
					{bookmarkList === null || bookmarkList?.length === 0 ? (
						<EmptyBox>
							북마크한 레포지토리가 없어요!
							<GoToSearchBtn />
						</EmptyBox>
					) : (
						bookmarkedArray?.map((repo: string) => {
							return <BookmarkCard repo={repo} key={repo} />;
						})
					)}
				</BookmarkBox>
			</Inner>
		</Container>
	);
};

export default Bookmark;

const Container = styled.main`
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
	padding: 1rem 2rem;
`;

const EmptyBox = styled.div`
	width: 85%;
	background-color: white;
	padding: 3rem 2rem;
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
