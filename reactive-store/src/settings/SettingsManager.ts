import type { Store } from '@/store/Store';
import type { ValueChangeHandler } from '@/store/types';
import type { Optional, Unsubscribe } from '@/types';

import type { RegisteredSetting, RegistryChangeHandler, Setting } from './types';

export class SettingsManager {
    private settings: Setting<unknown>[] = [];
    private registryHandlers = new Set<RegistryChangeHandler>();
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    public registerSetting<T>(setting: Setting<T>): void {
        if (this.settings.some((s) => s.storeKey === setting.storeKey)) {
            return;
        }

        this.settings.push(setting);
        if (!this.store.has(setting.storeKey)) {
            this.store.set(setting.storeKey, setting.defaultValue);
        }
        this.notifyRegistryHandlers();
    }

    public get<T>(setting: Setting<T>): Optional<T> {
        if (this.settings.includes(setting)) {
            return this.store.get(setting.storeKey);
        }
        return undefined;
    }

    public set<T>(setting: Setting<T>, value: T): void {
        this.registerSetting(setting);
        this.store.set(setting.storeKey, value);
    }

    public getSettingsRegistry(): readonly RegisteredSetting[] {
        return this.settings.map((setting) => ({
            setting: setting,
            value: this.get(setting),
        }));
    }

    public subscribe<T>(setting: Setting<T>, handler: ValueChangeHandler<T>): Unsubscribe {
        this.registerSetting(setting);
        return this.store.subscribe(setting.storeKey, handler);
    }

    public subscribeToRegistry(handler: RegistryChangeHandler): Unsubscribe {
        this.registryHandlers.add(handler);
        return () => {
            this.registryHandlers.delete(handler);
        };
    }

    private notifyRegistryHandlers(): void {
        this.registryHandlers.forEach((handler) => handler());
    }
}
