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

	useEffect(() => {
		if (!searchValue) {
			setCurrentPage(1);
			setSearchResult([]);
			setTotalResultCount(0);
		} else {
			getRepos(searchValue);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, currentPage]);
	/**
	 *
	 * @param e
	 */
	const handleSearch = (e) => {
		setSearchValue(e.target.value);
	};

	/**
	 * Issue List 데이터를 가져옵니다.
	 * @param name
	 */
	const getRepos = (org: string) => {
		const PER_PAGE = 10;
		// const currentSorting = "created"; // created | updated |comments
		const currentOrder = "desc"; // desc | asc
		//
		axios
			.get(
				`${BASE_URL}/search/repositories?q=${org}&per_page=${PER_PAGE}&page=${currentPage}&order=${currentOrder}`,
				{
					headers: {
						Authorization: TOKEN,
					},
				}
			)
			.then((res) => {
				setSearchResult(res.data.items);
				setTotalResultCount(res.data.total_count);
				console.log("res", res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	/**
	 * 레포지토 검색결과 페이지네이션
	 * @param currentPage
	 */
	const handlePageChange = (currentPage: number) => {
		setCurrentPage(currentPage);
	};

	return (
		<Container>
			<Inner>
				<Title>레포지토리 검색</Title>

				<Form>
					<FormControl fullWidth>
						<OutlinedInput
							value={searchValue}
							onChange={handleSearch}
							endAdornment={
								<InputAdornment position="start">
									<SearchIcon fontSize="large" />
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
				{searchValue && (
					<Text>
						총 <strong>{totalResultCount}</strong>개의 레포지토리가
						검색되었어요!
					</Text>
				)}

				<SearchCardBox>
					{searchResult?.length === 0 && (
						<EmptyBox>레포지토리를 검색하고, 북마크 해보세요!</EmptyBox>
					)}
					{searchResult?.map((repo) => {
						return <SearchCard repo={repo} key={repo.full_name} />;
					})}
				</SearchCardBox>
				<PaginationBar
					totalPage={Math.ceil(totalResultCount / 10)}
					handlePageChange={handlePageChange}
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

const Form = styled.div`
	box-shadow: 0.5rem 0.5rem 0.5rem lightgray;
	border-radius: 1.5rem;
	margin-bottom: 2rem;
`;

const SearchCardBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Text = styled.p`
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	padding: 0 1rem;
	margin-bottom: 2rem;
`;
