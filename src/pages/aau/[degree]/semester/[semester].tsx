import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ImageCarousel from '../../../../components/interactables/imageCarousel';
import Head from '../../../../components/head';
import Navbar from '../../../../components/navbar';
import useGetSemester from '../../../../hooks/university/useGetSemester';

export default function Semester() {
    const { status } = useSession({
        required: false,
    });

    const router = useRouter();
    const semesterNumber = router.query.semester ? Number(router.query.semester) : 0;

    const { semester } = useGetSemester({ semester: semesterNumber });

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <div className='bg-amber-2'>
            <Head title='FeatureCreep - Semester' />
            <Navbar />
            <div className='flex h-screen mx-5'>
                <div className='w-1/3'>
                    <h1 className='mt-5 font-extrabold text-5xl text-amber-12'>{semester.projectName}</h1>
                    <h3 className='mt-5 mb-5 text-3xl text-amber-12'>{semester.projectArea}</h3>
                    <p className='mb-5 text-amber-11'>{semester.description}</p>
                    <p className='text-amber-11 font-bold'>{semester.tags}</p>
                </div>
                <div className='flex flex-col justify-center p-5 w-2/3 max-h-screen'>
                    <ImageCarousel
                        images={semester.images.split(',')}
                        imageDescriptions={semester.imageDescriptions.split(',')}
                        videos={semester.videos.split(',')}
                        videoDescriptions={semester.videoDescriptions.split(',')}
                    />
                </div>
            </div>
        </div>
    );
}
