import { request } from 'umi';

/**
 * 获取工作流列表
 * @param data
 * @returns
 */
export async function getTemplates(data?: API.QueryParams) {
	return request<API.GetWorkflowtemplateResult>('/api/getTemplates', {
		method: 'POST',
		data,
	});
}

/**
 * 获取工作流类型目录
 * @returns
 */
export function getCategories() {
	return request<API.ListTemplate<API.Tag>>('/api/getCategories', {
		method: 'GET',
	});
}
