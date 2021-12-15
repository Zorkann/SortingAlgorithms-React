import { generateRandomArray } from "./utils";
import { BubbleSortState } from "./algorithms/bubble";
import { QuickSortState } from "./algorithms/quick";

type ReducerState = {
  array: number[];
  sortWith: "quick" | "bubble" | undefined;
  state: "stop" | "play" | "pause" | "end";
  data: BubbleSortState | QuickSortState | undefined;
};

type GENERATE_ARRAY = {
  type: "GENERATE_ARRAY";
  payload: number;
};
type SET_STATE = {
  type: "SET_STATE";
  payload: "stop" | "play" | "pause" | "end";
};
type SET_DATA = {
  type: "SET_DATA";
  payload: BubbleSortState | QuickSortState | undefined;
};
type SET_SORT = {
  type: "SET_SORT";
  payload: "quick" | "bubble" | undefined;
};

type Actions = GENERATE_ARRAY | SET_STATE | SET_DATA | SET_SORT;

function reducer(state: ReducerState, action: Actions): ReducerState {
  switch (action.type) {
    case "GENERATE_ARRAY":
      return {
        ...state,
        array: generateRandomArray(action.payload),
        sortWith: undefined,
        data: undefined,
        state: "stop"
      };

    case "SET_SORT":
      return {
        ...state,
        sortWith: action.payload,
        data: undefined,
        state: "stop"
      };

    case "SET_STATE":
      return {
        ...state,
        state: action.payload,
        data: action.payload === "stop" ? undefined : state.data
      };

    case "SET_DATA":
      return {
        ...state,
        data: action.payload
      };
  }
}

const initialState: ReducerState = {
  array: [],
  sortWith: undefined,
  state: "stop",
  data: undefined
};

export { reducer, initialState };
