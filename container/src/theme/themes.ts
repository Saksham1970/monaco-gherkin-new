import { type Mode, MODES, type ValueOf } from 'reactive-store';

export interface ThemeMetadata {
    mode: Mode;
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
    [THEMES.DRACULA]: { mode: MODES.DARK },
    [THEMES.MONOKAI]: { mode: MODES.DARK },
    [THEMES.NORD]: { mode: MODES.BOTH },
    [THEMES.SOLARIZED]: { mode: MODES.BOTH },
    [THEMES.CATPPUCCIN]: { mode: MODES.BOTH },
    [THEMES.GRUVBOX]: { mode: MODES.BOTH },
    [THEMES.TOKYO_NIGHT]: { mode: MODES.BOTH },
    [THEMES.GITHUB]: { mode: MODES.BOTH },
    [THEMES.MATERIAL]: { mode: MODES.BOTH },
    [THEMES.ONE]: { mode: MODES.BOTH },
    [THEMES.ROSE_PINE]: { mode: MODES.BOTH },
    [THEMES.EVERFOREST]: { mode: MODES.BOTH },
};
