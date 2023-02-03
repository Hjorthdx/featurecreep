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
                <div className='text-sm font-medium'>{heading1}</div>
                <div>{value1}</div>
            </div>
            <div className='w-1/4'>
                <div className='text-sm font-medium'>{heading2}</div>
                <div>{value2}</div>
            </div>
            <div className='w-1/4'>
                <div className='text-sm font-medium'>{heading3}</div>
                <div>{value3}</div>
            </div>
            <div className='w-1/4'>
                <div className='text-sm font-medium'>{heading4}</div>
                <div>{value4}</div>
            </div>
        </div>
    );
}
