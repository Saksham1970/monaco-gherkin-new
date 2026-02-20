import { useEffect, useState } from 'react';

import type { Store } from '@/store/Store';
import type { TypedKey } from '@/store/types';
import type { Optional, SetValue } from '@/types';

export function useStore<T>(store: Store, key: TypedKey<T>): [Optional<T>, SetValue<T>] {
    const [value, setValue] = useState<Optional<T>>(store.get(key));

    useEffect(() => {
        return store.subscribe(key, setValue);
    }, [store, key]);

    return [value, (newValue: T) => store.set(key, newValue)];
}
