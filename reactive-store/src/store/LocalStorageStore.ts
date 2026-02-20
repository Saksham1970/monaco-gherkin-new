import { PersistedStore } from './PersistedStore';

export class LocalStorageStore extends PersistedStore {
    constructor(storageKey: string) {
        super(storageKey, localStorage);
    }
}
