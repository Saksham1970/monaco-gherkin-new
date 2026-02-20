import type { TypedKey } from '@/store/types';

export type Setting<T> = {
    storeKey: TypedKey<T>;
    defaultValue: T;
    label?: string;
    section?: string;
    options?: T[];
    disabled?: () => boolean;
};

export type RegistryChangeHandler = () => void;

export type RegisteredSetting<T = unknown> = {
    setting: Setting<T>;
    value: T;
};
