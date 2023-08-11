import { useEffect } from 'react';
import useGetSemestersInRange from '../../hooks/university/useGetSemestersInRange';
import GridCell from './gridCell';
import { useState } from 'react';

export default function UniversityGrid() {
    const { semesters, refetch, isSuccess } = useGetSemestersInRange({ lower: 1, upper: 10 });
    const [test, setTest] = useState(false);
    console.log('Semesters, ', semesters);

    // Not sure why I have to do this right now...
    // It will not re-render if I do not have this.
    // Seems like there are some issues with tRPC and react query right now because invalidate does not seem to work for me at this current moment either...
    useEffect(() => {
        console.log('semesters changed: ', semesters);
        if (!isSuccess) {
            setTest(true);
        }
        refetch();
    }, [refetch, semesters, isSuccess]);

    return (
        <>
            <h3 className='items-center m-5 text-3xl text-amber-12'>
                Demos of my semester projects during bachelor and master at AAU:
            </h3>
            <main className='grid items-start grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {semesters.map((semester) => {
                    return (
                        <GridCell
                            key={semester.number}
                            path={'aau/' + semester.degreeType.toLowerCase() + '/semester/' + semester.number}
                            title={semester.projectName}
                        >
                            {/* TODO: Fix this... Please help me. I have stared myself blind on this and can't seem to grasp right now how to solve this in a better way. The trouble is that I can't store the short description in the database because some of the text needs to be styled.*/}
                            {semester.number === 1 && (
                                <p className='mb-5 italic text-amber-11'>First semester project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 2 && (
                                <p className='mb-5 italic text-amber-11'>Second semester project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 3 && (
                                <p className='mb-5 italic text-amber-11'>Third semester project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 4 && (
                                <p className='mb-5 italic text-amber-11'>Fourth semester project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 5 && (
                                <p className='mb-5 italic text-amber-11'>Fifth semester project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 6 && (
                                <p className='mb-5 italic text-amber-11'>Bachelor project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 7 && (
                                <p className='mb-5 italic text-amber-11'>Seventh semester project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 8 && (
                                <p className='mb-5 italic text-amber-11'>Eigth semester project. NOT IMPLMENTED YET</p>
                            )}

                            {semester.number === 9 && (
                                <p className='mb-5 italic text-amber-11'>
                                    <strong>9th semester project.</strong> Enhances state-of-the-art (<strong>SOTA</strong>)
                                    trajectory prediction models using <strong>spatial context</strong>.
                                </p>
                            )}

                            {semester.number === 10 && (
                                <p className='mb-5 italic text-amber-11'>
                                    <strong>Master thesis.</strong> Enhances state-of-the-art (<strong>SOTA</strong>)
                                    trajectory prediction models using my <strong>pre-trained framework</strong>.
                                </p>
                            )}
                        </GridCell>
                    );
                })}
            </main>
        </>
    );
}
