import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import styled from "styled-components";
import useViewport from "src/hooks/useViewport";

/**
 *
 * @param totalPage : 총 페이지 수
 * @param handlePageChangee : 페이지 전환 함수
 * @returns
 */
const PaginationBar = ({ totalPage, handlePageChange }: any) => {
	const isMobile = useViewport();
	const [page, setPage] = useState(1);

	useEffect(() => {
		handlePageChange(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const getCurrentValue = (e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};
	return (
		<Container>
			{totalPage > 0 && (
				<Pagination
					count={totalPage}
					page={page}
					color="primary" // TODO: theme 컬러 적용
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
`;
