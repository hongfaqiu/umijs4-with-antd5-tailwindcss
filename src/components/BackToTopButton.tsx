import { useEffect, useState } from 'react';

import { useScroll } from 'ahooks';

import useT from '@/hooks/use-t';

import Icons from './Icons';
import { Tooltip } from './Tooltip';

const BackToTopButton = () => {
	const [showButton, setShowButton] = useState(false);
	const scroll = useScroll(document);
	const t = useT();

	useEffect(() => {
		if (scroll && scroll?.top > 300) {
			setShowButton(true);
		} else {
			setShowButton(false);
		}
	}, [scroll]);

	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	if (!showButton) return null;

	return (
		<div
			onClick={handleClick}
			className={`fixed bottom-8 right-8 animate-fadeIn cursor-pointer rounded-full border bg-white/95 p-1 shadow-lg animate-fast hover:shadow-md focus:outline-none active:scale-95 dark:bg-black/95`}
		>
			<Tooltip content={t('backTop')}>
				<Icons.ArrowUp className="h-6 w-6" />
			</Tooltip>
		</div>
	);
};

export default BackToTopButton;
