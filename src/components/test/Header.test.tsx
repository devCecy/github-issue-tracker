import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useTestTemplate from "src/hooks/useTestTemplate";

// components
import Bookmark from "src/pages/bookmark/Bookmark";
import IssueBrowse from "src/pages/issueBrowse/IssueBrowse";
import Search from "src/pages/search/Search";
import Header from "../Header";

describe("헤더에 있는 버튼이 동작하는지 테스트 합니다.", () => {
	test("홈버튼을 누르면 이슈 모아보기(/)페이지로 이동합니다.", async () => {
		render(useTestTemplate(<Header />));

		const HomeBtn = screen.getByRole("button", { name: "home" });
		await userEvent.click(HomeBtn);

		render(useTestTemplate(<IssueBrowse />));

		const title = screen.getByText("이슈 모아보기");
		expect(title).toBeInTheDocument();
	});

	test("북마크 아이콘을 누르면 북마크 리스트(/bookmark) 페이지로 이동합니다.", async () => {
		render(useTestTemplate(<Header />));

		const bookmarkBtn = screen.getByRole("button", { name: "bookmark" });
		await userEvent.click(bookmarkBtn);

		render(useTestTemplate(<Bookmark />));

		const title = screen.getByText("나의 레포지토리");
		expect(title).toBeInTheDocument();
	});

	test("돋보기 아이콘을 누르면 검색(/search) 페이지로 이동합니다.", async () => {
		render(useTestTemplate(<Header />));

		const searchBtn = screen.getByRole("button", { name: "search" });
		await userEvent.click(searchBtn);

		render(useTestTemplate(<Search />));

		const title = screen.getByText("레포지토리 검색");
		expect(title).toBeInTheDocument();
	});
});
