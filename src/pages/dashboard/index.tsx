import { useEffect } from 'react';

import { history } from 'umi';

export default function () {
	useEffect(() => {
		history.push('/dashboard/recent');
	}, []);

	return null;
}
