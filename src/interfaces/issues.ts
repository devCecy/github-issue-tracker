export interface Issue {
	title: string;
	created_at: string;
	updated_at: string;
	html_url: string;
	state: string;
	user: {
		avatar_url: string;
		login: string;
	};
}
