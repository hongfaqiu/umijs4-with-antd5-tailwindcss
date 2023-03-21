import { useRequest } from 'umi';

import WorkflowCard, {
	WorkflowCardPlaceholder,
} from '@/components/dashboard/WorkflowCard';
import useT from '@/hooks/use-t';
import { getTemplates } from '@/services/workflow/workflow';

export default function () {
	const t = useT('dashborad.likes');

	const { data, loading } = useRequest(() => getTemplates());

	return (
		<div className="w-full">
			<h2 className="mb-6 text-2xl">{t('title')}</h2>
			{data?.list.length === 0 && (
				<h2 className="my-4 text-sm text-gray-600 dark:text-gray-300">
					{t('tip')}
				</h2>
			)}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
				{loading
					? new Array(10)
							.fill(0)
							.map((i, index) => <WorkflowCardPlaceholder key={index} />)
					: data?.list.map((card, index) => (
							<WorkflowCard
								key={index}
								// icon={card.icon}
								title={card.name}
								date={card.updateDate}
							/>
					  ))}
			</div>
		</div>
	);
}
