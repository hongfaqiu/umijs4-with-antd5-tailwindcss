import { PropsWithChildren, ReactNode } from 'react';

import { Modal } from 'antd';

import useT from '@/hooks/use-t';

const { confirm } = Modal;

export type DeletePopoverProps = PropsWithChildren<{
	onOk?: () => void;
	onCancel?: () => void;
	title?: ReactNode;
	content?: ReactNode;
	name?: string;
}>;

export default function DeletePopover({
	children,
	onOk,
	onCancel,
	title,
	content,
	name = '',
}: DeletePopoverProps) {
	const t = useT('tips');

	const onClick = () => {
		confirm({
			title: title ?? t('deleteTitle'),
			content: (
				<div>
					{content ?? t('deleteContent')} <strong>{name}</strong>
				</div>
			),
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk,
			onCancel,
			maskClosable: true,
		});
	};

	return <div onClick={onClick}>{children}</div>;
}
