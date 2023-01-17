import { atom } from "recoil";

/**
 * 스낵바
 */
export const snackbarState = atom({
	key: "snackbarState",
	default: { isOpen: false, state: "add" || "delete" },
});
