import type React from 'react';
import type { RegisteredSetting, Setting } from 'reactive-store';

import { NumberControl } from './numberControl';
import { SelectControl } from './selectControl';
import { TextControl } from './textControl';
import { ToggleControl } from './toggleControl';

export { NumberControl, SelectControl, TextControl, ToggleControl };
export type { BaseControlProps } from './controlTypes';

/**
 * Dispatches to the correct control based on the setting's type.
 * Priority: options (select) > boolean > number > string (text fallback).
 */
export function renderSettingControl(entry: RegisteredSetting, disabled?: boolean): React.ReactNode {
    const { setting } = entry;
    const label = setting.label ?? setting.storeKey;

    if (setting.options) {
        return (
            <SelectControl
                key={setting.storeKey}
                setting={setting as Setting<string>}
                label={label}
                disabled={disabled}
            />
        );
    }
    if (typeof setting.defaultValue === 'boolean') {
        return (
            <ToggleControl
                key={setting.storeKey}
                setting={setting as Setting<boolean>}
                label={label}
                disabled={disabled}
            />
        );
    }
    if (typeof setting.defaultValue === 'number') {
        return <NumberControl key={setting.storeKey} setting={setting as Setting<number>} label={label} />;
    }
    return <TextControl key={setting.storeKey} setting={setting as Setting<string>} label={label} />;
}
