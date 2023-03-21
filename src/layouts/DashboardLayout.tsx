import { PropsWithChildren, ReactNode, useMemo } from 'react';

import { useParams } from 'umi';

import Icons from '@/components/Icons';
import MenuItem from '@/components/MenuItem';
import { Seo } from '@/components/Seo';
import { SiteHeader } from '@/components/SiteHeader';
import useT from '@/hooks/use-t';

export default function DashboardLayout({ children }: PropsWithChildren) {
	const params = useParams();
	const t = useT('menu');

	const NavConfig: {
		icon: ReactNode;
		title: ReactNode;
		key: string;
	}[] = [
		{
			icon: <Icons.Clock4 className="h-5 w-5" />,
			title: t('recent'),
			key: 'recent',
		},
		{
			icon: <Icons.Heart className="h-5 w-5" />,
			title: t('likes'),
			key: 'likes',
		},
	];

	const activeItem = useMemo(() => {
		return NavConfig.find((item) => item.key === params.type) ?? NavConfig[0];
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
						{NavConfig.map((item) => (
							<li key={item.key}>
								<MenuItem
									key={item.key}
									icon={item.icon}
									title={item.title}
									to={`/dashboard/${item.key}`}
									active={item.key === params.type}
								/>
							</li>
						))}
					</ul>
				</aside>

				<section className="ml-[250px] h-[2000px] p-8">{children}</section>
			</div>
		</>
	);
}
