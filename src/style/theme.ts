import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#1C99FE",
		},
		secondary: {
			main: "#A064F9",
		},
	},
	typography: {
		h1: { fontSize: "2.4rem" },
		h2: { fontSize: "2rem" },
		h3: { fontSize: "1.8rem" },
		body1: {
			fontSize: "1.4rem",
		},
		body2: {
			fontSize: "1.2rem",
		},
	},
});
