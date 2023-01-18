import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "src/atom/bookmarkState";
import { getLocalStorage } from "src/utils/util";

// components
import Header from "src/components/Header";
const IssueBrowse = lazy(() => import("src/pages/issueBrowse/IssueBrowse"));
const Bookmark = lazy(() => import("src/pages/bookmark/Bookmark"));
const Search = lazy(() => import("src/pages//search/Search"));

function App() {
	const setBookmarkedByString = useSetRecoilState(bookmarkState);

	useEffect(() => {
		setBookmarkedByString(getLocalStorage("bookmarkedRepos"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<Suspense fallback={null}>
				<Routes>
					<Route path="/" element={<IssueBrowse />} />
					<Route path="/bookmark" element={<Bookmark />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
