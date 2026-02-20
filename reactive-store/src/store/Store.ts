import type { Optional, Unsubscribe } from '@/types';

import type { TypedKey, ValueChangeHandler } from './types';

export interface Store {
    set<T>(key: TypedKey<T>, value: T): void;
    get<T>(key: TypedKey<T>): Optional<T>;
    has<T>(key: TypedKey<T>): boolean;
    delete<T>(key: TypedKey<T>): void;
    subscribe<T>(key: TypedKey<T>, handler: ValueChangeHandler<T>): Unsubscribe;
}
