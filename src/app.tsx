import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { currentUser as queryCurrentUser } from './services/user';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
	currentUser?: API.User;
	fetchUserInfo?: () => Promise<API.User | undefined>;
}> {
	const fetchUserInfo = async () => {
		try {
			const msg = await queryCurrentUser();
			return msg;
		} catch (error) {
			return undefined;
		}
	};
	const currentUser = await fetchUserInfo();
	return {
		fetchUserInfo,
		currentUser,
	};
}

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
