import type { ValueOf } from './types';

/** Returns an array of all values in a const enum-style object. */
export function getOptions<T extends Record<string, unknown>>(options: T): ValueOf<T>[] {
    return Object.values(options) as ValueOf<T>[];
}
