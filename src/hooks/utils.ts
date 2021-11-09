function swap(inputArr: number[], i: number) {
  let tmp = inputArr[i];
  inputArr[i] = inputArr[i + 1];
  inputArr[i + 1] = tmp;
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export { swap, timeout };
