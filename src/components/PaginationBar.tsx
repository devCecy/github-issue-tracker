import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import styled from "styled-components";
import useViewport from "src/hooks/useViewport";

/**
 * 공통 페이지네이션 바
 * @param totalPage : 총 페이지 수
 * @param handlePageChangee : 페이지 전환 함수
 * @returns
 */
const PaginationBar = ({ totalPage, handlePageChange, isChanged }: any) => {
	const isMobile = useViewport();
	const [page, setPage] = useState(1);

	useEffect(() => {
		handlePageChange(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		setPage(1);
	}, [isChanged]);

	const getCurrentValue = (e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Container>
			{totalPage > 0 && (
				<Pagination
					count={totalPage}
					page={page}
					color="primary"
					size={isMobile ? "medium" : "large"}
					onChange={getCurrentValue}
				/>
			)}
		</Container>
	);
};

export default PaginationBar;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem 0;
	nav {
		ul {
			li {
				.Mui-selected {
					background-color: ${({ theme }) => theme.palette.primary.main};
					&:hover {
						background-color: ${({ theme }) => theme.palette.primary.main};
					}
				}
			}
		}
	}
`;
