import { type Optional, type SetValue, type TypedKey, useStore } from 'reactive-store';

import { localStore, sessionStore, sharedStore } from '@/stores';

export function useShared<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    return useStore(sharedStore, key);
}

export function useSession<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    return useStore(sessionStore, key);
}

export function useLocal<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    return useStore(localStore, key);
}
