export interface SettingsSidebarProps {
    sections: string[];
    activeSection: string;
    onSelect: (section: string) => void;
}

export function SettingsSidebar({ sections, activeSection, onSelect }: SettingsSidebarProps) {
    return (
        <nav className="w-64 shrink-0 bg-card p-4" aria-label="Settings sections">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Settings</h2>
            <ul className="flex flex-col gap-1 m-0 p-0 list-none">
                {sections.map((section) => (
                    <li key={section}>
                        <button
                            className={
                                activeSection === section
                                    ? 'w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors bg-secondary text-foreground'
                                    : 'w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground'
                            }
                            onClick={() => onSelect(section)}
                        >
                            {section}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
