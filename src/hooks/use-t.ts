import { useIntl } from 'umi';

export type NestedKeyOf<ObjectType> = ObjectType extends object
	? {
			[Key in keyof ObjectType]:
				| `${Key & string}`
				| `${Key & string}.${NestedKeyOf<ObjectType[Key]>}`;
	  }[keyof ObjectType]
	: never;

export type NestedValueOf<
	ObjectType,
	Property extends string,
> = Property extends `${infer Key}.${infer Rest}`
	? Key extends keyof ObjectType
		? NestedValueOf<ObjectType[Key], Rest>
		: never
	: Property extends keyof ObjectType
	? ObjectType[Property]
	: never;

export type NamespaceKeys<ObjectType, Keys extends string> = {
	[Property in Keys]: NestedValueOf<ObjectType, Property> extends string
		? never
		: Property;
}[Keys];

export type IntlMessages = typeof import('@/locales/messages/en-US.json');

export type MessageKeys<ObjectType, Keys extends string> = {
	[Property in Keys]: NestedValueOf<ObjectType, Property> extends string
		? Property
		: never;
}[Keys];

export default function useT<
	NestedKey extends NamespaceKeys<
		IntlMessages,
		NestedKeyOf<IntlMessages>
	> = never,
>(namespace?: NestedKey) {
	const intl = useIntl();

	return (
		id: MessageKeys<
			NestedValueOf<
				{
					'!': IntlMessages;
				},
				[NestedKey] extends [never] ? '!' : `!.${NestedKey}`
			>,
			NestedKeyOf<
				NestedValueOf<
					{
						'!': IntlMessages;
					},
					[NestedKey] extends [never] ? '!' : `!.${NestedKey}`
				>
			>
		>,
		values?: Record<string, any>,
	) =>
		intl.formatMessage(
			{ id: (namespace ? `${namespace}.${String(id)}` : id) as any },
			values,
		);
}
