import { snackbarState } from "src/atom/snackBarState";
import { bookmarkArrayState, bookmarkState } from "src/atom/bookmarkState";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { setLocalStorage } from "src/utils/util";

/**
 * 레포지토리 북마크를 삭제합니다.
 */
const useBookmarkDelete = () => {
	const setBookmarkedByString = useSetRecoilState(bookmarkState);
	const [snackbar, setSnackbar] = useRecoilState(snackbarState);
	const bookmarkedArray = useRecoilValue(bookmarkArrayState);

	const handleBookmarkDelete = (targetRepo: string) => {
		const newBookmarkList = bookmarkedArray.filter(
			(el: string) => el !== targetRepo
		);

		setLocalStorage("bookmarkedRepos", JSON.stringify(newBookmarkList));
		setBookmarkedByString(JSON.stringify(newBookmarkList));

		setSnackbar({ ...snackbar, isOpen: true, state: "delete" });
	};

	return handleBookmarkDelete;
};

export default useBookmarkDelete;
