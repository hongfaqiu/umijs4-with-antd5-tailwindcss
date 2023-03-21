declare namespace API {
	type User = {
		id: string;
		name: string;
		avatar?: string;
	};

	type LoginResult = {
		service?: string;
		tgt?: string;
		region?: string;
		userInfo?: {
			avatar?: string;
			id?: string;
			status?: string;
			username?: string;
		};
	};

	type LoginParams = {
		username?: string;
		password?: string;
	};
}
