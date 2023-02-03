import Switch from '@mui/material/Switch';

interface Props {
    enabled: boolean;
    label: string;
    onClick: () => void;
}

export default function Toggle({ enabled, label, onClick }: Props) {
    return (
        <div className='flex justify-between'>
            <label className='flex items-center'>{label}: </label>
            <Switch color='primary' checked={enabled} onChange={onClick} />
        </div>
    );
}
