import type { ComponentType } from 'react';

export interface SidebarItemProps {
    Icon: ComponentType;
    label: string;
    onClick: () => void;
}

export function SidebarItem({ Icon, label, onClick }: SidebarItemProps) {
    return (
        <div className="flex aspect-square items-center justify-center">
            <button
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent border-none cursor-pointer text-foreground opacity-50 transition-all hover:bg-secondary hover:opacity-100 active:bg-secondary/80"
                aria-label={label}
                onClick={onClick}
            >
                <Icon />
            </button>
        </div>
    );
}
