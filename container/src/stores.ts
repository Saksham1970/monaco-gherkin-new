import { LocalStore, SessionStore, SettingsManager, SharedStore } from 'reactive-store';

const SESSION_KEY = 'container.session';
const LOCAL_KEY = 'container.local';
const SETTINGS_KEY = 'container.settings';

export const sharedStore = new SharedStore();
export const sessionStore = new SessionStore(SESSION_KEY);
export const localStore = new LocalStore(LOCAL_KEY);
export const settingsManager = new SettingsManager(new LocalStore(SETTINGS_KEY));
