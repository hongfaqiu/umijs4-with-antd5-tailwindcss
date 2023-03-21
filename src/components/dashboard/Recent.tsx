import { useRequest } from 'umi';

import {
	StartFromTemplate,
	StartNewWorkflow,
} from '@/components/dashboard/StartCards';
import WorkflowCard, {
	WorkflowCardPlaceholder,
} from '@/components/dashboard/WorkflowCard';
import useT from '@/hooks/use-t';
import { getTemplates } from '@/services/workflow/workflow';

import Icons from '../Icons';

export default function () {
	const t = useT('dashborad.recent');

	const { data, loading } = useRequest(() => getTemplates());

	return (
		<div className="w-full">
			<h2 className="mb-6 text-2xl">{t('title')}</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
				<StartNewWorkflow />
				<StartFromTemplate />
			</div>
			<h2 className="mt-10 mb-4 text-sm">{t('tip')}</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
				{loading
					? new Array(10)
							.fill(0)
							.map((i, index) => <WorkflowCardPlaceholder key={index} />)
					: data?.list.map((card, index) => (
							<WorkflowCard
								key={index}
								icon={<Icons.Bot />}
								title={card.name}
								date={card.updateDate}
							/>
					  ))}
			</div>
		</div>
	);
}
