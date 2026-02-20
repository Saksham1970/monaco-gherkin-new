import type { Unsubscribe } from '@/types';

import type { SettingsManager } from './SettingsManager';
import type { Setting } from './types';

export class ThemeManager<T extends string> {
    private settingsManager: SettingsManager;
    private themeAttribute: string;
    private themeSetting: Setting<T>;
    private unsubscribe: Unsubscribe;

    constructor(settingsManager: SettingsManager, themeAttribute: string, themeSetting: Setting<T>) {
        this.settingsManager = settingsManager;
        this.themeAttribute = themeAttribute;
        this.themeSetting = themeSetting;

        this.settingsManager.registerSetting(this.themeSetting);

        this.applyTheme(this.getTheme());
        this.unsubscribe = this.settingsManager.subscribe(this.themeSetting, (theme) => this.applyTheme(theme));
    }

    public getTheme(): T {
        return this.settingsManager.get(this.themeSetting) ?? this.themeSetting.defaultValue;
    }

    public setTheme(theme: T): void {
        this.settingsManager.set(this.themeSetting, theme);
    }

    public dispose(): void {
        this.unsubscribe();
    }

    private applyTheme(theme: T): void {
        document.documentElement.setAttribute(this.themeAttribute, theme);
    }
}
