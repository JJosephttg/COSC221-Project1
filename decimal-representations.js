export function displayDecimalIntegerInputConversion(decNum) {
  const signedMagnitude = getSignedMagnitude(decNum);
  const onesComplement = getOnesComplement(signedMagnitude);
  const twosComplement = getTwosComplement(onesComplement);
  console.log(`
    Signed magnitude: ${signedMagnitude}
    Ones complement: ${onesComplement}
    Twos complement: ${twosComplement}
  `);
}

function getSignedMagnitude(decNum) {
  // Calculate sign bit first by checking for negative sign (-0 included)
  let signBit = decNum.includes('-') & 1;
  
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

  return signBit + binaryNum; // Add sign bit and rest of bits together for final binary number
}

function getOnesComplement([signBit, ...binaryNum]) {
  return signBit + binaryNum.map(bit => bit ^ 1).join('');
}

// Take ones complement and add 1 to the number
function getTwosComplement(onesComplement) {
  let carry = 0;
  let twosComp = '';
  for(let i = 0; i < 7; i++) {
    // If we are initially adding 1, add to carry
    if(i == 0) carry = 1;
    const added = onesComplement[i] + carry;
    carry = Math.floor(added / 2); // If the number is greater than 1 it will carry
    twosComp += added > 1 ? 0 : added; // If the added number is greater than 1, we are carrying and must reset the bit to 0 to shift
  }
}