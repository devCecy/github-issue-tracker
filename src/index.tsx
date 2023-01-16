import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { RecoilRoot } from "recoil";

import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import GlobalStyle from "./style/global";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<RecoilRoot>
				<App />
				<GlobalStyle />
			</RecoilRoot>
		</ThemeProvider>
	</BrowserRouter>
);
