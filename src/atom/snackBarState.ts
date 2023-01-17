import { atom } from "recoil";

interface SnacknarState {
	isOpen: boolean;
	state: "add" | "delete";
}
/**
 * 스낵바
 */
export const snackbarState = atom<SnacknarState>({
	key: "snackbarState",
	default: { isOpen: false, state: "add" },
});
