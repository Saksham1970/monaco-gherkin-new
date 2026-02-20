export function SidebarItem({ icon: Icon, onClick }: { icon: React.ComponentType; onClick: () => void }) {
    return (
        <div className="flex aspect-square items-center justify-center">
            <button
                className="
                    h-10 w-10 rounded-lg text-foreground/50  
                    flex items-center justify-center 
                    cursor-pointer 
                    transition-all
                    hover:bg-secondary hover:text-foreground 
                    active:bg-secondary/80
                "
                onClick={onClick}
            >
                <Icon />
            </button>
        </div>
    );
}
