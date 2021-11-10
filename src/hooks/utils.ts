function swap(inputArr: number[], i: number) {
  let tmp = inputArr[i];
  inputArr[i] = inputArr[i + 1];
  inputArr[i + 1] = tmp;
}

function setBubbleSort(
  array: number[],
  cb: (args: State, comparisions: number) => void
) {
  let comparisions = 0;
  const arr = [...array];
  let checked;

  return async () => {
    do {
      checked = false;
      for (let i = 0; i < arr.length; i++) {
        comparisions += 1;
        await cb({ arr, i, j: i + 1 }, comparisions);
        if (arr[i] > arr[i + 1]) {
          swap(arr, i);
          await cb({ arr, i, j: i + 1 }, comparisions);
          checked = true;
        }
      }
    } while (checked);
    return arr;
  };
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

async function setCalculate(
  arr: number[],
  i: number,
  j: number,
  cb: (args: State, id: number) => void,
  id: number
) {
  let pi = Math.floor((i + j) / 2);
  let p = arr[pi];

  await cb({ arr, i, j, pi, p }, id);

  return async function (id: number) {
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

        await cb({ arr, i, j, p, pi }, id);

        i++;
        j--;

        if (i - 1 === pi) {
          pi = j + 1;
          return { done: false, i, j, arr, pi, p };
        }
        if (j + 1 === pi) {
          pi = i - 1;
          return { done: false, i, j, arr, pi, p };
        }
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

export { timeout, setBubbleSort, setCalculate };
