import type { NextPage } from 'next'
import React, { useState } from 'react'
import InputElement from '@components/InputElement'
import InputBtn from '@components/InputBtn'

const RomanForm: NextPage = () => {

    // Form States
    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');
    const [output, setOutput] = useState('');
    const [btn, setBtn] = useState(0);


    // Form Submit Handler - onSubmit - Sends data from form to API, then returns result from API
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOutput('...');

        
        // Prepare Form Data
        const data = btn === 1 ? { input: inputOne, submitClick: btn } : { input: inputTwo, submitClick: btn }
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/romanAPI';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSONdata,
        };


        // Fetch from API
        const res = await fetch(endpoint, options);
        const result = await res.json();


        // Set output state with message response from API
        setTimeout(() => setOutput(result.message), 300);;
    }


    // Form Input Handler - onChange - Updates input field whenever user types & update states for respective input
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let inputName: string = e.target.name;
        let inputVal: string = e.target.value;

        let chooseState = (value: React.SetStateAction<string>): void => {
            if (inputName === 'inputOne') {
                setInputOne(value);
            } else if (inputName === 'inputTwo') {
                setInputTwo(value);
            }
        };
        
        chooseState(inputVal.toUpperCase())
    }



    return (
        <form onSubmit={handleSubmit} className='romanForm'>

            <h2>Number-Roman Converter</h2>

            <div className='inputContainer'>
                <fieldset className='inputFieldset'>
                    <legend className='inputLegend'>
                        Enter an integer value or roman numeral between the numbers 1 and 1000, inclusive.
                    </legend>


                    <InputElement
                        numType='num'
                        name='inputOne'
                        val={inputOne}
                        inputHandler={handleChange}
                    />

                    <InputElement
                        numType='rom'
                        name='inputTwo'
                        val={inputTwo}
                        inputHandler={handleChange}
                    />


                </fieldset>


                <div className='inputBtnContainer'>
                    <InputBtn
                        btnName='inputOne'
                        btnHandler={() => setBtn(1)}
                    />

                    <InputBtn
                        btnName='inputTwo'
                        btnHandler={() => setBtn(2)}
                    />
                </div>
            </div>

            <fieldset className='outputContainer'>
                <label htmlFor='out'>
                    Result:
                </label>

                <output id='out'>
                    {output ? output : <br />}
                </output>
            </fieldset>
        </form>
    );
};

export default RomanForm;