import { startBubbleSort } from "../algorithms/bubble";
import { startQuickSort } from "../algorithms/quick";
import { TypeOfSortState, TypesOfSort } from "./types";

type StartSortWithHandler = (
  arr: number[],
  sortWith: TypesOfSort,
  cb: (args: TypeOfSortState, comparisions: number) => void
) => Promise<void>;

const startSortWith: StartSortWithHandler = async (arr, sortWith, cb) => {
  if (sortWith === "quick") {
    await startQuickSort({ arr, cb });
  }

  if (sortWith === "bubble") {
    startBubbleSort({ arr, cb });
  }
};

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export { startSortWith, timeout };
