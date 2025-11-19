"use client";

import { CardContent } from "@mui/material";
import { useGetJokesPaginatedQuery } from "../../../../redux/services/jokesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { setCurrentPage, setSort } from "../../../../redux/features/cardSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import QueryState from "../shared/QueryState";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 20 },
  { field: "type", headerName: "Type", width: 60 },
  { field: "setup", headerName: "Setup", width: 250 },
  { field: "punchline", headerName: "Punchline", width: 230 },
];

const ListJokes = () => {
  const currentPage = useAppSelector((state) => state.cardReducer.currentPage);
  const currentSort = useAppSelector((state) => state.cardReducer.sort);
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetJokesPaginatedQuery({
    page: currentPage,
    sort: currentSort,
  });

  return (
    <QueryState
      isLoading={isLoading}
      error={error}
      isEmpty={!data || !data.jokes.length}
      emptyMessage="No jokes found with the current filters."
    >
      <CardContent>
        <DataGrid
          rows={data?.jokes || []}
          columns={columns}
          sx={{ fontSize: 10, m: 0, p: 0 }}
          rowHeight={30}
          columnHeaderHeight={30}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          autoHeight
          paginationMode="server"
          rowCount={data?.totalJokes || 0}
          onPaginationModelChange={({ page }) => {
            dispatch(setCurrentPage(page));
          }}
          paginationModel={{ pageSize: 10, page: currentPage }}
          onSortModelChange={(sortModel) => {
            dispatch(setSort(sortModel));
            dispatch(setCurrentPage(0));
          }}
          disableColumnSelector
          disableColumnMenu
        />
      </CardContent>
    </QueryState>
  );
};

export default ListJokes;
