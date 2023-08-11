interface Props {
    handleClose: () => void;
    handleSave: () => void;
}

export default function PopupFooter({ handleClose, handleSave }: Props) {
    return (
        <div className='flex items-center justify-end p-5 border-t border-solid border-slate-200 rounded-b'>
            <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={handleClose}
            >
                Close
            </button>
            <button
                className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={handleSave}
            >
                Save Changes
            </button>
        </div>
    );
}
