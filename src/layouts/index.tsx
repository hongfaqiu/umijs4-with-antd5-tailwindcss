import { Outlet } from 'umi';

import ThemeProvider from './ThemeProvider';

export default function Layout() {
	return (
		<ThemeProvider>
			<Outlet />
		</ThemeProvider>
	);
}
