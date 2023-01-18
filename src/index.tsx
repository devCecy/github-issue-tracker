import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { lazy, Suspense } from "react";

// style
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import GlobalStyle from "./style/global";

// components
import App from "./App";
const Alert = lazy(() => import("./components/Alert"));
const SnackbarAlert = lazy(() => import("./components/SnacknarAlert"));

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<RecoilRoot>
				<App />
				<Suspense fallback={null}>
					<Alert />
					<SnackbarAlert />
				</Suspense>
				<GlobalStyle />
			</RecoilRoot>
		</ThemeProvider>
	</BrowserRouter>
);
