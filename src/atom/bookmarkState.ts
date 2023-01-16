import { atom, selector } from "recoil";

/**
 * getLocalStorage('key')값
 */
export const bookmarkState = atom({
	key: "bookmarkState",
	default: "",
});

/**
 * bookmarkState를 parse해서 배열로 변환한 값
 */
export const bookmarkArrayState = selector({
	key: "parsedBookmarkState",
	get: ({ get }) => {
		const getBookmarkState = get(bookmarkState);
		const bookmarkedReposArray = getBookmarkState
			? JSON.parse(getBookmarkState)
			: null;
		return bookmarkedReposArray;
	},
});
