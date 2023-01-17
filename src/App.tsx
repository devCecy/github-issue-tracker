import { Route, Routes } from "react-router-dom";

// components
import Header from "./components/Header";
import Bookmark from "./pages/bookmark/Bookmark";
import IssueBrowse from "./pages/issueBrowse/IssueBrowse";
import Search from "./pages/search/Search";

function App() {
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
