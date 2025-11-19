"use client";

import { Button, CardActions, CardContent } from "@mui/material";
import { useGetRandomJokeQuery } from "../../../../redux/services/jokesApi";
import Joke from "../shared/Joke";
import QueryState from "../shared/QueryState";

/**
 * RandomJoke component
 * Fetches a random joke from the API and displays it.
 * Allows the user to fetch a new joke.
 */
const RandomJoke = () => {
  const { data, error, isLoading, refetch } = useGetRandomJokeQuery();

  return (
    <QueryState
      isLoading={isLoading}
      error={error}
      isEmpty={!data}
      emptyMessage="No jokes available right now."
    >
      <CardContent sx={{ marginLeft: "4rem", height: "Calc(100% - 160px)" }}>
        {!!data && <Joke joke={data} />}
      </CardContent>
      <CardActions
        style={{
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Button
          style={{ marginTop: "16px" }}
          variant="outlined"
          onClick={() => {
            refetch();
          }}
        >
          New joke
        </Button>
      </CardActions>
    </QueryState>
  );
};

export default RandomJoke;
