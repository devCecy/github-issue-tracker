import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "./atom/bookmarkState";
import { getLocalStorage } from "./utils/util";

// components
import Header from "./components/Header";
import Bookmark from "./pages/bookmark/Bookmark";
import IssueBrowse from "./pages/issueBrowse/IssueBrowse";
import Search from "./pages/search/Search";

function App() {
	const setBookmarkedByString = useSetRecoilState(bookmarkState);

	useEffect(() => {
		setBookmarkedByString(getLocalStorage("bookmarkedRepos"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<IssueBrowse />} />
				<Route path="/bookmark" element={<Bookmark />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</>
	);
}

export default App;
