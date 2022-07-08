import Popup from './popup';
import PopupFooter from './popupFooter';
import PopupHeader from './popupHeader';

interface Props {
    show: boolean;
    handleClose: () => void;
    handleSave: () => void;
}

export default function PomodoroSettingsPopup({ show, handleClose, handleSave }: Props) {
    return (
        <Popup show={show}>
            <PopupHeader title='Pomodoro settings' handleClose={handleClose} />
            <div className='relative p-6 flex-auto'>
                <p className='my-4 text-slate-500 text-lg leading-relaxed'>Pomodoro popup content</p>
            </div>
            <PopupFooter handleClose={handleClose} handleSave={handleSave} />
        </Popup>
    );
}
