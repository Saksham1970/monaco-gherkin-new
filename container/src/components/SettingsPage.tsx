import { useMemo, useState } from 'react';
import type { RegisteredSetting } from 'reactive-store';

import { useSetting, useSettings } from '@/hooks';
import { THEME_METADATA, THEME_SETTING, type ThemePalette } from '@/theme';

import { SettingControl } from './SettingControl';

export function SettingsPage({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const settings = useSettings();
    const [themeValue] = useSetting(THEME_SETTING);
    const forceDarkMode = THEME_METADATA[themeValue as ThemePalette]?.forceDarkMode;
    const getSection = (s: RegisteredSetting<unknown>) => s.setting.section || 'General';

    const sections = useMemo(() => {
        const uniqueSections = new Set<string>();
        settings.forEach((s) => uniqueSections.add(getSection(s)));
        return Array.from(uniqueSections).sort();
    }, [settings]);

    const [activeSection, setActiveSection] = useState<string>(sections[0]);

    const activeSettings = useMemo(() => {
        return settings.filter((s) => getSection(s) === activeSection);
    }, [settings, activeSection]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="relative flex h-[600px] w-[800px] overflow-hidden rounded-xl bg-background shadow-2xl">
                {/* Sidebar */}
                <div className="w-64 border-r border-border bg-card p-4">
                    <h2 className="mb-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Settings</h2>
                    <ul className="space-y-1">
                        {sections.map((section) => (
                            <li key={section}>
                                <button
                                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                                        activeSection === section
                                            ? 'bg-secondary text-foreground'
                                            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                    }`}
                                    onClick={() => setActiveSection(section)}
                                >
                                    {section}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">{activeSection}</h1>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="space-y-6">
                        {activeSettings.map((entry) => {
                            const isDarkModeToggle = entry.setting.storeKey === 'container.darkMode';
                            const disabled = isDarkModeToggle && forceDarkMode !== null && forceDarkMode !== undefined;
                            return <SettingControl key={entry.setting.storeKey} entry={entry} disabled={disabled} />;
                        })}
                        {activeSettings.length === 0 && (
                            <p className="text-muted-foreground">No settings available in this section.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
