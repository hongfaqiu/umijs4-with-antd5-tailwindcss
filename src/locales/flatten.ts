// react-intl 默认只支持平铺形式的json
export default function flattenMessages(
	nestedMessages: Record<string, any>,
	prefix = '',
) {
	return Object.keys(nestedMessages).reduce(
		(messages: Record<string, any>, key) => {
			let value = nestedMessages[key];
			let prefixedKey = prefix ? `${prefix}.${key}` : key;

			if (typeof value === 'string') {
				messages[prefixedKey] = value;
			} else {
				Object.assign(messages, flattenMessages(value, prefixedKey));
			}

			return messages;
		},
		{},
	);
}
