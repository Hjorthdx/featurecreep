interface Props {
    onClick?: () => void;
    enabled?: boolean;
    children: React.ReactNode;
}

export default function ElevatedButton({ onClick, enabled, children }: Props) {
    return (
        <button
            className={`m-2 ${enabled ? 'bg-amber-5 border-amber-8' : 'bg-amber-3 hover:bg-amber-4'
                } text-amber-12 font-semibold py-2 px-2 border border-amber-7 hover:border-amber-8 rounded shadow inline-flex items-center`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
