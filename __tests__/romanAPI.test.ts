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

  test('Convert -5 to Roman Numeral (NaN/Invalid)', async () => {
    req.body.input = "-5";
    handleRoman(req, res);
    expect(json.mock.calls[json.mock.calls.length - 1][0].message).toEqual("Incorrect Number Entered");
  });

  test('Convert 1005 to Roman Numeral (NaN/Invalid)', async () => {
    req.body.input = "1005";
    handleRoman(req, res);
    expect(json.mock.calls[json.mock.calls.length - 1][0].message).toEqual("Incorrect Number Entered");
  });

  test('Convert "" to Roman Numeral (NaN/Invalid)', async () => {
    req.body.input = "";
    handleRoman(req, res);
    expect(json.mock.calls[json.mock.calls.length - 1][0].message).toEqual("Incorrect Number Entered");
  });
});






describe('Roman to Num', () => {
  // REQUEST MOCK
  let req = {
    body: {
      input: "",
      submitClick: 2,
    }
  } as unknown as NextApiRequest;

  // RESPONSE MOCK
  const json = jest.fn();
  const status = jest.fn(() => {
    return { json };
  });
  const res = { status } as unknown as NextApiResponse;


  // TESTS
  test('Convert DLXVII to Number (567)', async () => {
    req.body.input = "DLXVII";
    handleRoman(req, res);
    expect(json.mock.calls[0][0].message).toEqual("DLXVII = 567");
  });

  test('Convert IXI to Number (Invalid Roman Numeral)', async () => {
    req.body.input = "IXI";
    handleRoman(req, res);
    expect(json.mock.calls[json.mock.calls.length - 1][0].message).toEqual("Incorrect Roman Numeral Entered");
  });

  test('Convert TEST to Number (Invalid Roman Numeral)', async () => {
    req.body.input = "TEST";
    handleRoman(req, res);
    expect(json.mock.calls[json.mock.calls.length - 1][0].message).toEqual("Incorrect Roman Numeral Entered");
  });
});