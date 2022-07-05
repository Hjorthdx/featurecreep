import GridCell from './gridCell';

function PomodoroCell() {
    return (
        <GridCell>
            <a href='/pomodoro'>
                <div className='p-5 py-10 flex flex-col justify-center h-full text-center'>
                    <h2 className='mb-5 text-3xl'>Pomodoro</h2>
                    <p className='mb-5'>Stay focused and finish tasks effectively.</p>
                    <button className='p-2 px-6 w-fit self-center text-white font-bold bg-blue-500 rounded-full group-hover:bg-blue-600 duration-300'>
                        Learn more
                    </button>
                </div>
            </a>
        </GridCell>
    );
}

export default PomodoroCell;
