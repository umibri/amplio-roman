import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	message: String;
}


export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// Get form data
	const input: string = req.body.input;
	const submitClick: number = req.body.submitClick;
	let ouput: string = '';


	/* submitClick from [btn] state
	 * 1 === Number to Roman
	 * 2 === Roman to Number
	*/
	if (submitClick === 1) {
		const temp = parseInt(input);

		if (!validateNum(temp)) {
			ouput = 'Incorrect Number Entered';
			
		} else {
			const numToRoman = convertToRom(temp);
			ouput = `${input} = ${numToRoman}`;
		}

	} else if (submitClick === 2) {
		const temp = input.toUpperCase();

		if (!validateRom(temp)) {
			ouput = 'Incorrect Roman Numeral Entered';

		} else {
			const romanToNum = convertToNum(temp);
			ouput = `${input} = ${romanToNum}`;
		}

	}

	// Print results
	res.status(200).json({ message: ouput })
}





// Validation Checks


/* Number Validation - Checks if within constraints (1 < num <= 1000) and if it's a valid number */
function validateNum(num: number): boolean {
	if (isNaN(num) || num < 1 || num > 1000) {
		return false;
	}

	return true;
}



/* Regex Roman Validation - Ensures proper format (e.g. no IIII, IVI)
 * ^ 				: start of line
 * M?				: due to constraints (1 <= num <= 1000) check if M occurs either 1 or 0 times. Change to M{0, 3} if 0 <= constraints <= 3999
 * (CM|CD|D?C{0,3})	: CM == (900) || CD == (400) || D?C{0,3} == (500 - 800) OR (100 - 300) OR no match
 * (XC|XL|L?X{0,3}) : XC == (90)  || CL == (40)  || L?X{0,3} == (50 - 80)   OR (10 - 30)   OR no match
 * (IX|IV|V?I{0,3}) : IX == (9)   || IV == (4)   || V?I{0,3} == (5 - 8)     OR (1 - 3)     OR no match
 * $				: end of line
*/
function validateRom(rom: string): boolean {
	// check if empty or over 1000, remove second condition if allowed #s > 1000
	if (rom.length === 0 || (rom.charAt(0) === 'M' && rom.length > 1)) return false;

	const romanRegex = /^M?(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g;
	return romanRegex.test(rom);
}





// Conversion Functions


/* Convert Num to Roman
 * Gets the digit in each place then use convertRomRef[][] to find the index of that number
 * Note: due to constraints, 'MM', and 'MMM' are omitted from convertRomRef[][]. Add if handling #s > 2000 or 3000, respectively
 * [0][0-1]: 0, 1000
 * [1][0-9]: 100, 200, ..., 900
 * [2][0-9]: 10, 20, ..., 90
 * [3][0-9]: 1, 2, ..., 9
 */
function convertToRom(num: number): string {
	const thousands: number = Math.floor(num / 1000);
	const hundreds: number = Math.floor((num % 1000) / 100);
	const tens: number = Math.floor((num % 100) / 10);
	const ones: number = num % 10;

	return convertRomRef[0][thousands] + convertRomRef[1][hundreds] + convertRomRef[2][tens] + convertRomRef[3][ones];
}
const convertRomRef: string[][] = [
	['', 'M'],
	['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
	['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
	['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
];



/* Convert Roman to Num
 * Loop through string char array
 * Keep track of next char value for each iteration
 * If the current value is less than the next value, then we can assume it is a special roman numeral (i.e. IV, IX, CM, etc.) so we add (nextVal - currVal) to res
 * Examples: IV === 5 (V) - 1 (I) === 4 || CM === 1000 (M) - 100 (C) === 900
*/
function convertToNum(rom: string): number {
	let res: number = 0;

	for (let i = 0; i < rom.length; i++) {
		const currVal: number = convertNumRef[rom[i]];
		const nextVal: number = convertNumRef[rom[i + 1]] || 0;

		if (currVal < nextVal) {
			res += (nextVal - currVal);
			i++;
		} else {
			res += currVal;
		}
	}

	return res;
}
const convertNumRef: { [key: string]: number } = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000
};