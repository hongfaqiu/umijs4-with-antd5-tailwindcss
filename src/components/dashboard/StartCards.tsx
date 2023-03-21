import { Link } from 'umi';

import useT from '@/hooks/use-t';

import Icons from '../Icons';

export function StartNewWorkflow() {
	const t = useT('start');

	return (
		<div
			className="card cursor-pointer flex-col space-y-12"
			tabIndex={0}
			title={t('new')}
		>
			<Icons.Plus className="h-8 w-8 stroke-1 text-gray-700 dark:text-gray-200" />
			<div>{t('new')}</div>
		</div>
	);
}

export function StartFromTemplate() {
	const t = useT('start');

	return (
		<Link
			className="card cursor-pointer flex-col space-y-12"
			to={'/dashboard/discover'}
			title={t('fromTemplate')}
		>
			<Icons.model className="h-8 w-8 stroke-1 text-gray-700 dark:text-gray-200" />
			<div>{t('fromTemplate')}</div>
		</Link>
	);
}
