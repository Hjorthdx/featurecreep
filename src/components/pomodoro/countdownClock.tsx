import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface Props {
    isPlaying: boolean;
    duration: number;
    onComplete: () => void;
    // Not needed I think
    selectedMode: string;
}

function CountdownClock({ isPlaying, duration, onComplete, selectedMode }: Props) {
    return (
        <CountdownCircleTimer
            key={selectedMode}
            isPlaying={isPlaying}
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={onComplete}
            onUpdate={() => console.log('onUpdate')}
        >
            {/* ({ remainingTime }) => remainingTime */}
            {({ remainingTime }) => `${selectedMode} - ${remainingTime}`}
        </CountdownCircleTimer>
    );
}

export default CountdownClock;
