export type BubbleSortState = {
  i?: number;
  j?: number;
  arr: number[];
  comparisions: number;
};

function swap(arr: number[], j: number) {
  let temp = arr[j + 1];
  arr[j + 1] = arr[j];
  arr[j] = temp;
}

function* startBubbleSort(arr: number[]) {
  const arrCopy = [...arr];
  let comparisions = 0;

  function* bubbleSort(): Generator<
    BubbleSortState,
    BubbleSortState | undefined
  > {
    for (let i = 1; i < arrCopy.length; i++) {
      let flag = false;
      for (let j = 0; j < arrCopy.length - i; j++) {
        comparisions += 1;
        yield { arr: [...arrCopy], i: j, j: j + 1, comparisions };
        if (arrCopy[j] > arrCopy[j + 1]) {
          flag = true;
          swap(arrCopy, j);
          yield { arr: [...arrCopy], i: j + 1, j: j, comparisions };
        }
      }
      if (!flag) {
        return { arr: [...arrCopy], i: undefined, j: undefined, comparisions };
      }
    }

    return { arr: [...arrCopy], i: undefined, j: undefined, comparisions };
  }

  const result = yield* bubbleSort();
  return result;
}

export { startBubbleSort };
