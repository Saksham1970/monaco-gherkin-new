import { SharedStore } from './SharedStore';
import type { TypedKey } from './types';

export class PersistedStore extends SharedStore {
    private readonly storage: Storage;
    private readonly storageKey: string;

    constructor(storageKey: string, storage: Storage) {
        super();
        this.storageKey = storageKey;
        this.storage = storage;
        this.loadFromStorage();
    }

    public override set<T>(key: TypedKey<T>, value: T): void {
        super.set(key, value);
        this.saveToStorage(key, value);
    }

    private saveToStorage<T>(key: TypedKey<T>, value: T): void {
        const storageId = `${this.storageKey}:${key}`;
        this.storage.setItem(storageId, JSON.stringify(value));
    }

    private loadFromStorage(): void {
        const prefix = `${this.storageKey}:`;

        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (!key || !key.startsWith(prefix)) {
                continue;
            }

            const storeKey = key.substring(prefix.length);
            const json = this.storage.getItem(key);

            if (!json) {
                continue;
            }

            try {
                const value = JSON.parse(json);
                this.values.set(storeKey, value);
            } catch (error) {
                console.error(`[PersistedStore] Failed to load "${key}":`, error);
            }
        }
    }
}
