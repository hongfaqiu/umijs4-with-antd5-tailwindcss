import { ReactNode } from 'react';

import { Avatar, Dropdown, Tag } from 'antd';

import useT from '@/hooks/use-t';

import Icons from '../Icons';

interface TemplateCardProps {
	icon?: ReactNode;
	title: string;
	desc?: string;
	avatar?: string;
	creatorName?: string;
	tags?: API.Tag[];
}

const TemplateCard = ({
	icon,
	title,
	desc,
	avatar,
	tags,
	creatorName,
}: TemplateCardProps) => {
	const t = useT('dashborad.dropdown');

	return (
		<div className="card flex h-full flex-col justify-between p-4">
			<div>
				<div className="mb-2 flex items-center justify-between gap-2">
					<div>
						{icon && <div className="mr-4">{icon}</div>}
						<div className="max-w-40 text-lg font-medium line-clamp-2 dark:text-gray-200">
							{title}
						</div>
					</div>
					<Dropdown
						menu={{
							items: [
								{
									key: 'fork',
									label: (
										<div className="flex items-center text-sm">
											<Icons.GitFork className="mr-2 h-4 w-4" />
											{t('fork')}
										</div>
									),
								},
							],
						}}
					>
						{<Icons.MoreHorizontal className="cursor-pointer" />}
					</Dropdown>
				</div>
				{desc && (
					<p className="max-w-40 mb-4 text-gray-600 line-clamp-4 dark:text-gray-400">
						{desc}
					</p>
				)}
				{tags &&
					tags.map((tag) => (
						<Tag key={tag.type} color={tag.color} className="my-1">
							{tag.type}
						</Tag>
					))}
			</div>
			<div className="flex cursor-pointer items-center">
				{avatar && (
					<Avatar
						src={avatar}
						size={32}
						icon={<Icons.User className="w-full" />}
						className="mr-4 flex items-center dark:border-gray-500 dark:shadow-inner"
					/>
				)}
				{creatorName && (
					<div className="text-sm text-gray-600 underline-offset-1 hover:text-sky-500 hover:underline dark:text-gray-400 dark:hover:text-sky-500">
						{creatorName}
					</div>
				)}
			</div>
		</div>
	);
};

export default TemplateCard;

export function TemplateCardPlaceholder() {
	return (
		<div className="card skeleton-bg flex-col">
			<div className="skeleton-p my-4 w-4/5 p-3" />
			<div className="skeleton-p my-3 w-full" />
			<div className="skeleton-p my-3 w-full" />
			<div className="skeleton-p my-3 w-4/5" />
			<div className="flex items-center">
				<div className="skeleton-avatar mr-4" />
				<div className="skeleton-p w-2/5 " />
			</div>
		</div>
	);
}
