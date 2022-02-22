import { NextPage } from 'next'

interface Props {
    btnName: string,
    btnHandler: React.MouseEventHandler<HTMLButtonElement>,
}

const InputBtn: NextPage<Props> = ({ btnName, btnHandler }) => {
    const btnText = btnName === 'inputOne' ? 'Convert to Roman' : 'Convert to Number';

    return (
        <button
            name={btnName}
            type='submit'
            onClick={btnHandler}
            className="inputBtn">

            <span>
                {btnText}
            </span>

        </button>
    );
};

export default InputBtn;