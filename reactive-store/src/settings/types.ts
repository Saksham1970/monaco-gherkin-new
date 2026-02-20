import type { TypedKey } from '@/store/types';
import type { ValueOf } from '@/types';

import type { MODES } from './DarkModeManager';
import type { SettingsManager } from './SettingsManager';

export type Setting<T> = {
    storeKey: TypedKey<T>;
    defaultValue: T;
    label?: string;
    section?: string;
    options?: T[];
    disabled?: (manager: SettingsManager) => boolean;
};

export type RegistryChangeHandler = () => void;

export type RegisteredSetting<T = unknown> = {
    setting: Setting<T>;
    value: T;
};

export type Mode = ValueOf<typeof MODES>;
