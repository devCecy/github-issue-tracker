import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { theme } from "src/style/theme";
import { ThemeProvider } from "styled-components";

const useTestTemplate = (children: JSX.Element) => {
	return (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<Router>{children}</Router>
			</ThemeProvider>
		</RecoilRoot>
	);
};

export default useTestTemplate;
