declare namespace API {
	type Workflow = {
		id: string;
		name: string;
		desc?: string;
		createDate: Date;
		updateDate: Date;
		createUser?: API.User;
		content: string;
		type: 'PUBLIC' | 'PRIVATE';
	};

	type Tag = {
		type: string;
		color?: string;
	};

	type WorkflowTemplate = Workflow & {
		docLink?: string;
		official?: boolean;
		tags?: Tag[];
	};

	type QueryParams = {
		keyword?: string;
		page?: number;
		pageSize?: number;
		tags?: string[];
	};

	type Template<T> = {
		code: number;
		message: string;
		data: T;
	};

	type ListTemplate<T, K extends keyof T = never> = Template<{
		list: Omit<T, K>[];
		totalCount: number;
	}>;

	type GetWorkflowtemplateResult = ListTemplate<WorkflowTemplate, 'content'>;
}
