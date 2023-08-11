import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface Props {
    isPlaying: boolean;
    duration: number;
    onComplete: () => void;
}
// TODO: Figure out why it is not changing colors properly
export default function CountdownClock({ isPlaying, duration, onComplete }: Props) {
    return (
        <CountdownCircleTimer
            key={duration.toString()}
            isPlaying={isPlaying}
            duration={duration}
            colors={['#25a30b', '#ffdd00', '#ff0800']}
            colorsTime={[5, 4, 3]}
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
                return <div className='text-7xl text-amber-11'>{minutesLeft + ':' + secondsLeft}</div>;
            }}
        </CountdownCircleTimer>
    );
}
