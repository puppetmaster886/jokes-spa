"use client";

import React from "react";
import RandomJoke from "./components/views/RandomJoke";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CardStates, setCardState } from "../../redux/features/cardSlice";
import AnimatedCard from "./components/shared/AnimatedCard";
import { Flipper } from "react-flip-toolkit";
import ListJokes from "./components/views/ListJokes";
import JokeTypes from "./components/views/JokeTypes";
import JokeById from "./components/views/JokeById";
import {
  AutoStories,
  Shuffle,
  Subscriptions,
  ViewList,
} from "@mui/icons-material";

/**
 * Default cards to be displayed on the home page.
 */
const defaultCards = [
  {
    state: CardStates.Random,
    title: "Random Joke",
    Icon: <Shuffle />,
    defaultOrder: 0,
    component: <RandomJoke />,
  },
  {
    state: CardStates.List,
    title: "List of Jokes",
    Icon: <ViewList />,
    defaultOrder: 1,
    component: <ListJokes />,
  },
  {
    state: CardStates.Type,
    title: "Joke Types",
    Icon: <AutoStories />,
    defaultOrder: 2,
    component: <JokeTypes />,
  },
  {
    state: CardStates.Id,
    title: "Joke by Id",
    Icon: <Subscriptions />,
    defaultOrder: 3,
    component: <JokeById />,
  },
];

/**
 * HomePage of the app.
 * Displays the main cards for the user to interact with.
 * The cards are animated using react-flip-toolkit.
 */
export default function HomePage() {
  const dispatch = useAppDispatch();
  const currentCardState = useAppSelector(
    (state) => state.cardReducer.cardState
  );
  const sortedCards = [...defaultCards].sort((a, b) =>
    currentCardState === a.state ? -1 : a.defaultOrder - b.defaultOrder
  );
  return (
    <div
      onClick={() => {
        dispatch(setCardState(null));
      }}
      style={{ height: "100vh" }}
    >
      <Flipper
        flipKey={sortedCards.map((card) => card.state).join("")}
        spring="stiff"
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{
            maxWidth: "700px",
            transition: "width 2s, height 0.5s",
            marginTop: 0,
          }}
        >
          {sortedCards.map((card) => {
            return (
              <AnimatedCard
                key={card.state}
                title={card.title}
                cardSate={card.state}
                icon={card.Icon}
                component={card.component}
              ></AnimatedCard>
            );
          })}
        </Grid>
      </Flipper>
    </div>
  );
}
