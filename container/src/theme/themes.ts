import { type Mode, MODES, type ValueOf } from 'reactive-store';

export interface ThemeMetadata {
    forceDarkMode: Mode;
}

export const THEMES = {
    DRACULA: 'Dracula',
    NORD: 'Nord',
    SOLARIZED: 'Solarized',
    MONOKAI: 'Monokai',
    CATPPUCCIN: 'Catppuccin',
    GRUVBOX: 'Gruvbox',
    TOKYO_NIGHT: 'Tokyo Night',
    GITHUB: 'GitHub',
    MATERIAL: 'Material',
    ONE: 'One',
    ROSE_PINE: 'Rose Pine',
    EVERFOREST: 'Everforest',
} as const;

export type ThemePalette = ValueOf<typeof THEMES>;

export const THEME_METADATA: Record<ThemePalette, ThemeMetadata> = {
    [THEMES.DRACULA]: { forceDarkMode: MODES.DARK },
    [THEMES.MONOKAI]: { forceDarkMode: MODES.DARK },
    [THEMES.NORD]: { forceDarkMode: MODES.BOTH },
    [THEMES.SOLARIZED]: { forceDarkMode: MODES.BOTH },
    [THEMES.CATPPUCCIN]: { forceDarkMode: MODES.BOTH },
    [THEMES.GRUVBOX]: { forceDarkMode: MODES.BOTH },
    [THEMES.TOKYO_NIGHT]: { forceDarkMode: MODES.BOTH },
    [THEMES.GITHUB]: { forceDarkMode: MODES.BOTH },
    [THEMES.MATERIAL]: { forceDarkMode: MODES.BOTH },
    [THEMES.ONE]: { forceDarkMode: MODES.BOTH },
    [THEMES.ROSE_PINE]: { forceDarkMode: MODES.BOTH },
    [THEMES.EVERFOREST]: { forceDarkMode: MODES.BOTH },
};
