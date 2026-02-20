import { DarkModeManager, type Setting, ThemeManager } from 'reactive-store';

import { settingsManager } from './state';
import { getOptions, type ValueOf } from './types';

const THEME_ATTRIBUTE = 'data-theme';
const THEME_SETTING_KEY = 'container.theme';
const DARK_MODE_SETTING_KEY = 'container.darkMode';

export const THEMES = {
    DRACULA: 'dracula',
    NORD: 'nord',
    SOLARIZED: 'solarized',
    MONOKAI: 'monokai',
    CATPPUCCIN: 'catppuccin',
    GRUVBOX: 'gruvbox',
    TOKYO_NIGHT: 'tokyo-night',
    GITHUB: 'github',
    MATERIAL: 'material',
    ONE: 'one',
    ROSE_PINE: 'rose-pine',
    EVERFOREST: 'everforest',
} as const;

export type ThemePalette = ValueOf<typeof THEMES>;

export const THEME_METADATA: Record<ThemePalette, { forceDarkMode: boolean | null }> = {
    [THEMES.DRACULA]: { forceDarkMode: true },
    [THEMES.MONOKAI]: { forceDarkMode: true },
    [THEMES.NORD]: { forceDarkMode: null },
    [THEMES.SOLARIZED]: { forceDarkMode: null },
    [THEMES.CATPPUCCIN]: { forceDarkMode: null },
    [THEMES.GRUVBOX]: { forceDarkMode: null },
    [THEMES.TOKYO_NIGHT]: { forceDarkMode: null },
    [THEMES.GITHUB]: { forceDarkMode: null },
    [THEMES.MATERIAL]: { forceDarkMode: null },
    [THEMES.ONE]: { forceDarkMode: null },
    [THEMES.ROSE_PINE]: { forceDarkMode: null },
    [THEMES.EVERFOREST]: { forceDarkMode: null },
};

export const THEME_SETTING: Setting<ThemePalette> = {
    storeKey: THEME_SETTING_KEY,
    defaultValue: THEMES.NORD,
    label: 'Theme Color',
    section: 'Appearance',
    options: getOptions(THEMES),
};

export const DARK_MODE_SETTING: Setting<boolean> = {
    storeKey: DARK_MODE_SETTING_KEY,
    defaultValue: window.matchMedia('(prefers-color-scheme: dark)').matches,
    label: 'Dark Mode',
    section: 'Appearance',
};

export const themeManager = new ThemeManager(settingsManager, THEME_ATTRIBUTE, THEME_SETTING as Setting<string>);
export const darkModeManager = new DarkModeManager(settingsManager, DARK_MODE_SETTING);

settingsManager.subscribe(THEME_SETTING, (newTheme) => {
    const forceMode = THEME_METADATA[newTheme as ThemePalette]?.forceDarkMode;
    if (forceMode !== undefined && forceMode !== null) {
        settingsManager.set(DARK_MODE_SETTING, forceMode);
    }
});
