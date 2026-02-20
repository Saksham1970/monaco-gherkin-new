import { useEffect, useState } from 'react';

import type { SettingsManager } from '@/settings/SettingsManager';
import type { Setting } from '@/settings/types';
import type { Optional, SetValue } from '@/types';

export function useSettingsManager<T>(
    settingsManager: SettingsManager,
    setting: Setting<T>
): [Optional<T>, SetValue<T>] {
    const [value, setValue] = useState<Optional<T>>(settingsManager.get(setting));

    useEffect(() => {
        return settingsManager.subscribe(setting, setValue);
    }, [settingsManager, setting]);

    return [value, (newValue: T) => settingsManager.set(setting, newValue)];
}
