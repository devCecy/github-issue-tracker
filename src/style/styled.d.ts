import "styled-components";

declare module "styled-components" {
	export interface Theme {
		colors: {
			main: string;
			second: string;
			third: string;
		};
	}
}
