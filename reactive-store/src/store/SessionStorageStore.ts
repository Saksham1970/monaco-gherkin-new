import { PersistedStore } from './PersistedStore';

export class SessionStorageStore extends PersistedStore {
    constructor(storageKey: string) {
        super(storageKey, sessionStorage);
    }
}
