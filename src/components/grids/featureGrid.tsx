import PomodoroCell from './pomodoroCell';
import DuneCell from './duneCell';

export default function FeatureGrid() {
    return (
        <main className='grid items-start grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            <PomodoroCell />
            <DuneCell />
        </main>
    );
}
