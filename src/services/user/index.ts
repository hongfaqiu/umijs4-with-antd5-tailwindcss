import { request } from 'umi';

/** 登录接口 POST /api/user/login */
export async function login(
	body: API.LoginParams,
	options?: Record<string, any>,
) {
	return request<API.LoginResult>('/v1.0/api/user/login', {
		method: 'POST',
		data: body,
		...(options || {}),
	});
}

/** 登出接口 POST /api/user/logout */
export async function logout() {
	return request('/v1.0/api/user/logout', {
		method: 'POST',
	});
}

/** 获取当前的用户 GET /api/user */
export async function currentUser(options?: Record<string, any>) {
	return request<API.User>('/v1.0/api/user', {
		method: 'GET',
		...(options || {}),
		skipErrorHandler: true,
	});
}
