import { alertState } from "./../atom/alertState";
import { snackbarState } from "../atom/snackBarState";
import { bookmarkArrayState, bookmarkState } from "src/atom/bookmarkState";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { setLocalStorage } from "src/utils/util";

/**
 * 레포지토리를 북마크 합니다.
 */
const useBookmarkAdd = () => {
	const setIsAlert = useSetRecoilState(alertState);
	const setBookmarkedByString = useSetRecoilState(bookmarkState);
	const [snackbar, setSnackbar] = useRecoilState(snackbarState);
	const bookmarkedArray = useRecoilValue(bookmarkArrayState);

	const handleBookmarkAdd = (targetRepo) => {
		if (bookmarkedArray?.length > 3) return setIsAlert(true);

		let newBookmarkList;
		if (bookmarkedArray === null || bookmarkedArray.length === 0) {
			newBookmarkList = [targetRepo];
		} else {
			newBookmarkList = [...bookmarkedArray, targetRepo];
		}

		setLocalStorage("bookmarkedRepos", JSON.stringify(newBookmarkList));
		setBookmarkedByString(JSON.stringify(newBookmarkList));

		setSnackbar({ ...snackbar, isOpen: true, state: "add" });
	};

	return handleBookmarkAdd;
};

export default useBookmarkAdd;
