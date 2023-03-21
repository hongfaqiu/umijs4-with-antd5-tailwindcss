import clsx from 'clsx';

import useMergedState from '@/hooks/useMergedState';
import { cn } from '@/utils/tailwind';

import Icons from '../Icons';

interface ListItemProps {
	label: string;
	selected: boolean;
	onSelect?: () => void;
	onDeselect?: () => void;
}

function ListItem({ label, selected, onSelect, onDeselect }: ListItemProps) {
	const handleClick = () => {
		if (selected && onDeselect) {
			onDeselect();
		} else if (!selected && onSelect) {
			onSelect();
		}
	};

	return (
		<li
			className={cn(
				'mb-2 flex min-h-[36px] cursor-pointer items-center justify-between gap-2 rounded-md px-2 font-sans text-sm font-medium transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 dark:text-slate-100 dark:hover:bg-zinc-800',
				selected &&
					'bg-sky-100 text-sky-500 hover:bg-sky-100 dark:bg-sky-800 dark:text-white dark:hover:bg-sky-800',
			)}
			onClick={handleClick}
		>
			<span className={clsx({ 'font-semibold': selected })}>{label}</span>
			{selected && (
				<button
					type="button"
					className="mr-2"
					onClick={(event) => {
						event.stopPropagation();
						if (onDeselect) {
							onDeselect();
						}
					}}
				>
					<Icons.X className="text-sky-500 dark:text-white" />
				</button>
			)}
		</li>
	);
}

interface ListProps {
	items?: string[];
	selectedKeys?: string[];
	onSelectItem?: (item: string) => void;
	onDeselectItem?: (item: string) => void;
	className?: string;
}

function List({
	items,
	selectedKeys = [],
	onSelectItem,
	onDeselectItem,
	className,
}: ListProps) {
	const [selectedItems, setSelectedItems] = useMergedState<string[]>(
		selectedKeys,
		{
			value: selectedKeys,
		},
	);

	const handleSelectItem = (item: string) => {
		setSelectedItems([...selectedItems, item]);
		if (onSelectItem) {
			onSelectItem(item);
		}
	};

	const handleDeselectItem = (item: string) => {
		setSelectedItems(
			selectedItems.filter((selectedItem) => selectedItem !== item),
		);
		if (onDeselectItem) {
			onDeselectItem(item);
		}
	};

	return (
		<ul className={className}>
			{items?.map((item) => (
				<ListItem
					key={item}
					label={item}
					selected={selectedItems.includes(item)}
					onSelect={onSelectItem ? () => handleSelectItem(item) : undefined}
					onDeselect={
						onDeselectItem ? () => handleDeselectItem(item) : undefined
					}
				/>
			))}
		</ul>
	);
}

export default List;
