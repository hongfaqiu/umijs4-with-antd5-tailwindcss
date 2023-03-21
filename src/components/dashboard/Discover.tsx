import { useState } from 'react';

import { Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRequest } from 'umi';

import useT from '@/hooks/use-t';
import { getCategories, getTemplates } from '@/services/workflow/workflow';

import SearchBar from '../SearchBar';
import List from '../ui/List';
import TemplateCard, { TemplateCardPlaceholder } from './TemplateCard';

export default function () {
	const t = useT();
	const [params, setParams] = useState<API.QueryParams>({
		pageSize: 20,
		page: 1,
		tags: [],
		keyword: '',
	});
	const [templates, setTemplates] = useState<
		Omit<API.WorkflowTemplate, 'content'>[]
	>([]);
	const [selectedTags, setSelectedTags] = useState<API.Tag[]>([]);

	const { data, loading, run } = useRequest(getTemplates, {
		onSuccess: (res, params) => {
			if (params[0]?.page === 1) {
				setTemplates(res.list);
			} else {
				setTemplates([...templates, ...res.list]);
			}
		},
	});

	const { data: categories } = useRequest(() => getCategories());

	const updateParams = (params: API.QueryParams) => {
		if (params.page === 1) {
			setTemplates([]);
		}
		setParams(params);
		run(params);
	};

	const loadMore = () => {
		updateParams({ ...params, page: (params.page ?? 0) + 1 });
	};

	// 处理搜索文本框内容变化
	const onSearch = (keyword: string) => {
		updateParams({ ...params, keyword, page: 1 });
	};

	// 处理点击菜单项事件
	const onClick = (key: string) => {
		const clickedItem = categories?.list.find((item) => item.type === key);
		if (!clickedItem || params.tags?.includes(key)) return;

		setSelectedTags([...selectedTags, clickedItem]);
		const newSelectedTags = [key, ...(params.tags ?? [])];
		updateParams({ ...params, tags: newSelectedTags, page: 1 });
	};

	// 处理标签的删除事件
	const handleTagClose = (removedTag: string) => {
		const newSelectedTags = selectedTags?.filter(
			(tag) => tag.type !== removedTag,
		);
		setSelectedTags(newSelectedTags);
		updateParams({
			...params,
			tags: newSelectedTags.map((item) => item.type),
			page: 1,
		});
	};

	const isAll = templates.length >= (data?.totalCount ?? 0);

	return (
		<div className="w-full">
			<h2 className="mb-6 text-2xl">{t('dashborad.discover.title')}</h2>
			<div className="flex w-full flex-row">
				{/* 左侧类别列表 */}
				<div className="w-[200px]">
					<List
						items={categories?.list.map((item) => item.type)}
						onDeselectItem={handleTagClose}
						onSelectItem={onClick}
						selectedKeys={params.tags}
						className="sticky top-[80px]"
					/>
				</div>

				{/* 右侧检索部分 */}
				<div className="flex w-3/4 flex-col px-6">
					{/* 检索输入框、标签选择和数量 */}
					<div className="flex flex-row items-center p-4">
						<SearchBar onSearch={onSearch} />

						<div className="ml-auto flex flex-row items-center">
							{selectedTags?.map((tag) => (
								<Tag
									key={tag.type}
									color={tag.color}
									closable
									onClose={() => handleTagClose(tag.type)}
								>
									{tag.type}
								</Tag>
							))}
							<div className="my-4 ">
								{t('list.total', { num: data?.totalCount ?? 0 })}
							</div>
						</div>
					</div>

					<InfiniteScroll
						dataLength={templates.length}
						next={loadMore}
						hasMore={!isAll}
						loader={null}
						endMessage={
							!isAll ? null : (
								<p className="mt-8 text-center">
									<b>{t('list.end')}</b>
								</p>
							)
						}
					>
						<div className="grid-col">
							{templates.map((card, index) => (
								<TemplateCard
									key={index}
									title={card.name}
									desc={card.desc}
									avatar={card.createUser?.avatar}
									creatorName={card.createUser?.name}
									tags={card.tags}
								/>
							))}
							{loading &&
								new Array(10)
									.fill(0)
									.map((i, index) => <TemplateCardPlaceholder key={index} />)}
						</div>
					</InfiniteScroll>
				</div>
			</div>
		</div>
	);
}
