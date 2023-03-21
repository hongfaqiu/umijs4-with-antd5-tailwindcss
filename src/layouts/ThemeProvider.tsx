import { PropsWithChildren } from 'react';

import { ConfigProvider, theme } from 'antd';

import {
	ThemeProvider as TailwindThemeProvider,
	useTheme,
} from '@/hooks/use-theme';

export function AntdConfigProvider({ children }: PropsWithChildren) {
	const { theme: nowTheme } = useTheme();

	return (
		<ConfigProvider
			theme={{
				algorithm:
					nowTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
			}}
		>
			{children}
		</ConfigProvider>
	);
}

export default function ThemeProvider({ children }: PropsWithChildren) {
	return (
		<TailwindThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<AntdConfigProvider>{children}</AntdConfigProvider>
		</TailwindThemeProvider>
	);
}
