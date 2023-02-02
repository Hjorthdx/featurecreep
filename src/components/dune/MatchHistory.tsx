interface Props {
    leader: string;
}

export default function MatchHistory({ leader }: Props) {
    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            Match history for: {leader}
        </div>
    );
}
