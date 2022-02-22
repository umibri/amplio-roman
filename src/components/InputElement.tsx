import { NextPage } from 'next'

interface Props {
    numType: string,
    name: string,
    val: string,
    inputHandler: React.ChangeEventHandler<HTMLInputElement>,
}

const InputElement: NextPage<Props> = ({ numType, name, val, inputHandler }) => {
    const labelText: string = numType === 'num' ? 'Enter Number:' : 'Enter Roman:';

    return (
        <div className='inputEleContainer'>
            <label htmlFor={name} className='mb-2'>
                {labelText}
            </label>

            <input
                type='text'
                id={name}
                name={name}
                onChange={inputHandler}
                value={val}
                className='inputElement'
            />
        </div>
    );
};

export default InputElement;