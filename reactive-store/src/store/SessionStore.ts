import { PersistedStore } from './PersistedStore';

export class SessionStore extends PersistedStore {
    constructor(storageKey: string) {
        super(storageKey, sessionStorage);
    }
}
