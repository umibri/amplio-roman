# Brian Uminga - Amplio Assignment - When In Rome

**Demo:** Link

&nbsp;
&nbsp;

## Roman Math

### How would you structure your code so that a user can input 2 Roman Numerals and select a mathematical operation?

Currently the `<RomanForm />` component tracks the state of 2 `<InputElement />` and 2 `<InputBtn />` components . Before the API is fetched on form submit, I used the `[btn]` state to select the appropriate `<InputElement />` to send as data to the API which will then perform server-side validation and conversion, which responds with the message:

```ts
${num} = ${roman} || ${roman} = ${num}
```

For mathematical operations, I would make a button for each operation and follow a similar procedure. Depending on which `<InputBtn />` the user selected _[{1: +}, {2: -}, {3: *}, {4: /}]_, the form will send both `<InputElement />` components to the API with the `[btn]` state to decide the operation. Then on the server, validate -> convert to num _*_ -> OPERATION -> convert to roman (_*_ if needed to save resources, implement algo for each Roman operations to reduce the number of conversions between Roman and number) When we get the result, the output response message is:

```ts
${inputRoman1} ${operation} ${inputRoman2} = ${output: roman, number}
```

Additionally, there are no props being passed to `<RomanForm />` right now. I could allow props such as `operationType` to equal `'convert'` then it would show the 2 convert buttons; for `'math'` it would show 4 buttons of operations.

&nbsp;
&nbsp;

## Testing

### What and how would you test this code?

I would use Jest, although truthfully I don't have much experience with it. These are some links I went though:

- https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
- https://jestjs.io/docs/asynchronous \
  I drafted up some tests for this project which all passed. here's a snippet of `__tests__/romanAPI.ts`:

```ts
import { NextApiRequest, NextApiResponse } from 'next';
import handleRoman from '@api/romanAPI'

describe('Num to Roman', () => {
  // REQUEST MOCK
  let req = {
    body: {
      input: "",
      submitClick: 1,
    }
  } as unknown as NextApiRequest;

  // RESPONSE MOCK
  const json = jest.fn();
  const status = jest.fn(() => {
    return { json };
  });
  const res = { status } as unknown as NextApiResponse;


  // TESTS
  test('Convert 567 to Roman Numeral (DLXVII)', async () => {
    req.body.input = "567";
    handleRoman(req, res);
    expect(json.mock.calls[0][0].message).toEqual("567 = DLXVII");
  });
```
<img src='https://i.imgur.com/N5wiHGr.pngs' alt='' width='200'/>

&nbsp;
&nbsp;

## Logging

### How would you implement logging with the app to help the development?

Once I set up Pino (or use a pre-built logging integration on Vercel), I would log calculations happening in the API because we do not have access to terminal in production. Additionally, we can use the information from the logs and memoize the calculated data so the API wouldn't have to calculate each time you enter the same number multiple times, which would reduce server load since the operation would be a look-up compared to going through the calculations.

&nbsp;
&nbsp;

## Validation

### How would you handle user input validation?

Originally I wanted to use regex for the `pattern` property of the input element but it got a little cryptic because if I enter a valid number and non-valid roman in their respective input fields, then press `Convert to Roman`, the pattern for the Roman field kicks in. So, even though the number is valid, the form checks all fields. I was able to circumvent it by setting the state of the opposite input to be empty, but I just kept the validations on the server-side. I also could have passed the properties `type='number', min='1', max='1000'` to the input element but I wanted to ensure back-end logic

Here are my snippets for Number & Roman Validation

```ts
/* Number Validation - Checks if within constraints (1 < num <= 1000) and if it's a valid number */
function validateNum(num: number): boolean {
  if (isNaN(num) || num < 1 || num > 1000) {
    return false;
  }
  return true;
}
```
```ts
/* Regex Roman Validation - Ensures proper format (e.g. no IIII, IVI)
 * ^ 				        : start of line
 * M?				        : due to constraints (1 <= num <= 1000) check if M occurs either 1 or 0 times. Change to M{0, 3} if 0 <= constraints <= 3999
 * (CM|CD|D?C{0,3}) : CM == (900) || CD == (400) || D?C{0,3} == (500 - 800) OR (100 - 300) OR no match
 * (XC|XL|L?X{0,3}) : XC == (90)  || CL == (40)  || L?X{0,3} == (50 - 80)   OR (10 - 30)   OR no match
 * (IX|IV|V?I{0,3}) : IX == (9)   || IV == (4)   || V?I{0,3} == (5 - 8)     OR (1 - 3)     OR no match
 * $				        : end of line
*/
function validateRom(rom: string): boolean {
	// check if empty or over 1000, remove second condition if allowed #s > 1000
	if (rom.length === 0 || (rom.charAt(0) === 'M' && rom.length > 1)) return false;

	const romanRegex = /^M?(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g;
	return romanRegex.test(rom);
}
```

&nbsp;
&nbsp;

## Continous Integration

### How would you set up continous integration on this app?
I would have tests for all unit functions of the API and tests if the component displays the correct HTML structure based on which props or states are being passed. An example would be if I implemented the prop `operationType='math'` (from my first answer) then the form should display 4 buttons with the text being an operator. For `operationType='convert'`, the test should pass if it displays the 2 buttons, as well as any additional unit/integration tests before it can be approved to main branch. I also read through these links:
- https://circleci.com/blog/next-testing/ 
- https://andrew-lloyd01.medium.com/how-to-set-up-a-continuous-integration-pipeline-with-github-and-next-js-3dc07a4dd58b 
- https://resources.github.com/ci-cd/ 
