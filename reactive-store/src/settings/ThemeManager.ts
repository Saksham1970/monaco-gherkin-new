import type { Unsubscribe } from '@/types';

import type { SettingsManager } from './SettingsManager';
import type { Setting, Theme } from './types';

export class ThemeManager {
    private settingsManager: SettingsManager;
    private themeAttribute: string;
    private themeSetting: Setting<Theme>;
    private unsubscribe: Unsubscribe;

    constructor(settingsManager: SettingsManager, themeAttribute: string, themeSetting: Setting<Theme>) {
        this.settingsManager = settingsManager;
        this.themeAttribute = themeAttribute;
        this.themeSetting = themeSetting;

        this.settingsManager.registerSetting(this.themeSetting);

        this.applyTheme(this.getTheme());
        this.unsubscribe = this.settingsManager.subscribe(this.themeSetting, (theme) => this.applyTheme(theme));
    }

    public getTheme(): Theme {
        return this.settingsManager.get(this.themeSetting) ?? this.themeSetting.defaultValue;
    }

    public setTheme(theme: Theme): void {
        this.settingsManager.set(this.themeSetting, theme);
    }

    public dispose(): void {
        this.unsubscribe();
    }

    private applyTheme(theme: Theme): void {
        document.documentElement.setAttribute(this.themeAttribute, theme);
    }
}
