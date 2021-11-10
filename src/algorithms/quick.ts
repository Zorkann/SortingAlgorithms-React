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

async function setCalculate({ arr, i, j, cb }: QuickSortArgs) {
  let pi = Math.floor((i + j) / 2);
  let p = arr[pi];

  await cb({ arr, i, j, pi, p });

  return async function () {
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

        await cb({ arr, i, j, p, pi });

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
