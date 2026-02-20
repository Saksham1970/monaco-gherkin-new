import { Settings } from 'lucide-react';
import { useState } from 'react';

import { SettingsDialog } from '@/components/settings';
import { SidebarItem } from '@/components/sidebarItem';
import { useTheme } from '@/hooks';

export function Container() {
    useTheme();

    const [isSettingsOpen, setSettingsOpen] = useState(false);

    return (
        <>
            <div className="flex h-full w-full bg-background">
                <div className="flex flex-col h-full w-16 bg-card">
                    <div className="flex-1" />
                    <SidebarItem Icon={Settings} label="Open Settings" onClick={() => setSettingsOpen(true)} />
                </div>
                <div className="flex-1" />
            </div>

            <SettingsDialog isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
        </>
    );
}
