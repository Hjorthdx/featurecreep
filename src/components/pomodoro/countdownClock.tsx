import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface Props {
    isPlaying: boolean;
    duration: number;
    onComplete: () => void;
}

export default function CountdownClock({ isPlaying, duration, onComplete }: Props) {
    return (
        <CountdownCircleTimer
            key={duration.toString()}
            isPlaying={isPlaying}
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={onComplete}
            size={270}
        >
            {({ remainingTime }) => {
                let secondsLeft = Math.floor(remainingTime % 60).toString();
                let minutesLeft = Math.floor(remainingTime / 60).toString();
                if (secondsLeft.toString().length == 1) {
                    secondsLeft = '0' + secondsLeft;
                }
                if (minutesLeft.toString().length == 1) {
                    minutesLeft = '0' + minutesLeft;
                }
                return <div className='text-7xl'>{minutesLeft + ':' + secondsLeft}</div>;
            }}
        </CountdownCircleTimer>
    );
}
