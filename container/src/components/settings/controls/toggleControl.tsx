import { useSetting } from '@/hooks';

import type { BaseControlProps } from '.';

export const ToggleControl = ({ setting, label, disabled }: BaseControlProps<boolean>) => {
    const [value, setValue] = useSetting(setting);
    const inputId = `toggle-${setting.storeKey}`;
    return (
        <div className={`flex items-center justify-between ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="text-sm font-medium text-foreground cursor-pointer" htmlFor={inputId}>
                {label}
            </label>
            <input
                id={inputId}
                type="checkbox"
                className="appearance-none h-6 w-11 rounded-full bg-input relative cursor-pointer outline-none transition-colors shrink-0 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform checked:bg-primary checked:after:translate-x-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed"
                checked={Boolean(value)}
                disabled={disabled}
                onChange={(e) => setValue(e.target.checked)}
            />
        </div>
    );
};
