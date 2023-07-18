import GridCell from './gridCell';
import UniversityGrid from './universityGrid';
export default function FeatureGrid() {
    return (
        <>
            <main className='grid items-start grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <GridCell path='/pomodoro' title='Pomodoro'>
                    <p className='mb-5 italic text-amber-11'>Stay focused and finish tasks effectively.</p>
                </GridCell>
                <GridCell path='/dune' title='Dune'>
                    <p className='mb-5 italic text-amber-11'>Manage stats for the board game Dune. NOT UPDATED UI</p>
                </GridCell>
                <GridCell path='/movies' title='Movies'>
                    <p className='mb-5 italic text-amber-11'>Track movies you would like to see and rate the movies you have seen. NOT IMPLEMENTED YET</p>
                </GridCell>
            </main>
            <UniversityGrid />
        </>
    );
}