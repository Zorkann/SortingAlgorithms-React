export type BubbleSortState = {
  i: number;
  j: number;
  arr: number[];
};

type SetBubbleSortArgs = {
  cb: (args: BubbleSortState, comparisions: number) => void;
  arr: number[];
};

function swap(inputArr: number[], i: number) {
  let tmp = inputArr[i];
  inputArr[i] = inputArr[i + 1];
  inputArr[i + 1] = tmp;
}

function startBubbleSort({ arr, cb }: SetBubbleSortArgs) {
  let comparisions = 0;
  let checked;
  const arrCopy = [...arr];

  async function sort() {
    do {
      checked = false;
      for (let i = 0; i < arrCopy.length; i++) {
        comparisions += 1;
        if (arrCopy[i] > arrCopy[i + 1]) {
          swap(arrCopy, i);
          await cb({ arr: arrCopy, i, j: i + 1 }, comparisions);
          checked = true;
        }
      }
    } while (checked);
    return arr;
  }

  sort();
}

export { startBubbleSort };
