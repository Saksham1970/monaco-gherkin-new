import {
    type Optional,
    type RegisteredSetting,
    type Setting,
    type SetValue,
    useSettingsManager,
    useSettingsRegistry,
} from 'reactive-store';

import { settingsManager } from '@/stores';

export function useSetting<T>(setting: Setting<T>): [Optional<T>, SetValue<T>] {
    return useSettingsManager(settingsManager, setting);
}

export function useSettings(): readonly RegisteredSetting[] {
    return useSettingsRegistry(settingsManager);
}
