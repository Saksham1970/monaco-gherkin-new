import type { Unsubscribe } from '@/types';

import type { SettingsManager } from './SettingsManager';
import type { Setting } from './types';

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
        this.unsubscribe = this.settingsManager.subscribe(this.modeSetting, (mode) => this.apply(mode));
    }

    public getMode(): boolean {
        return this.settingsManager.get(this.modeSetting) ?? this.modeSetting.defaultValue;
    }

    public setMode(mode: boolean): void {
        this.settingsManager.set(this.modeSetting, mode);
    }

    public dispose(): void {
        this.unsubscribe();
    }

    private apply(isDark: boolean): void {
        if (isDark) {
            document.documentElement.classList.add(this.cssClass);
        } else {
            document.documentElement.classList.remove(this.cssClass);
        }
    }
}
