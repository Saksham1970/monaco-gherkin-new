import { Settings } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DarkModeManager, LocalStore, SessionStore, SettingsManager, SharedStore, ThemeManager } from 'reactive-store';

import { SettingsDialog } from '@/components/settings';
import { SidebarItem } from '@/components/sidebarItem';
import { ContainerContext } from '@/context';
import { useTheme } from '@/hooks';
import { DARK_MODE_SETTING, THEME_SETTING, type ThemePalette } from '@/theme';

export interface ContainerProps {
    instanceId?: string;
}

const THEME_ATTRIBUTE = 'data-theme';

export const Container = ({ instanceId = 'default' }: ContainerProps) => {
    const stores = useMemo(() => {
        const sharedStore = new SharedStore();
        const sessionStore = new SessionStore(`container.${instanceId}.session`);
        const localStore = new LocalStore(`container.${instanceId}.local`);
        const settingsManager = new SettingsManager(new LocalStore(`container.${instanceId}.settings`));
        const themeManager = new ThemeManager<ThemePalette>(settingsManager, THEME_ATTRIBUTE, THEME_SETTING);
        const darkModeManager = new DarkModeManager(settingsManager, DARK_MODE_SETTING);

        return { sharedStore, sessionStore, localStore, settingsManager, themeManager, darkModeManager };
    }, [instanceId]);

    return (
        <ContainerContext.Provider value={stores}>
            <ContainerInner />
        </ContainerContext.Provider>
    );
};

function ContainerInner() {
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
