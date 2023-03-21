import {
	randAvatar,
	randCatchPhrase,
	randLine,
	randPastDate,
	randRecentDate,
	randUserName,
	randUuid,
} from '@ngneat/falso';

import { filterData, getRandomSubarray, sleep } from './utils';

const tagColors = [
	'magenta',
	'red',
	'volcano',
	'orange',
	'gold',
	'lime',
	'green',
	'cyan',
	'blue',
	'geekblue',
	'purple',
];

const modelCategories: API.Tag[] = [
	'图像分类',
	'目标检测',
	'图像分割',
	'自然语言处理',
	'语音识别',
	'推荐系统',
	'时序预测',
	'异常检测',
	'强化学习',
	'深度生成模型',
].map((item) => ({
	type: item,
	color: getRandomSubarray(tagColors, 1)[0],
}));

function generateWorkflow() {
	const result: API.WorkflowTemplate = {
		id: randUuid(),
		name: randCatchPhrase(),
		desc: randLine({ lineCount: 2 }),
		createDate: randPastDate(),
		updateDate: randRecentDate(),
		content: '',
		createUser: {
			id: randUuid(),
			name: randUserName(),
			avatar: randAvatar(),
		},
		tags: getRandomSubarray(modelCategories, 3),
		type: Math.random() > 0.5 ? 'PRIVATE' : 'PUBLIC',
		official: Math.random() > 0.5,
	};

	return result;
}

const data: API.Workflow[] = [];
for (let i = 0; i < 100; i += 1) {
	data.push(generateWorkflow());
}

export async function mockGetTemplates(body?: API.QueryParams) {
	await sleep(Math.random() * 1);

	return {
		message: 'success',
		data: filterData(data, body),
		code: 200,
	};
}

export function mockGetCategories() {
	return {
		message: 'success',
		data: {
			list: modelCategories,
			totalCount: modelCategories.length,
		},
		code: 200,
	};
}
