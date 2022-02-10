/*
  This file is for logic shared between representation calculations
*/
// Adds one and does necessary carry over to a binary number
export function addBit(binaryNum) {
  let resultNum = [...binaryNum];
  for (let i = 7; i >= 0; i--) {
    if (binaryNum[i] == '0') {
      resultNum[i] = '1';
      break;
    }
    resultNum[i] = '0';
  }
  return resultNum.join('');
}

export function getOnesComplementFromBinary([signBit, ...binaryNum]) {
  //                             XOR to invert each bit
  return signBit + binaryNum.map(bit => bit ^ 1).join('');
}