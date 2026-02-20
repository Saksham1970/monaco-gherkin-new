export type Unsubscribe = () => void;
export type Optional<T> = T | undefined;
export type SetValue<T> = (value: T) => void;

/** Extracts the union of all value types from a const record object. */
export type ValueOf<T extends Record<string, unknown>> = T[keyof T];
