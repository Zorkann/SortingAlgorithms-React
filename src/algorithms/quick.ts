export type QuickSortState = {
  i: number;
  j: number;
  pi: number;
  p: number;
  arr: number[];
  comparisions: number;
};

function setPivot(arr: number[], i: number, j: number) {
  let pi = Math.floor((i + j) / 2);
  let p = arr[pi];
  return { p, pi };
}

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function* startQuickSort(array: number[]) {
  const arrCopy = [...array];
  let comparisions = 0;

  function* setCalculate(arr: number[], i: number, j: number) {
    let { p, pi } = setPivot(arr, i, j);

    function swapPivot() {
      if (i - 1 === pi) {
        pi = j + 1;
      } else if (j + 1 === pi) {
        pi = i - 1;
      }
    }
    comparisions += 1;

    yield { arr: [...arr], i, j, p, pi, comparisions };

    while (i <= j) {
      if (arr[i] < p) {
        i++;
      } else if (arr[j] > p) {
        j--;
      } else if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
        swapPivot();
        yield { arr: [...arr], i: j + 1, j: i - 1, p, pi, comparisions };
      }
      comparisions += 1;
      yield { arr: [...arr], i, j, p, pi, comparisions };
    }
    return { arr: [...arr], i, j, p, pi, comparisions };
  }

  function* quickSort(
    arr: number[],
    i: number,
    j: number
  ): Generator<QuickSortState> {
    const result = yield* setCalculate(arr, i, j);
    if (i < result.i - 1) {
      yield* quickSort(arr, i, result.i - 1);
    }
    if (result.i < j) {
      yield* quickSort(arr, result.i, j);
    }
    return {
      arr: [...arr],
      i: undefined,
      j: undefined,
      p: undefined,
      pi: undefined,
      comparisions
    };
  }

  const result: QuickSortState = yield* quickSort(arrCopy, 0, array.length - 1);
  return result;
}

export { startQuickSort };
