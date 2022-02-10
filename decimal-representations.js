/*
  This file is for decimal conversions and displaying the results of the calculations
*/
import { addBit, getOnesComplementFromBinary } from "./common-representations.js";

export function displayDecimalIntegerInputConversion(decNum) {
  const signedMagnitude = getSignedMagnitude(decNum);
  const onesComplement = getOnesComplementFromBinary(signedMagnitude);
  const twosComplement = addBit(onesComplement);
  const excess128 = getExcess128Notation(decNum);
  console.log(`
    Signed magnitude: ${signedMagnitude}
    Ones complement: ${onesComplement}
    Twos complement: ${twosComplement}
    Excess-128 notation: ${excess128}
  `);
}

function getSignedMagnitude(decNum) {
  // Calculate sign bit first by checking for negative sign (-0 included)
  const signBit = getSignBit(decNum);
  const binaryNum = convertTo7Bit(decNum)

  return signBit + binaryNum; // Add sign bit and rest of bits together for final binary number
}

function getExcess128Notation(decNum) {
  //Get excess decimal number and then convert
  const offset = parseInt(decNum) + 128;
  const signBit = getSignBit(offset);
  const binaryNum = convertTo7Bit(offset);

  return signBit + binaryNum;
}

function convertTo7Bit(decNum) {
  let num = Math.abs(decNum);
  let binaryNum = '';
  // Loop through rest of 7 bits and find out the bit combination that makes up the decimal number
  for (let i = 6; i >= 0; i--) {
    const subtractedNum = num - 2 ** i;
    // If the number subtracted for that bit is too big, it has to be a 0, but if the decimal is small enough to subtract from, we know that that bit must be 1
    if (subtractedNum >= 0) {
      num = subtractedNum;
      binaryNum += '1';
      continue;
    }
    binaryNum += '0';
  }
  return binaryNum;
}

function getSignBit(decNum) { return decNum.toString().includes('-') & 1; }