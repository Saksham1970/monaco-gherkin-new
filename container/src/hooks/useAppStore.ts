import { type Optional, type SetValue, type TypedKey, useStore } from 'reactive-store';

import { useContainerContext } from '@/context';

export function useShared<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    const { sharedStore } = useContainerContext();
    return useStore(sharedStore, key);
}

export function useSession<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    const { sessionStore } = useContainerContext();
    return useStore(sessionStore, key);
}

export function useLocal<T>(key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    const { localStore } = useContainerContext();
    return useStore(localStore, key);
}
