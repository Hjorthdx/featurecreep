import GridCell from './gridCell';

export default function FeatureGrid() {
    return (
        <>
            <main className='grid items-start grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <GridCell path='/pomodoro' title='Pomodoro' description='Stay focused and finish tasks effectively.' />
                <GridCell path='/dune' title='Dune' description='Manage stats for the board game Dune.' />
                <GridCell path='/movies' title='Movies' description='Track movies you would like to see and rate the movies you have seen.' />
            </main>
            <h3 className='items-center m-5 text-3xl text-amber-12'>Demos of my semester projects during bachelor and master at AAU:</h3>
            <main className='grid items-start grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {/* Maybe real name of project instead of the topic. The topic can be on the page itself I guess */}
                <GridCell path='/p1' title='Intelligent insurances' description='First semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p2' title='Calculation of optimal game strategies' description='Second semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p3' title='Development of applications - from users to data, algorithms and tests - and back again' description='Third semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p4' title='Design, definition og implementering' description='Fourth semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p5' title='Complex Backend Software' description='Fifth semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p6' title='Cyber Physical Systems' description='Bachelor project. NOT IMPLMENTED YET' />
                <GridCell path='/p7' title='Internet' description='Seventh semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p8' title='Mobility' description='Eigth semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p9' title='Trajectory Prediction' description='9th semester project. NOT IMPLMENTED YET' />
                <GridCell path='/p10' title='Trajectory Prediction' description='Master thesis. NOT IMPLMENTED YET' />
            </main>
        </>
    );
}