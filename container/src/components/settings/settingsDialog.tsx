import { useMemo, useState } from 'react';
import type { RegisteredSetting } from 'reactive-store';

import { useSettings } from '@/hooks';

import { SettingsContent } from './settingsContent';
import { SettingsSidebar } from './settingsSidebar';

export interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

function getSectionName(entry: RegisteredSetting): string {
    return entry.setting.section ?? 'General';
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
    const allSettings = useSettings();

    const sections = useMemo(() => [...new Set(allSettings.map(getSectionName))].sort(), [allSettings]);

    const [activeSection, setActiveSection] = useState<string>(sections[0] ?? 'General');

    const sectionSettings = useMemo(
        () => allSettings.filter((s) => getSectionName(s) === activeSection),
        [allSettings, activeSection]
    );

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            role="presentation"
            onClick={onClose}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
        >
            <div
                className="relative flex h-[600px] w-[800px] overflow-hidden rounded-xl bg-background shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label="Settings"
                onClick={(e) => e.stopPropagation()}
            >
                <SettingsSidebar sections={sections} activeSection={activeSection} onSelect={setActiveSection} />
                <SettingsContent section={activeSection} settings={sectionSettings} onClose={onClose} />
            </div>
        </div>
    );
}
