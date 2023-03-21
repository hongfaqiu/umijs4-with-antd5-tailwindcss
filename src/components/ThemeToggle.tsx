import { Dropdown, MenuProps } from 'antd';

import useT from '@/hooks/use-t';
import { useTheme } from '@/hooks/use-theme';

import Icons from './Icons';

export default function ThemeToggle() {
	const t = useT('theme');
	const { setTheme, theme } = useTheme();

	const onClick: MenuProps['onClick'] = ({ key }) => {
		setTheme(key);
	};

	const items: MenuProps['items'] = [
		{
			key: 'light',
			label: (
				<div className="flex items-center">
					<Icons.SunMedium className="mr-2 stroke-2 text-orange-500" />
					<span>{t('light')}</span>
				</div>
			),
		},
		{
			key: 'dark',
			label: (
				<div className="flex items-center">
					<Icons.Moon className="mr-2 stroke-2 text-blue-500" />
					<span>{t('dark')}</span>
				</div>
			),
		},
		{
			key: 'system',
			label: (
				<div className="flex items-center">
					<Icons.Laptop className="mr-2" />
					<span>{t('system')}</span>
				</div>
			),
		},
	];

	return (
		<Dropdown
			menu={{
				items,
				selectable: true,
				selectedKeys: [theme ?? 'system'],
				onClick,
			}}
		>
			<div className="btn" role={'button'} tabIndex={0}>
				<Icons.SunMedium className="rotate-0 scale-100 stroke-2 text-orange-500 transition-all dark:-rotate-90 dark:scale-0" />
				<Icons.Moon className="absolute rotate-90 scale-0 stroke-2 text-blue-500 transition-all dark:rotate-0 dark:scale-100" />
			</div>
		</Dropdown>
	);
}
