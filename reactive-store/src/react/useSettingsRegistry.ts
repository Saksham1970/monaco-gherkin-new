import { useEffect, useState } from 'react';

import type { SettingsManager } from '@/settings/SettingsManager';
import type { RegisteredSetting } from '@/settings/types';

export function useSettingsRegistry(settingsManager: SettingsManager): readonly RegisteredSetting[] {
    const [settings, setSettings] = useState(settingsManager.getSettingsRegistry());

    useEffect(() => {
        return settingsManager.subscribeToRegistry(() => {
            setSettings(settingsManager.getSettingsRegistry());
        });
    }, [settingsManager]);

    return settings;
}
