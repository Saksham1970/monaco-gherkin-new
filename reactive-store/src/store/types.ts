export type ValueChangeHandler<T> = (value: T) => void;

export type StoreKey = string;

/**
 * A string key branded with a phantom type T.
 * Ensures type-safe get/set calls share the same value type without runtime overhead.
 * Usage: const MY_KEY = 'my.key' as TypedKey<MyValueType>;
 */
export type TypedKey<T> = StoreKey & { readonly __type__?: T };
