import { DarkModeManager, ThemeManager } from 'reactive-store';

import { settingsManager } from '@/stores';

import type { ThemePalette } from './themes';
import { DARK_MODE_SETTING, THEME_SETTING } from './themeSettings';

const THEME_ATTRIBUTE = 'data-theme';

export const themeManager = new ThemeManager<ThemePalette>(settingsManager, THEME_ATTRIBUTE, THEME_SETTING);

export const darkModeManager = new DarkModeManager(settingsManager, DARK_MODE_SETTING);
