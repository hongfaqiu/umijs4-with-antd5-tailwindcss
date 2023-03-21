import { Link } from 'umi';

import useScroll from '@/hooks/use-scroll';
import useT from '@/hooks/use-t';

import Icons from './Icons';
import { LangSwitcher } from './LangSwitcher';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export function SiteHeader() {
	const t = useT('header');
	const scroll = useScroll(document);

	const classNames1 =
		'bg-white/60 sticky top-0 z-40 w-full flex-none backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-transparent lg:z-50 lg:border-b lg:border-slate-900/10';
	const classNames2 =
		'bg-white/95 sticky top-0 z-40 w-full flex-none backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-slate-900/75 lg:z-50 lg:border-b lg:border-slate-900/10';

	return (
		<header className={!!scroll && scroll.top > 60 ? classNames2 : classNames1}>
			<div className="mx-4 flex h-16 items-center justify-center space-x-4 sm:justify-between sm:space-x-0">
				<div className="flex items-center justify-center">
					<Link
						className="cursor-pointer justify-start"
						title={t('gohome')}
						to="/"
					>
						<Icons.logo className="h-10 w-10" />
					</Link>
					<div className="ml-[230px]">
						<SearchBar />
					</div>
				</div>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						<LangSwitcher globalIconClassName="btn" />
						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}
