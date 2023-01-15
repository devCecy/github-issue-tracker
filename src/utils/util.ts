/**
 * 로컬스토리지에 key-value를 저장합니다.
 * @param key
 * @param value
 * @returns
 */
const setLocalStorage = (key: string, value: string) => {
	return window.localStorage.setItem(key, value);
};

/**
 * 로컬스토리지의 저장된 value를 key로 가져옵니다.
 * @param key
 * @returns
 */
const getLocalStorage = (key: string) => {
	if (typeof window === "undefined") return;
	return window.localStorage.getItem(key);
};

/**
 * 로컬스토리지의 key-value를 삭제합니다.
 * @param key
 * @returns
 */
const clearLocalStorage = (key: string) => {
	return window.localStorage.removeItem(key);
};

//
export { setLocalStorage, getLocalStorage, clearLocalStorage };
