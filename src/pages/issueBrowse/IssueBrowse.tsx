import React, { useEffect, useState } from "react";
import axios from "axios";
import { Issue } from "src/interfaces/issues";
import { BASE_URL } from "src/utils/environment";
import { getLocalStorage } from "src/utils/util";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookmarkArrayState, bookmarkState } from "src/atom/bookmarkState";

// components
import IssueCard from "./IssueCard";
import PaginationBar from "src/components/PaginationBar";

// style
import styled from "styled-components";
import { Chip, Skeleton } from "@mui/material";

const IssueBrowse = () => {
	const setBookmarkedByString = useSetRecoilState(bookmarkState);
	const bookmarkedArray = useRecoilValue(bookmarkArrayState);

	useEffect(() => {
		setBookmarkedByString(getLocalStorage("bookmarkedRepos"));
		if (bookmarkedArray === null || bookmarkedArray?.length === 0) {
			setHasBookmarkedRepo(false);
			setIssueList([]);
			setTotalPage(0);
			setCurrentPage(1);
			setIsIssueCardLoaded(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [issueList, setIssueList] = useState<Issue[]>([]);
	const [hasBookmarkedRepo, setHasBookmarkedRepo] = useState(false);
	const [currentRepo, setCurrentRepo] = useState(
		bookmarkedArray ? bookmarkedArray[0] : ""
	);
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [isIssueCardLoaded, setIsIssueCardLoaded] = useState(
		issueList.length > 0 ? true : false
	);

	/**
	 * 로컬스토리지에 저장된 레포지토리 여부에 따라 이슈 리스트 호출을 결정합니다.
	 */
	useEffect(() => {
		if (currentRepo) {
			setHasBookmarkedRepo(true);
			getIssues(currentRepo);
		} else {
			setHasBookmarkedRepo(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentRepo]);

	/**
	 * 페이지 혹은 선택된 레포지토리 정보가 업데이트 되면 다음 페이지 issue리스트를 호출합니다.
	 */
	useEffect(() => {
		getIssues(currentRepo);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentRepo, currentPage]);

	/**
	 * Issue List 데이터를 가져옵니다.
	 * @param name
	 */
	const getIssues = (url: string) => {
		const PER_PAGE = 10;
		const currentSorting = "created"; // created | updated |comments
		const currentDirection = "desc"; // desc | asc

		const lastPattern = /(?<=<)([\S]*)(?=>; rel="Last")/i;
		const totalPageRegx = /&page=(.*?)&/;

		axios
			.get(
				`${BASE_URL}/repos/${url}/issues?per_page=${PER_PAGE}&page=${currentPage}&sort=${currentSorting}&directions=${currentDirection}&state=all`
			)
			.then((res) => {
				const linkHeader = res.headers.link;
				const lastUrl = linkHeader?.match(lastPattern)[0];
				const totalPageBytString = lastUrl?.match(totalPageRegx)[1];

				setTotalPage(totalPageBytString ? Number(totalPageBytString) : 0);
				setIssueList([...res.data]);
				setIsIssueCardLoaded(true);
			})
			.catch((err) => {
				console.error(err);
				setIsIssueCardLoaded(false);
			});
	};

	/**
	 * 레포지토리별로 이슈를 정렬합니다.
	 * @param e
	 */
	const handleRepoSorting = (e: React.MouseEvent<HTMLDivElement>) => {
		setCurrentRepo(e.currentTarget.innerText);
	};

	/**
	 * 이슈카드 페이지네이션
	 * @param currentPage
	 */
	const handlePageChange = (currentPage: number) => {
		setCurrentPage(currentPage);
	};

	return (
		<Container>
			<Inner>
				<Title>이슈 모아보기</Title>
				<RepoButtonBox>
					{bookmarkedArray?.map((repo) => {
						return (
							<Chip
								key={repo}
								label={repo}
								color="primary" // TODO: theme 컿러 가져오기!!!
								style={{ fontSize: "1.4rem" }}
								variant={currentRepo === repo ? "filled" : "outlined"}
								onClick={(e) => handleRepoSorting(e)}
							/>
						);
					})}
				</RepoButtonBox>

				<IssueBox>
					{!hasBookmarkedRepo && (
						<EmptyBox>북마크된 레포지토리가 없어요!</EmptyBox>
					)}

					{hasBookmarkedRepo &&
						(isIssueCardLoaded && issueList.length === 0 ? (
							<EmptyBox>생성된 이슈가 없어요!</EmptyBox>
						) : !isIssueCardLoaded && issueList.length === 0 ? (
							[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
								return (
									<SkeletonBox key={`skeleton-${item}`}>
										<Skeleton
											variant="rounded"
											style={{ width: "100%", height: "10rem" }}
										/>
									</SkeletonBox>
								);
							})
						) : (
							issueList.map((issue, idx) => {
								return (
									<IssueCard issue={issue} key={`${idx}-${issue.user.login}`} />
								);
							})
						))}
				</IssueBox>
				{hasBookmarkedRepo && issueList && (
					<PaginationBar
						totalPage={totalPage}
						handlePageChange={handlePageChange}
					/>
				)}
			</Inner>
		</Container>
	);
};

export default IssueBrowse;

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

const RepoButtonBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 1rem 0;
	column-gap: 0.5rem;
	row-gap: 1rem;
	margin-bottom: 2rem;
`;

const IssueBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const SkeletonBox = styled.div`
	margin-bottom: 2rem;
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
