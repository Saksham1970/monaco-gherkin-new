import { useSetting } from '@/hooks';

import type { BaseControlProps } from '.';

export const SelectControl = ({ setting, label, disabled }: BaseControlProps<string>) => {
    const [value, setValue] = useSetting(setting);
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">{label}</label>
            <select
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none cursor-pointer appearance-auto focus:outline-2 focus:outline-offset-2 focus:outline-ring"
                value={String(value ?? '')}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
            >
                {setting.options?.map((option) => (
                    <option key={String(option)} value={String(option)}>
                        {String(option)}
                    </option>
                ))}
            </select>
        </div>
    );
};
