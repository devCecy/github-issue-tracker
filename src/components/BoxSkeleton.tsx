import { Skeleton } from "@mui/material";
import styled from "styled-components";

const BoxSkeleton = () => {
	return (
		<SkeletonBox>
			<Skeleton variant="rounded" style={{ width: "100%", height: "10rem" }} />
		</SkeletonBox>
	);
};

export default BoxSkeleton;

const SkeletonBox = styled.div`
	width: 90%;
	margin-bottom: 2rem;
`;
