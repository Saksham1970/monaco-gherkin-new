export interface BaseControlProps<T> {
    label: string;
    value: T | undefined;
    onChange: (value: T) => void;
    disabled?: boolean;
}
