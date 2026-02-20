import { PersistedStore } from './PersistedStore';

export class LocalStore extends PersistedStore {
    constructor(storageKey: string) {
        super(storageKey, localStorage);
    }
}
