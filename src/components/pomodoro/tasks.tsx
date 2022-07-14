import Task from './task';

function Tasks() {
    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <label>Tasks</label>
            <div className='p-5 py-5'>
                <Task />
            </div>
        </div>
    );
}

export default Tasks;
