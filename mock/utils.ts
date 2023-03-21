// sleep function use ts
export function sleep(s: number) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, s * 1000);
	});
}

type DataQueryMapping<T> = {
	[P in 'tags']?: keyof T;
};

export function filterData<
	T extends Record<string, any>,
	U extends DataQueryMapping<T>,
>(
	data: T[],
	params: API.QueryParams,
	dataQueryMapping?: U,
): {
	list: T[];
	totalCount: number;
} {
	const { keyword = '', page = 1, pageSize = 10, tags } = params;
	const startIndex = (page - 1 ?? 0) * (pageSize ?? 10);
	const endIndex = startIndex + (pageSize ?? 10);

	const filteredData = data.filter((item) => {
		const nameMatch = item.name.toLowerCase().includes(keyword.toLowerCase());
		const descMatch = !item.desc
			? true
			: item.desc.toLowerCase().includes(keyword.toLowerCase());
		const itemTags = item[dataQueryMapping?.tags ?? 'tags'] as API.Tag[];
		const tagsMatch =
			!tags || tags.length === 0
				? true
				: itemTags.some((tag) => tags?.includes(tag.type));
		return (nameMatch || descMatch) && tagsMatch;
	});

	return {
		list: filteredData.slice(startIndex, endIndex),
		totalCount: filteredData.length,
	};
}

export function getRandomSubarray<T>(arr: T[], count: number): T[] {
	const shuffled = arr.slice(); // 复制原数组
	let i = arr.length;
	const min = i - count; // 可选元素的最小索引值
	let temp: T;
	let index: number;
	while (i-- > min) {
		// 只循环需要选的元素个数
		index = Math.floor((i + 1) * Math.random()); // 生成随机索引值
		temp = shuffled[index]; // 交换当前元素和随机选出的元素
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min); // 返回选出的子集
}
