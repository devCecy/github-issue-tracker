// import "styled-components";
declare module "@mui/material/styles" {
	export interface Theme {
		palette: {
			primary: {
				main: string;
				dark: string;
			};
		};
		secondary: {
			main: string;
		};
		typography: {
			h1: { fontSize: string };
			h2: { fontSize: string };
			h3: { fontSize: string };
			body1: {
				fontSize: string;
			};
			body2: {
				fontSize: string;
			};
		};
	}
}
