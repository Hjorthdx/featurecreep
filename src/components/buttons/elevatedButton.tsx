interface Props {
    onClick: () => void;
    enabled?: boolean;
    children: React.ReactNode;
}

function ElevatedButton({ onClick, enabled, children }: Props) {
    return (
        <button
            className={`m-2 ${
                enabled ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'
            } text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow inline-flex items-center`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ElevatedButton;
