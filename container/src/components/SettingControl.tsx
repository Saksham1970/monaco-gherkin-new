import type { RegisteredSetting } from 'reactive-store';

import { useSetting } from '@/hooks';

export function SettingControl({ entry, disabled }: { entry: RegisteredSetting; disabled?: boolean }) {
    const { setting } = entry;
    const [value, setValue] = useSetting(setting);

    const label = setting.label || setting.storeKey;

    if (setting.options) {
        return (
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    value={String(value)}
                    onChange={(e) => setValue(e.target.value)}
                >
                    {setting.options.map((option) => (
                        <option key={String(option)} value={String(option)}>
                            {String(option)}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (typeof setting.defaultValue === 'boolean') {
        return (
            <div className={`flex items-center justify-between ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="text-sm font-medium text-foreground">{label}</label>
                <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-input bg-background text-primary accent-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed"
                    checked={Boolean(value)}
                    disabled={disabled}
                    onChange={(e) => setValue(e.target.checked)}
                />
            </div>
        );
    }

    if (typeof setting.defaultValue === 'number') {
        return (
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <input
                    type="number"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    value={Number(value)}
                    onChange={(e) => setValue(Number(e.target.value))}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">{label}</label>
            <input
                type="text"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                value={String(value)}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
