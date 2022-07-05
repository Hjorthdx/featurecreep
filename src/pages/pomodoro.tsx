import { trpc } from '../utils/trpc';
function Pomodoro() {
    const { mutate } = trpc.useMutation(['pomodoro.startPomodoro']);
    return (
        <div>
            <h1>Pomodoro</h1>
            <button
                onClick={() => {
                    console.log('onClick!');
                    mutate({
                        workDuration: 25,
                        breakDuration: 5,
                    });
                }}
            >
                Add new Pomodoro (25/5)
            </button>
        </div>
    );
}

export default Pomodoro;
