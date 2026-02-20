import type { Setting } from 'reactive-store';

import { useSetting } from '@/hooks';

export function NumberControl({ setting, label }: { setting: Setting<number>; label: string }) {
    const [value, setValue] = useSetting(setting);
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">{label}</label>
            <input
                type="number"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                value={Number(value ?? 0)}
                onChange={(e) => setValue(Number(e.target.value))}
            />
        </div>
    );
}
