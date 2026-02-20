export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

export function getOptions<T extends Record<string, unknown>>(options: T): ValueOf<T>[] {
    return Object.values(options) as ValueOf<T>[];
}
