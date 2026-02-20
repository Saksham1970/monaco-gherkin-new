import type { Unsubscribe } from '@/types';

import type { SettingsManager } from './SettingsManager';
import { type Setting } from './types';

export class DarkModeManager {
    private settingsManager: SettingsManager;
    private modeSetting: Setting<boolean>;
    private cssClass: string;
    private unsubscribe: Unsubscribe;

    constructor(settingsManager: SettingsManager, modeSetting: Setting<boolean>, cssClass = 'dark') {
        this.settingsManager = settingsManager;
        this.modeSetting = modeSetting;
        this.cssClass = cssClass;

        this.settingsManager.registerSetting(this.modeSetting);

        this.apply(this.getMode());
        this.unsubscribe = this.settingsManager.subscribe(this.modeSetting, (mode) =>
            this.apply(this.getModeFromBoolean(mode))
        );
    }

    public getMode(): Mode {
        const mode = this.settingsManager.get(this.modeSetting) ?? this.modeSetting.defaultValue;
        return this.getModeFromBoolean(mode);
    }

    public setMode(mode: Mode): void {
        this.settingsManager.set(this.modeSetting, this.getBooleanFromMode(mode));
    }

    public dispose(): void {
        this.unsubscribe();
    }

    private apply(mode: Mode): void {
        if (this.getBooleanFromMode(mode)) {
            document.documentElement.classList.add(this.cssClass);
        } else {
            document.documentElement.classList.remove(this.cssClass);
        }
    }

    private getModeFromBoolean(mode: boolean): Mode {
        return mode ? MODES.DARK : MODES.LIGHT;
    }

    private getBooleanFromMode(mode: Mode): boolean {
        return mode === MODES.DARK;
    }
}

export const MODES = {
    LIGHT: 'light',
    DARK: 'dark',
    BOTH: 'both',
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];
