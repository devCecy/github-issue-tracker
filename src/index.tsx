import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

// components
import App from "./App";
import Alert from "./components/Alert";
import SnackbarAlert from "./components/SnacknarAlert";

// style
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
				<Alert />
				<SnackbarAlert />
				<GlobalStyle />
			</RecoilRoot>
		</ThemeProvider>
	</BrowserRouter>
);
