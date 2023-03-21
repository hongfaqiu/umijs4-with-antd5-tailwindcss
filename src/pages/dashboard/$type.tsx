import { ReactNode, useMemo } from 'react';

import { useParams } from 'umi';

import BackToTopButton from '@/components/BackToTopButton';
import Icons from '@/components/Icons';
import { Seo } from '@/components/Seo';
import { SiteHeader } from '@/components/SiteHeader';
import Discover from '@/components/dashboard/Discover';
import Likes from '@/components/dashboard/Likes';
import Recent from '@/components/dashboard/Recent';
import MenuItem from '@/components/ui/MenuItem';
import useT from '@/hooks/use-t';

export default function DashboardLayout() {
	const params = useParams();
	const t = useT('menu');

	type NavItem = {
		type?: 'link';
		icon: ReactNode;
		title: ReactNode;
		key: string;
		component: ReactNode;
	};

	const NavConfig: (
		| NavItem
		| {
				type: 'divider';
				title: ReactNode;
		  }
	)[] = [
		{
			icon: <Icons.Clock4 className="h-5 w-5" />,
			title: t('recent'),
			key: 'recent',
			component: <Recent />,
		},
		{
			icon: <Icons.Heart className="h-5 w-5" />,
			title: t('likes'),
			key: 'likes',
			component: <Likes />,
		},
		{
			type: 'divider',
			title: t('templates'),
		},
		{
			icon: <Icons.Boxes className="h-5 w-5" />,
			title: t('discover'),
			key: 'discover',
			component: <Discover />,
		},
	];

	const activeItem = useMemo(() => {
		return (NavConfig.find((item: any) => item.key === params.type) ??
			NavConfig[0]) as NavItem;
	}, [NavConfig, params.type]);

	return (
		<>
			<Seo title={activeItem.title as string} />
			<SiteHeader />
			<div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden">
				<div className="flex w-[108rem] flex-none justify-end">
					<img
						src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
						alt=""
						className="w-[71.75rem] max-w-none flex-none dark:hidden"
						decoding="async"
					/>
					<img
						src="	https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif"
						alt=""
						className="hidden w-[90rem] max-w-none flex-none dark:block"
						decoding="async"
					/>
				</div>
			</div>
			<div className="relative w-full">
				<aside className="fixed top-16 h-[calc(100vh-4rem)] w-[250px] overflow-auto border-r-2 border-slate-900/10 p-4 dark:border-slate-50/[0.06]">
					<ul>
						{NavConfig.map((item, index) => (
							<li key={index}>
								{item.type === 'divider' ? (
									<div className="my-4 text-xs font-normal text-gray-600 dark:text-gray-300">
										{item.title}
									</div>
								) : (
									<MenuItem
										key={item.key}
										icon={item.icon}
										title={item.title}
										to={`/dashboard/${item.key}`}
										active={item.key === params.type}
									/>
								)}
							</li>
						))}
					</ul>
				</aside>

				<section className="ml-[250px] p-8">{activeItem.component}</section>

				<BackToTopButton />
			</div>
		</>
	);
}
