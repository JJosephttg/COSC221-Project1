export function displayBinaryInputConversion(binaryNum) {
  const signedMagnitude = getSignedMagnitude(binaryNum);
  console.log(`
    Signed magnitude: ${signedMagnitude}
  `);
}

function getSignedMagnitude([signBit, ...binaryNum]) {
  // Convert last 7 bits to decimal by summing decimal representations at each bit value and reducing to a single value
  const decimal = binaryNum.reverse().reduce((sum, curBit, i) => sum += Math.pow(2, i) * curBit, 0);

  //The reason we have to do below for the sign is that given the sign bit is 0 (positive), Math.sign on its own will return 0 instead of 1/-1.
  //In order to force the result to be either -1 or 1 so we can get the inverted sign (0 is positive, 1 is negative instead of the opposite),
  //we have to subtract the bit by 1 (to offset bit value 0 to -1 or 1 to 0) and then add by the sign bit again (0 will just remain as -1 and 1 will move back to 1) 
  //giving us -1 or 1 as values we can use for getting the sign to multiply the decimal value by
  return Math.sign((signBit - 1 + signBit) * -1) * decimal;
}