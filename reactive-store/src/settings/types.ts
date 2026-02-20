import type { TypedKey } from '@/store/types';

export type Setting<T> = {
    storeKey: TypedKey<T>;
    defaultValue: T;
    label?: string;
    section?: string;
    options?: T[];
};

export type RegistryChangeHandler = () => void;

export type RegisteredSetting<T = unknown> = {
    setting: Setting<T>;
    value: T;
};

export type Theme = string;
