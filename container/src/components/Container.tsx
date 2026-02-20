import { Settings } from 'lucide-react';
import { useState } from 'react';

import { useTheme } from '@/hooks';

import { SettingsPage } from './SettingsPage';
import { SidebarItem } from './SidebarItem';

export function Container() {
    useTheme();

    const [isSettingsOpen, setSettingsOpen] = useState(false);

    return (
        <>
            <div className="flex h-full w-full bg-background">
                <div className="flex flex-col h-full w-16 bg-card border-r border-border">
                    <div className="flex-1"></div>
                    <SidebarItem icon={Settings} onClick={() => setSettingsOpen(true)} />
                </div>
                <div className="flex-1"></div>
            </div>

            <SettingsPage isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
        </>
    );
}
