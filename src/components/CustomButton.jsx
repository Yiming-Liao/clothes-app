
import { useSnapshot } from 'valtio';
import state from '../store';
import { getContrastingColor } from '../config/helpers';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
    const snap = useSnapshot(state);

    const generateStyle = (type) => {
        if (type === 'filled') {    // 填滿
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)  // 獲取對比色
            }

        } else if (type === "outline") {    // 邊框
            return {
                borderWidth: '2px',
                borderColor: snap.color,
                color: snap.color
            }
        }
    }

    return (
        <button
            className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
            style={generateStyle(type)}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}

export default CustomButton