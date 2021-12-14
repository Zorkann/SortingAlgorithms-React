export type QuickSortState = {
  i: number;
  j: number;
  pi: number;
  p: number;
  arr: number[];
};

type SetQuickSortArgs = {
  cb: (args: QuickSortState, comparisions: number) => void;
  arr: number[];
};

type QuickSortArgs = {
  i: number;
  j: number;
  cb: (args: QuickSortState) => void;
  arr: number[];
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

function* setCalculate(arr: number[], i: number, j: number) {
  let { p, pi } = setPivot(arr, i, j);

  function swapPivot() {
    if (i - 1 === pi) {
      pi = j + 1;
    } else if (j + 1 === pi) {
      pi = i - 1;
    }
  }

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
    }
    yield { arr, i, j, p, pi };
  }
  return { arr, i, j, p, pi };
}

function* startQuickSort(arr: number[], i: number, j: number) {
  const result = yield* setCalculate(arr, i, j);
  if (i < result.i - 1) {
    yield* startQuickSort(arr, i, result.i - 1);
  }
  if (result.i < j) {
    yield* startQuickSort(arr, result.i, j);
  }
  return result;
}

export { startQuickSort };
