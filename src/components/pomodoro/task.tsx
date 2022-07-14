import Checkbox from '../buttons/checkbox';

interface Props {}

export default function Task({}: Props) {
    return (
        <div className='flex flex-col p-2 items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <Checkbox />
        </div>
    );
}
