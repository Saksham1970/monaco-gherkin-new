import { type RegisteredSetting } from 'reactive-store';

import { useContainerContext } from '@/context';

import { renderSettingControl } from './controls';

export interface SettingsContentProps {
    section: string;
    settings: RegisteredSetting[];
    onClose: () => void;
}

export const SettingsContent = ({ section, settings, onClose }: SettingsContentProps) => {
    const { settingsManager } = useContainerContext();

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground m-0">{section}</h1>
                <button
                    className="rounded-lg p-2 bg-transparent border-none cursor-pointer text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Close settings"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
            <div className="flex flex-col gap-6">
                {settings.map((entry) => {
                    return renderSettingControl(entry, entry.setting.disabled?.(settingsManager));
                })}
                {settings.length === 0 && (
                    <p className="text-muted-foreground">No settings available in this section.</p>
                )}
            </div>
        </div>
    );
};
