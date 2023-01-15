import "styled-components";

declare module "styled-components" {
	export interface Theme {
		colors: {
			main: string;
			second: string;
			third: string;
			white: string;
			lightgray: string;
		};
		fontSize: {
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xxl: string;
			title: string;
		};
	}
}
