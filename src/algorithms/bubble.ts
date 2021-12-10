export type BubbleSortState = {
  i: number;
  j: number;
  arr: number[];
};

function swap(inputArr: number[], i: number) {
  let tmp = inputArr[i];
  inputArr[i] = inputArr[i + 1];
  inputArr[i + 1] = tmp;
}

function* startBubbleSort(arr) {
  const arrCopy = [...arr];
  let comparisions = 0;
  let swapped = true;

  do {
    swapped = false;
    for (let i = 0; i < arrCopy.length; i++) {
      yield { arr: [...arrCopy], i, j: i + 1, comparisions };
      comparisions++;
      if (arrCopy[i] > arrCopy[i + 1]) {
        swap(arrCopy, i);
        swapped = true;
      }
    }
  } while (swapped);
}

export { startBubbleSort };
