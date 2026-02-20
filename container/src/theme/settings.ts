import { getOptions, MODES, type Setting } from 'reactive-store';

import { THEME_METADATA, type ThemePalette, THEMES } from './themes';

export const THEME_KEY = 'container.theme';
export const DARK_MODE_KEY = 'container.darkMode';

export const THEME_SETTING: Setting<ThemePalette> = {
    storeKey: THEME_KEY,
    defaultValue: THEMES.NORD,
    label: 'Theme',
    section: 'Appearance',
    options: getOptions(THEMES),
};

export const DARK_MODE_SETTING: Setting<boolean> = {
    storeKey: DARK_MODE_KEY,
    defaultValue: window.matchMedia('(prefers-color-scheme: dark)').matches,
    label: 'Dark Mode',
    section: 'Appearance',
    disabled: (manager) => {
        const theme = manager.get(THEME_SETTING) ?? THEME_SETTING.defaultValue;
        return THEME_METADATA[theme].forceDarkMode !== MODES.BOTH;
    },
};
