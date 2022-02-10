export function displayDecimalIntegerInputConversion(decNum) {
  const signedMagnitude = getSignedMagnitude(decNum);
  console.log(`
    Signed magnitude: ${signedMagnitude}
  `);
}

function getSignedMagnitude(decNum) {
  //Calculate sign bit first by checking for negative sign (-0 included)
  let signBit = decNum.includes('-') & 1;
  
  let num = Math.abs(decNum);
  let binaryNum = '';
  //loop through rest of 7 bits and find out the bit combination that makes up the decimal number
  for (let i = 6; i >= 0; i--) {
    const subtractedNum = num - 2 ** i;
    //If the number subtracted for that bit is too big, it has to be a 0, but if the decimal is small enough to subtract from, we know that that bit must be 1
    if (subtractedNum >= 0) { 
      num = subtractedNum;
      binaryNum += '1';
      continue;
    }
    binaryNum += '0';
  }

  return signBit + binaryNum; //Add sign bit and rest of bits together for final binary number
}