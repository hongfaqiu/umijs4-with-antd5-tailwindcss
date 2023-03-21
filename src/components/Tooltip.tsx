import React, { PropsWithChildren } from 'react';

import { Tooltip as AntdTooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

import { useToggle } from '@/hooks/use-toggle';

export type TooltipProps = PropsWithChildren<{
	content: React.ReactNode;
	hideOnClick?: boolean;
	placement?: TooltipPlacement;
}>;

export const Tooltip: React.FC<TooltipProps> = ({
	content,
	hideOnClick = false,
	placement = 'top',
	children,
}) => {
	const [visible, toggleVisible] = useToggle(false);

	return (
		<AntdTooltip visible={visible} title={content} placement={placement}>
			<span
				onMouseEnter={() => {
					toggleVisible(true);
				}}
				onMouseLeave={() => {
					toggleVisible(false);
				}}
				onMouseDown={() => {
					hideOnClick && toggleVisible(false);
				}}
			>
				{children}
			</span>
		</AntdTooltip>
	);
};
