interface ResultRowProps {
    heading1: string;
    heading2: string;
    heading3: string;
    heading4: string;

    value1: string;
    value2: string;
    value3: string;
    value4: string;
}

// New name?
export default function ResultRow({
    heading1,
    heading2,
    heading3,
    heading4,
    value1,
    value2,
    value3,
    value4,
}: ResultRowProps) {
    return (
        <div className='flex'>
            <div className='w-1/4'>
                <div className='text-xl font-medium underline'>{heading1}</div>
                <div className='text-lg'>{value1}</div>
            </div>
            <div className='w-1/4'>
                <div className='text-xl font-medium underline'>{heading2}</div>
                <div className='text-lg'>{value2}</div>
            </div>
            <div className='w-1/4'>
                <div className='text-xl font-medium underline'>{heading3}</div>
                <div className='text-lg'>{value3}</div>
            </div>
            <div className='w-1/4'>
                <div className='text-xl font-medium underline'>{heading4}</div>
                <div className='text-lg'>{value4}</div>
            </div>
        </div>
    );
}
