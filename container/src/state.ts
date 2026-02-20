import { LocalStorageStore, ObservableStore, SessionStorageStore, SettingsManager } from 'reactive-store';

const SESSION_STORAGE_KEY = 'container.session-storage';
const LOCAL_STORAGE_KEY = 'container.local-storage';
const SETTINGS_KEY = 'container.settings';

export const observableStore = new ObservableStore();
export const sessionStorageStore = new SessionStorageStore(SESSION_STORAGE_KEY);
export const localStorageStore = new LocalStorageStore(LOCAL_STORAGE_KEY);
export const settingsManager = new SettingsManager(new LocalStorageStore(SETTINGS_KEY));
