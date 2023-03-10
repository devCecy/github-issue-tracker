import { format } from "timeago.js";
import { Issue } from "src/interfaces/issues";
import useViewport from "src/hooks/useViewport";
import LazyLoad from "react-lazyload";

// mui
import styled from "styled-components";
import { Avatar } from "@mui/material";

interface IssueCardProps {
	issue: Issue;
	currentRepo: string;
}

const IssueCard = ({ issue, currentRepo }: IssueCardProps) => {
	const formattedDate = format(issue.created_at);
	const { isMobile } = useViewport();

	return (
		<Container href={issue.html_url} target="_blank" rel="noreferrer">
			<CardTopBox>
				<UserBox>
					<LazyLoad>
						<Avatar
							alt={issue.user.login}
							src={issue.user.avatar_url}
							sx={{ width: 24, height: 24 }}
						/>
					</LazyLoad>
					{isMobile ? (
						<div>
							<UserId>{issue.user.login}</UserId>
							<Title style={{ maxWidth: "13rem", textOverflow: "ellipsis" }}>
								({currentRepo})
							</Title>
						</div>
					) : (
						<>
							<UserId>{issue.user.login}</UserId>
							<Title>({currentRepo})</Title>
						</>
					)}

					<CreatedAt>· {formattedDate}</CreatedAt>
				</UserBox>

				<StateBox>
					<IssueState state={issue.state}>{issue.state}</IssueState>
				</StateBox>
			</CardTopBox>
			<Title>{issue.title}</Title>
		</Container>
	);
};

export default IssueCard;

const Container = styled.a`
	position: relative;
	width: 85%;
	background-color: white;
	padding: 2rem;
	box-shadow: 1rem 0.5rem 0.5rem lightgray;
	border: 1px solid #f9f8f8;
	border-radius: 1.5rem;
	margin-bottom: 2rem;
`;

const CardTopBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
`;

const UserBox = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	column-gap: 1rem;
`;

const Title = styled.p`
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const UserId = styled.span`
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	font-weight: 500;
`;

const CreatedAt = styled(UserId)`
	color: lightgray;
`;

const StateBox = styled.div`
	position: absolute;
	right: 0;
`;

const IssueState = styled.div<{ state: string }>`
	width: 3.5rem;
	padding: 0.8rem 0.5rem 0.8rem 0.8rem;
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	font-weight: 600;
	color: white;
	border-radius: 1.5rem 0 0 1.5rem;
	background-color: ${(props) =>
		props.state === "open"
			? props.theme.palette.primary.main
			: props.theme.palette.secondary.main};
`;
