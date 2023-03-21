import { Input } from 'antd';

import useT from '@/hooks/use-t';

import Icons from './Icons';

type SearchProps = {
	placeholder?: string;
	onSearch?: (value: string) => void;
};

export default function SearchBar({ placeholder, onSearch }: SearchProps) {
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSearch?.(event.target.value);
	};
	const t = useT();

	return (
		<Input
			placeholder={placeholder ?? t('search')}
			prefix={<Icons.Search className="stroke-1.5" />}
			className="w-auto md:w-64"
			onChange={handleSearch}
		/>
	);
}
