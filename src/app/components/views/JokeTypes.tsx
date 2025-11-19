"use client";

import {
  Button,
  CardActions,
  CardContent,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  useGetJokesByTypeQuery,
  useGetTypesQuery,
} from "../../../../redux/services/jokesApi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setJokeType } from "../../../../redux/features/cardSlice";
import Joke from "../shared/Joke";
import QueryState from "../shared/QueryState";

const JokeTypes = () => {
  const jokeType = useAppSelector((state) => state.cardReducer.jokeType);

  const {
    data: typesOfJokes,
    error: TypesOfJokesError,
    isLoading: isLoadingTypesOfJokes,
  } = useGetTypesQuery();
  const dispatch = useAppDispatch();

  const {
    data: joke,
    error: JokeError,
    isLoading: isLoadingJoke,
    refetch: refetchJoke,
  } = useGetJokesByTypeQuery(jokeType);

  return (
    <QueryState
      isLoading={isLoadingTypesOfJokes || isLoadingJoke}
      error={TypesOfJokesError || JokeError}
      isEmpty={!typesOfJokes || !joke}
      emptyMessage="No jokes available for this category."
    >
      <CardContent style={{ height: "Calc(100% - 160px)" }}>
        <Grid container spacing={2} direction="column">
          <Grid item style={{ alignSelf: "center" }}>
            <ToggleButtonGroup
              color="primary"
              value={jokeType}
              exclusive
              onChange={(_e, value) => {
                dispatch(setJokeType(value));
              }}
              aria-label="Types of Jokes"
            >
              {typesOfJokes?.map((type) => (
                <ToggleButton key={type} value={type}>
                  {type}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item style={{ marginLeft: "4rem", marginTop: "2rem" }}>
            {!!joke && <Joke joke={joke} />}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        style={{
          justifyContent: "center",
          position: "relative",
          bottom: "0",
        }}
      >
        <Button
          style={{ marginTop: "16px" }}
          variant="outlined"
          onClick={() => {
            refetchJoke();
          }}
        >
          other joke
        </Button>
      </CardActions>
    </QueryState>
  );
};

export default JokeTypes;
