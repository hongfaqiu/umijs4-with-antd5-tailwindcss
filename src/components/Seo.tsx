import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';

import useT from '@/hooks/use-t';

interface IProps {
	title: string;
	needTitleSuffix?: boolean;
}

export const Seo: React.FC<IProps> = ({ title, needTitleSuffix = true }) => {
	const t = useT();
	const buildTitle = (title: string) => `${title} - ${t('site.title')}`;

	useEffect(() => {
		window.document.title = needTitleSuffix ? buildTitle(title) : title;
	}, [title, needTitleSuffix]);

	return (
		<Helmet>
			<title>{needTitleSuffix ? buildTitle(title) : title}</title>
		</Helmet>
	);
};
