import { ReactNode } from 'react';

import { Dropdown } from 'antd';
import { TDate, format } from 'timeago.js';
import { getLocale } from 'umi';

import useT from '@/hooks/use-t';
import { cn } from '@/utils/tailwind';

import DeletePopover from '../DeletePopover';
import Icons from '../Icons';

export interface WorkflowCardProps {
	icon?: ReactNode;
	title: ReactNode;
	date: TDate;
	onClick?: () => void;
}

export default function WorkflowCard({
	icon,
	title,
	date,
	onClick,
}: WorkflowCardProps) {
	const locale = (getLocale() as string).replace('-', '_');
	const t = useT('dashborad.dropdown');

	return (
		<div
			className="card cursor-pointer flex-col space-y-12"
			tabIndex={0}
			title={title as string}
			onClick={onClick}
		>
			<div className="flex items-center justify-between gap-4 overflow-hidden">
				<div
					className={cn('flex items-center overflow-hidden', icon && 'gap-2')}
				>
					<div>{icon}</div>
					<div className="truncate">{title}</div>
				</div>
				<Dropdown
					menu={{
						items: [
							{
								key: 'rename',
								label: (
									<div className="flex items-center text-sm">
										<Icons.Edit2 className="mr-2 h-4 w-4" />
										{t('rename')}
									</div>
								),
							},
							{
								type: 'divider',
							},
							{
								key: 'delete',
								label: (
									<DeletePopover name={title as string}>
										<div className="flex items-center text-sm text-red-500">
											<Icons.Trash2 className="mr-2 h-4 w-4 " />
											{t('delete')}
										</div>
									</DeletePopover>
								),
							},
						],
					}}
				>
					{<Icons.MoreHorizontal className="cursor-pointer" />}
				</Dropdown>
			</div>
			<div className="flex justify-between">
				<span>{format(date, locale)}</span>
			</div>
		</div>
	);
}

export function WorkflowCardPlaceholder() {
	return (
		<div className="card skeleton-bg flex-col space-y-16">
			<div className="skeleton-p" />
			<div className="skeleton-p w-2/5" />
		</div>
	);
}
