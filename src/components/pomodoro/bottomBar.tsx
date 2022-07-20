import ElevatedButton from '../interactables/elevatedButton';

interface Props {
    isPlaying: boolean;
    onClick: (isPlaying: boolean) => void;
}

function BottomBar({ isPlaying, onClick }: Props) {
    return (
        <div className='p-5 py-5'>
            {isPlaying && (
                <ElevatedButton
                    onClick={() => {
                        console.log('Pause button!');
                        onClick(false);
                    }}
                >
                    Pause
                </ElevatedButton>
            )}
            {!isPlaying && (
                <ElevatedButton
                    onClick={() => {
                        console.log('Start button!');
                        onClick(true);
                    }}
                >
                    Start
                </ElevatedButton>
            )}
        </div>
    );
}

export default BottomBar;
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
