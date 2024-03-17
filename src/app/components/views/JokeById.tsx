"use client";

import { CardActions, CardContent } from "@mui/material";
import { useGetJokeByIdQuery } from "../../../../redux/services/jokesApi";
import Joke from "../shared/Joke";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setJokeId } from "../../../../redux/features/cardSlice";
import IdSelector from "../shared/IdSelector";

/**
 * JokeById component
 * Fetches a joke by id from the API and displays it.
 * Allows the user to select a new joke by id.
 */
const JokeById = () => {
  const jokeId = useAppSelector((state) => state.cardReducer.jokeId);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetJokeByIdQuery(jokeId.toString());

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
        <IdSelector
          value={jokeId}
          onChange={(_e, value) => {
            dispatch(setJokeId(value));
          }}
          min={1}
          max={406}
        />
      </CardActions>
    </>
  );
};

export default JokeById;
