import axios from "axios";
import { BASE_URL, TOKEN } from "src/utils/environment";
import { useState } from "react";

// style
import styled from "styled-components";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchCard from "./SearchCard";
import PaginationBar from "src/components/PaginationBar";
import { useEffect } from "react";

const Search = () => {
	const [searchResult, setSearchResult] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [totalResultCount, setTotalResultCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	/**
	 * input폼이 제출되거나(엔터/아이콘클릭), 페이지가 업데이트 되면 getRepos api를 호출한다.
	 */
	useEffect(() => {
		if (!searchValue) {
			setCurrentPage(1);
			setSearchResult([]);
			setTotalResultCount(0);
			setIsFormSubmitted(false);
		} else {
			getRepos(searchValue);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFormSubmitted, currentPage]);

	/**
	 * 인풋에 작성되는 검색어를 저장합니다.
	 * @param e
	 */
	const handleSearch = (e) => {
		setSearchValue(e.target.value);
	};

	/**
	 * 인풋폼을 제출합니다.
	 * @param e
	 */
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setIsFormSubmitted(true);
		setCurrentPage(1);
	};

	/**
	 * 레포지토리 검색결과를 페이지네이션합니다.
	 * @param currentPage
	 */
	const handlePageChange = (currentPage: number) => {
		setCurrentPage(currentPage);
	};

	/**
	 * 레포지토리를 검색합니다.
	 * @param repo
	 */
	const getRepos = (repo: string) => {
		const PER_PAGE = 10;
		const currentOrder = "desc"; // desc | asc
		axios
			.get(
				`${BASE_URL}/search/repositories?q=${repo}&per_page=${PER_PAGE}&page=${currentPage}&order=${currentOrder}`,
				{
					headers: {
						Authorization: TOKEN,
					},
				}
			)
			.then((res) => {
				setSearchResult(res.data.items);
				setTotalResultCount(res.data.total_count);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setIsFormSubmitted(false);
			});
	};

	return (
		<Container>
			<Inner>
				<Title>레포지토리 검색</Title>

				{/* 검색창 */}
				<Form onSubmit={handleSearchSubmit}>
					<FormControl fullWidth>
						<OutlinedInput
							onChange={handleSearch}
							endAdornment={
								<InputAdornment position="start">
									<SearchIcon
										fontSize="large"
										type="submit"
										id={searchValue}
										onClick={handleSearchSubmit}
									/>
								</InputAdornment>
							}
							style={{
								borderRadius: "1.5rem",
								padding: ".1rem",
								fontSize: "1.4rem",
							}}
						/>
					</FormControl>
				</Form>

				{/* TODO: 조건 재설정  */}
				{searchValue && searchResult && (
					<Text>
						총 <strong>{totalResultCount.toLocaleString()}</strong>개의
						레포지토리가 검색되었어요!
					</Text>
				)}

				{/* 검색결과 */}
				<SearchCardBox>
					{!searchValue && searchResult?.length === 0 && (
						<EmptyBox>레포지토리를 검색하고, 북마크 해보세요!</EmptyBox>
					)}
					{searchResult?.map((repo) => {
						return <SearchCard repo={repo} key={repo.full_name} />;
					})}
				</SearchCardBox>

				{/* 페이지네이션 */}
				<PaginationBar
					totalPage={Math.ceil(totalResultCount / 10)}
					handlePageChange={handlePageChange}
					isChanged={isFormSubmitted}
				/>
			</Inner>
		</Container>
	);
};
export default Search;

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
	padding: 5rem 2rem;
	text-align: center;
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;

const Form = styled.form`
	box-shadow: 0.5rem 0.5rem 0.5rem lightgray;
	border-radius: 1.5rem;
	margin: 2rem;
`;

const SearchCardBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Text = styled.p`
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	padding: 0 3rem;
	margin-bottom: 2rem;
`;
