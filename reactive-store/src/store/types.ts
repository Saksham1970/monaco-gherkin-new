export type StoreChangeHandler = (id: string, value: unknown) => void;
export type ValueChangeHandler<T> = (value: T) => void;

export type StoreKey = string;
export type TypedKey<T> = StoreKey & { __type__?: T };
