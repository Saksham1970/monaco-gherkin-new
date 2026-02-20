import type { Optional, SetValue } from 'reactive-store';

import { DARK_MODE_SETTING, THEME_SETTING, type ThemePalette } from '@/theme';

import { useSetting } from './useAppSettings';

export function useTheme(): [Optional<ThemePalette>, SetValue<ThemePalette>] {
    return useSetting(THEME_SETTING);
}

export function useDarkMode(): [Optional<boolean>, SetValue<boolean>] {
    return useSetting(DARK_MODE_SETTING);
}
