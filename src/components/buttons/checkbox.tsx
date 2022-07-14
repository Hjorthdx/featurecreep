interface Props {}

export default function Checkbox({}: Props) {
    return (
        <div className='flex items-center'>
            <input
                id='default-checkbox'
                type='checkbox'
                value=''
                className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600'
            />
            <label htmlFor='default-checkbox' className='ml-2 text-gray-800 font-semibold'>
                Default checkbox
            </label>
        </div>
    );
}
