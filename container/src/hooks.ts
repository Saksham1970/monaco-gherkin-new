import {
    type Optional,
    type Setting,
    type SetValue,
    type TypedKey,
    useSettingsManager,
    useSettingsRegistry,
    useStore,
} from 'reactive-store';

import { localStorageStore, observableStore, sessionStorageStore, settingsManager } from './state';
import { DARK_MODE_SETTING, THEME_SETTING, type ThemePalette } from './theme';

export function useSetting<T>(setting: Setting<T>): [Optional<T>, SetValue<T>] {
    return useSettingsManager(settingsManager, setting);
}

export function useSettings() {
    return useSettingsRegistry(settingsManager);
}

export function useTheme(): [Optional<ThemePalette>, SetValue<ThemePalette>] {
    return useSetting(THEME_SETTING);
}

export function useDarkMode(): [Optional<boolean>, SetValue<boolean>] {
    return useSetting(DARK_MODE_SETTING);
}

export function useShared<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    return useStore(observableStore, key);
}

export function useSession<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    return useStore(sessionStorageStore, key);
}

export function useLocal<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    return useStore(localStorageStore, key);
}
