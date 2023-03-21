import { message } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { RequestConfig, RequestOptions } from 'umi';

import { currentUser as queryCurrentUser } from './services/user';
import { getToken, removeToken } from './utils/cookie';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
	currentUser?: API.User;
	fetchUserInfo?: () => Promise<API.User | undefined>;
}> {
	const fetchUserInfo = async () => {
		const token = getToken();
		if (token && token.length >= 36) {
			try {
				const msg = await queryCurrentUser();
				return msg;
			} catch (error) {
				removeToken();
				return undefined;
			}
		}
		return undefined;
	};
	const currentUser = await fetchUserInfo();
	return {
		fetchUserInfo,
		currentUser,
	};
}

/**
 * token注入request请求中
 */
const authHeaderInterceptor = (url: string, options: RequestOptions) => {
	const { interceptors } = options;

	if (interceptors === false)
		return {
			url,
			options,
		};

	const token = getToken();
	const authHeader = token ? { rzpj: token } : undefined;
	return {
		url: `${url}`,
		options: {
			...options,
			interceptors: true,
			headers: { ...authHeader, ...options.headers },
		} as RequestOptions,
	};
};

export const request: RequestConfig = {
	// 新增自动添加AccessToken的请求前拦截器
	requestInterceptors: [authHeaderInterceptor],
	errorConfig: {
		errorThrower: (res) => {
			const { success, data, errorCode, errorMessage, showType } = res;
			if (!success) {
				const error: any = new Error(errorMessage);
				error.name = 'BizError';
				error.info = { errorCode, errorMessage, showType, data };
				throw error; // 抛出自制的错误
			}
		},
		errorHandler: (error: any, opts) => {
			if (opts?.skipErrorHandler) throw error;

			const { errorCode = 500, errorMessage = 'Server error' } = error.info;

			message.destroy();
			if (errorCode === 406) {
				removeToken();
				message.error('You are not authorized, please login.');
			} else {
				if (errorMessage) message.error(errorMessage);
			}
			throw errorMessage;
		},
	},
};

// https://umijs.org/zh-CN/plugins/plugin-locale#getlocale-1
export const locale = {
	getLocale() {
		const local = localStorage.getItem('locale');
		return local ?? 'en-US';
	},
	setLocale({ lang }: any) {
		localStorage.setItem('locale', lang);
		dayjs.locale((lang as string).toLocaleLowerCase());
	},
};
