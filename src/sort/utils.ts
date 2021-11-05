function setCalculate(arr: number[], i: number, j: number) {
  const pi = Math.floor((i + j) / 2);
  const p = arr[pi]; // 4

  return function () {
    if (i <= j) {
      if (arr[i] < p) {
        i++;
        return { done: false, i, j, arr, pi, p };
      }

      if (arr[j] > p) {
        j--;
        return { done: false, i, j, arr, pi, p };
      }

      if (i <= j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j--;
        return { done: false, i, j, arr, pi, p };
      }
    }
    return {
      done: true,
      i,
      j,
      arr,
      pi,
      p
    };
  };
}

function swap(inputArr: number[], i: number) {
  let tmp = inputArr[i];
  inputArr[i] = inputArr[i + 1];
  inputArr[i + 1] = tmp;
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export { setCalculate, swap, timeout };
