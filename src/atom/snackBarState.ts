import { atom } from "recoil";

/**
 * 스낵바
 */
export const snackbarState = atom({
	key: "snackbarState",
	default: { isOpen: true, state: "add" || "delete" },
});
