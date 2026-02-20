import { createContext, useContext } from 'react';
import {
    type DarkModeManager,
    type LocalStore,
    type SessionStore,
    type SettingsManager,
    type SharedStore,
    type ThemeManager,
} from 'reactive-store';

export interface ContainerStores<Theme extends string> {
    sharedStore: SharedStore;
    sessionStore: SessionStore;
    localStore: LocalStore;
    settingsManager: SettingsManager;
    themeManager: ThemeManager<Theme>;
    darkModeManager: DarkModeManager;
}

export const ContainerContext = createContext<ContainerStores<string> | null>(null);

export function useContainerContext(): ContainerStores<string> {
    const ctx = useContext(ContainerContext);
    if (!ctx) {
        throw new Error('useContainerContext must be used within a Container');
    }
    return ctx;
}
