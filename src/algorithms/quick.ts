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

async function setCalculate({ cb, i, j, arr }: QuickSortArgs) {
  let { p, pi } = setPivot(arr, i, j);
  await cb({ i, j, arr, p, pi });

  function swapPivot() {
    if (i - 1 === pi) {
      pi = j + 1;
    } else if (j + 1 === pi) {
      pi = i - 1;
    }
  }

  return async function () {
    if (i <= j) {
      if (arr[i] < p) {
        i++;
      } else if (arr[j] > p) {
        j--;
      } else if (i <= j) {
        swap(arr, i, j);
        await cb({ arr, i, j, p, pi });
        i++;
        j--;
        swapPivot();
      }
      return { done: false, i, j, arr, p, pi };
    }
    return { done: true, i, j, arr, p, pi };
  };
}

async function startQuickSort({ arr, cb }: SetQuickSortArgs) {
  let comparisions = 1;

  const callback = async (args: QuickSortState) => cb(args, comparisions);

  async function sort({ arr, i, j, cb }: QuickSortArgs) {
    const calculate = await setCalculate({
      arr,
      i,
      j,
      cb
    });

    async function loop(): Promise<number[] | undefined> {
      const { done, ...rest } = await calculate();
      comparisions += 1;
      await cb(rest);
      if (done) {
        if (i < rest.i - 1) {
          //more elements on the left side of the pivot
          await sort({ arr, i, j: rest.i - 1, cb });
        }
        if (rest.i < j) {
          //more elements on the right side of the pivot
          await sort({ arr, i: rest.i, j, cb });
        }
        return arr;
      }
      return await loop();
    }
    return await loop();
  }
  return await sort({ arr: [...arr], i: 0, j: arr.length - 1, cb: callback });
}

export { startQuickSort };
