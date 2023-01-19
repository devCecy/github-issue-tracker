import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useTestTemplate from "src/hooks/useTestTemplate";

// components
import IssueBrowse from "../IssueBrowse";

describe("이슈 모아보기 페이지를 테스트 합니다.", () => {
	test("북마크된 레포지토리가 없다면, 레포지토리 검색하러가기 버튼이 보여집니다.", async () => {
		render(useTestTemplate(<IssueBrowse />));

		const goToSearchBtn = screen.getByRole("button", {
			name: "goToSearchBtn",
		});
		expect(goToSearchBtn).toBeInTheDocument();
	});

	test("레포지토리 버튼 스타일을 테스트 합니다.", () => {
		render(useTestTemplate(<IssueBrowse />));

		// 버튼 기본 background-color는 RGB(255, 255, 255)입니다.
		const repoBtn = screen.getByRole("button");
		expect(repoBtn).toHaveStyle({ backgroundColor: "RGB(255, 255, 255)" });

		// 버튼을 클릭한 뒤 background-color는 RGB(28, 144, 254)입니다.
		userEvent.click(repoBtn);
		expect(repoBtn).toHaveStyle({ backgroundColor: "RGB(28, 144, 254)" });
	});
});
