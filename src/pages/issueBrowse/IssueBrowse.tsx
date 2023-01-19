import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Issue } from "src/interfaces/issues";
import { BASE_URL } from "src/utils/environment";
import { useRecoilValue } from "recoil";
import { bookmarkArrayState } from "src/atom/bookmarkState";
import { PER_PAGE } from "src/constants/pagination";

// style
import styled from "styled-components";
import { Chip } from "@mui/material";

// components
import IssueCard from "./IssueCard";
import BoxSkeleton from "src/components/BoxSkeleton";
import GoToSearchBtn from "src/components/GoToSearchBtn";
const PaginationBar = lazy(() => import("src/components/PaginationBar"));

const IssueBrowse = () => {
	const bookmarkedArray = useRecoilValue(bookmarkArrayState);
	const [issueList, setIssueList] = useState<Issue[]>([]);
	const [hasBookmarkedRepo, setHasBookmarkedRepo] = useState(false);
	const [currentRepo, setCurrentRepo] = useState("");
	const [isNewRepoClicked, setIsNewRepoClicked] = useState(false);
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [isIssueCardLoaded, setIsIssueCardLoaded] = useState(
		issueList?.length > 0 ? true : false
	);

	/**
	 * 패이지네이션 시 스크롤 상단으로 이동
	 */
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [currentPage]);

	useEffect(() => {
		if (bookmarkedArray === null || bookmarkedArray?.length === 0) {
			setHasBookmarkedRepo(false);
			setIssueList([]);
			setTotalPage(0);
			setCurrentPage(1);
			setIsIssueCardLoaded(false);
		} else {
			setCurrentRepo(bookmarkedArray[0]);
			setHasBookmarkedRepo(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bookmarkedArray]);

	/**
	 * 로컬스토리지에 저장된 레포지토리 여부에 따라 이슈 리스트 호출을 결정합니다.
	 */
	useEffect(() => {
		if (!currentRepo || !currentPage) return setHasBookmarkedRepo(false);
		setHasBookmarkedRepo(true);
		getIssues(currentRepo, 1);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentRepo]);

	/**
	 * currentPage가 업데이트되면 이슈 리스를 호출합니다.
	 */
	useEffect(() => {
		if (!currentRepo || !currentPage) return;
		getIssues(currentRepo, currentPage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	/**
	 * Issue List 데이터를 가져옵니다.
	 * @param name
	 */
	const getIssues = (url: string, page: number) => {
		const currentSorting = "updated"; // created | updated |comments
		const currentDirection = "desc"; // desc | asc

		const lastPattern = /(?<=<)([\S]*)(?=>; rel="Last")/i;
		const totalPageRegx = /&page=(.*?)&/;

		axios
			.get(
				`${BASE_URL}/repos/${url}/issues?per_page=${PER_PAGE}&page=${page}&sort=${currentSorting}&directions=${currentDirection}&state=all`,
				{
					headers: {
						// Authorization: `token ${TOKEN}`,
					},
				}
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
			})
			.finally(() => {
				setIsNewRepoClicked(false);
			});
	};

	/**
	 * 레포지토리별로 이슈를 정렬합니다.
	 * @param e
	 */
	const handleRepoSorting = (e: React.MouseEvent<HTMLDivElement>) => {
		setCurrentRepo(e.currentTarget.innerText);
		setIsNewRepoClicked(true);
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
				{bookmarkedArray?.length !== 0 && (
					<RepoButtonBox>
						{bookmarkedArray?.map((repo: string) => {
							return (
								<Chip
									key={repo}
									label={repo}
									color="primary"
									style={{ fontSize: "1.4rem" }}
									variant={currentRepo === repo ? "filled" : "outlined"}
									onClick={handleRepoSorting}
								/>
							);
						})}
					</RepoButtonBox>
				)}

				<IssueBox>
					{!hasBookmarkedRepo && (
						<EmptyBox>
							레포지토리를 검색하고 이슈를 모아보세요!
							<GoToSearchBtn />
						</EmptyBox>
					)}
					{hasBookmarkedRepo &&
						(isIssueCardLoaded && issueList.length === 0 ? (
							<EmptyBox>생성된 이슈가 없어요!</EmptyBox>
						) : !isIssueCardLoaded && issueList.length === 0 ? (
							[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
								return <BoxSkeleton key={`skeleton-${item}`} />;
							})
						) : (
							issueList.map((issue, idx) => {
								return (
									<IssueCard
										issue={issue}
										currentRepo={currentRepo}
										key={`${idx}-${issue.user.login}`}
									/>
								);
							})
						))}
				</IssueBox>

				{/* 페이지네이션 */}
				<Suspense fallback={null}>
					{hasBookmarkedRepo && issueList && (
						<PaginationBar
							totalPage={totalPage}
							handlePageChange={handlePageChange}
							isChanged={isNewRepoClicked}
						/>
					)}
				</Suspense>
			</Inner>
		</Container>
	);
};

export default IssueBrowse;

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

const RepoButtonBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 1rem 0;
	column-gap: 0.5rem;
	row-gap: 1rem;
	margin-bottom: 2rem;

	.MuiChip-filledPrimary {
		background-color: ${({ theme }) => theme.palette.primary.main};
		&:hover {
			background-color: ${({ theme }) => theme.palette.primary.main};
		}
	}
	.MuiChip-outlinedPrimary {
		color: ${({ theme }) => theme.palette.primary.main};
		&:hover {
			color: ${({ theme }) => theme.palette.primary.main};
		}
	}
`;

const IssueBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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
