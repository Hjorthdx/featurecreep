import ElevatedButton from '../buttons/elevatedButton';

interface Props {
    setIsPlaying: (isPlaying: boolean) => void;
}

function BottomBar({ setIsPlaying }: Props) {
    return (
        <div className='p-5 py-5'>
            <ElevatedButton
                onClick={() => {
                    console.log('Start button!');
                    setIsPlaying(true);
                }}
            >
                Start button
            </ElevatedButton>
            <ElevatedButton
                onClick={() => {
                    console.log('Stop button!');
                    setIsPlaying(false);
                }}
            >
                Stop button
            </ElevatedButton>
        </div>
    );
}

export default BottomBar;
