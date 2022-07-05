import { trpc } from '../utils/trpc';
function Pomodoro() {
    const client = trpc.useContext();
    const { mutate } = trpc.useMutation('pomodoro.startPomodoro', {
        onSuccess(data, variables, context) {
            console.log('onSuccess', data, variables, context);
            client.invalidateQueries(['pomodoro.getAll']);
        },
    });
    const { data: pomodoros } = trpc.useQuery(['pomodoro.getAll']);
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
            {pomodoros &&
                pomodoros.map((pomodoro, index) => {
                    return <div key={index}>{pomodoro.createdAt.toLocaleString()}</div>;
                })}
        </div>
    );
}

export default Pomodoro;
