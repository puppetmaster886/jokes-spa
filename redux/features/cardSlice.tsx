import { GridSortModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";

export enum CardStates {
  Random = "random",
  List = "list",
  Type = "type",
  Id = "id",
}

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardState: null as CardStates | null,
    jokeId: 1,
    jokeType: "general",
    currentPage: 0,
    sort: [] as GridSortModel,
  },
  reducers: {
    setCardState: (state, action) => {
      state.cardState = action.payload;
    },
    setJokeId: (state, action) => {
      state.jokeId = action.payload;
    },
    setJokeType: (state, action) => {
      state.jokeType = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCardState, setJokeId, setJokeType, setCurrentPage, setSort } =
  cardSlice.actions;

export default cardSlice.reducer;
