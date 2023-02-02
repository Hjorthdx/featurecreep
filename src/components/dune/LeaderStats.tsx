interface Props {
    leader: string;
}

export default function LeaderStats({ leader }: Props) {
    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            Leader stats for: {leader}
        </div>
    );
}
