import ElevatedButton from '../interactables/elevatedButton';

interface Props {
    isPlaying: boolean;
    onClick: (isPlaying: boolean) => void;
}

export default function BottomBar({ isPlaying, onClick }: Props) {
    return (
        <div className='p-5 py-5'>
            <ElevatedButton
                onClick={() => {
                    onClick(isPlaying);
                }}
            >
                Pause
            </ElevatedButton>
        </div>
    );
}

/*
Reset button perhabs?
<div>
    <ElevatedButton
        onClick={() => {
            console.log('Stop button!');
            onClick(false);
        }}
    >
        Pause
    </ElevatedButton>
    <ElevatedButton
        onClick={() => {
            console.log('Reset button!');
            onClick(false);
        }}
    >
        Reset
    </ElevatedButton>
</div>
*/
