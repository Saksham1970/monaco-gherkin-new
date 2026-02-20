import type { Unsubscribe } from '@/types';

import type { Store } from './Store';
import type { StoreKey, TypedKey, ValueChangeHandler } from './types';

export class SharedStore implements Store {
    protected values = new Map<StoreKey, unknown>();
    protected handlers = new Map<StoreKey, Set<ValueChangeHandler<unknown>>>();

    public set<T>(key: TypedKey<T>, value: T): void {
        if (this.isUnchanged(key, value)) return;

        this.values.set(key, value);
        this.notifyHandlers(key, value);
    }

    public get<T>(key: TypedKey<T>): T | undefined {
        return this.values.get(key) as T;
    }

    public has<T>(key: TypedKey<T>): boolean {
        return this.values.has(key);
    }

    public delete<T>(key: TypedKey<T>): void {
        this.values.delete(key);
        this.notifyHandlers(key, undefined);
    }

    public subscribe<T>(key: TypedKey<T>, handler: ValueChangeHandler<T>): Unsubscribe {
        if (!this.handlers.has(key)) {
            this.handlers.set(key, new Set());
        }

        const handlers = this.handlers.get(key)!;
        const handlerAny = handler as ValueChangeHandler<unknown>;

        handlers.add(handlerAny);

        return () => {
            handlers.delete(handlerAny);
            if (handlers.size === 0) this.handlers.delete(key);
        };
    }

    protected notifyHandlers(id: StoreKey, value: unknown): void {
        const handlers = this.handlers.get(id);
        if (handlers) {
            handlers.forEach((handler) => handler(value));
        }
    }

    private isUnchanged<T>(key: TypedKey<T>, next: T): boolean {
        const current = this.get(key);
        return current !== undefined && JSON.stringify(current) === JSON.stringify(next);
    }
}
