import {
    type Optional,
    type RegisteredSetting,
    type Setting,
    type SetValue,
    useSettingsManager,
    useSettingsRegistry,
} from 'reactive-store';

import { useContainerContext } from '@/context';

export function useSetting<T>(setting: Setting<T>): [Optional<T>, SetValue<T>] {
    const { settingsManager } = useContainerContext();
    return useSettingsManager(settingsManager, setting);
}

export function useSettings(): readonly RegisteredSetting[] {
    const { settingsManager } = useContainerContext();
    return useSettingsRegistry(settingsManager);
}
