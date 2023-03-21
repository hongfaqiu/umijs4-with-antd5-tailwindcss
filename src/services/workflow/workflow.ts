import { mockGetCategories, mockGetTemplates } from '../mock/workflow';

/**
 * 获取工作流列表
 * @param data
 * @returns
 */
export async function getTemplates(data?: API.QueryParams) {
	return mockGetTemplates(data);
}

/**
 * 获取工作流类型目录
 * @returns
 */
export async function getCategories() {
	return mockGetCategories();
}
