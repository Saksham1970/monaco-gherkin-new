import type { Store } from '@/store/Store';
import type { ValueChangeHandler } from '@/store/types';
import type { Optional, Unsubscribe } from '@/types';

import type { RegisteredSetting, RegistryChangeHandler, Setting } from './types';

export class SettingsManager {
    private registeredSettings: Setting<unknown>[] = [];
    private registryHandlers = new Set<RegistryChangeHandler>();
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    public registerSetting<T>(setting: Setting<T>): void {
        if (this.isAlreadyRegistered(setting)) return;

        this.registeredSettings.push(setting);
        this.seedDefaultValue(setting);
        this.notifyRegistryHandlers();
    }

    public get<T>(setting: Setting<T>): Optional<T> {
        if (this.registeredSettings.includes(setting)) {
            return this.store.get(setting.storeKey);
        }
        return undefined;
    }

    public set<T>(setting: Setting<T>, value: T): void {
        this.registerSetting(setting);
        this.store.set(setting.storeKey, value);
    }

    public getSettingsRegistry(): readonly RegisteredSetting[] {
        return this.registeredSettings.map((setting) => ({
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

    private isAlreadyRegistered<T>(setting: Setting<T>): boolean {
        return this.registeredSettings.some((s) => s.storeKey === setting.storeKey);
    }

    private seedDefaultValue<T>(setting: Setting<T>): void {
        if (!this.store.has(setting.storeKey)) {
            this.store.set(setting.storeKey, setting.defaultValue);
        }
    }

    private notifyRegistryHandlers(): void {
        this.registryHandlers.forEach((handler) => handler());
    }
}
