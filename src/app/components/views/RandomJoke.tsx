"use client";

import { Button, CardActions, CardContent } from "@mui/material";
import { useGetRandomJokeQuery } from "../../../../redux/services/jokesApi";
import Joke from "../shared/Joke";

/**
 * RandomJoke component
 * Fetches a random joke from the API and displays it.
 * Allows the user to fetch a new joke.
 */
const RandomJoke = () => {
  const { data, error, isLoading, refetch } = useGetRandomJokeQuery();

  //TODO: loading, error, no data states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No jokes here!</div>;

  return (
    <>
      <CardContent sx={{ marginLeft: "4rem", height: "Calc(100% - 160px)" }}>
        <Joke joke={data} />
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
    </>
  );
};

export default RandomJoke;
