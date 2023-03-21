import React from 'react';

import { Link } from 'umi';

import { cn } from '@/utils/tailwind';

export interface MenuItemProps {
	icon: React.ReactNode;
	title: React.ReactNode;
	active?: boolean;
	to: string;
}

export default function MenuItem({ icon, title, active, to }: MenuItemProps) {
	return (
		<Link
			className={cn(
				'mb-2 flex min-h-[36px] cursor-pointer items-center justify-center gap-2 rounded-md bg-transparent px-2 font-sans text-sm font-medium transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-zinc-800 dark:hover:text-slate-100 dark:focus:bg-zinc-800 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent',
				active && 'bg-slate-100 dark:bg-zinc-800',
			)}
			to={to}
		>
			<div className="flex-none">{icon}</div>
			<div className="flex-1">{title}</div>
		</Link>
	);
}
