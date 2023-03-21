import Cookies from 'js-cookie';

const domain = document.domain;
const mainDomain = domain.split('.').slice(-2).join('.'); // 不匹配特殊域名,如.com.cn

/**
 * 在cookie中设置两小时过期的token
 * @param token token
 * @param time 过期时间，默认两小时过期
 */
export const setToken = (token: string, time: number = 2) => {
	Cookies.set('token', token, {
		expires: new Date(new Date().getTime() + 1000 * 3600 * time), // 设置两小时过期
		domain: mainDomain,
		path: '/',
	});
};

export const setRegion = (region: string, time: number = 24) => {
	Cookies.set('region', region, {
		expires: new Date(new Date().getTime() + 1000 * 3600 * time), // 设置两小时过期
		domain: mainDomain,
		path: '/',
	});
};

/**
 * 移除token
 */
export const removeToken = () => {
	Cookies.remove('token', {
		domain: mainDomain,
		path: '/',
	});
};

/**
 * 获取token
 */
export const getToken = () => {
	const params = new URLSearchParams(location.search);
	const token = Cookies.get('token') ?? params.get('tk');
	return token;
};
