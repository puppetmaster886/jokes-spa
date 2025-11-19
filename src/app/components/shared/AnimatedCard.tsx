"use client";

import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { CardStates, setCardState } from "../../../../redux/features/cardSlice";
import { Flipped } from "react-flip-toolkit";
import { cloneElement } from "react";

/**
 * AnimatedCard component.
 * @param title - Title of the card.
 * @param cardState - State of the card. Defined in the CardStates enum.
 * @param icon - Icon of the card.
 * @param component - Component to be displayed on the card, if not provided, children will be used.
 */
const AnimatedCard = ({
  title,
  cardState,
  children,
  icon,
  component,
}: AnimatedCardProps) => {
  const currentCardState = useAppSelector(
    (state) => state.cardReducer.cardState
  );
  const dispatch = useAppDispatch();
  const isCardSelected = currentCardState === cardState;

  return (
    <Flipped key={cardState} flipId={cardState} stagger="card">
      <Grid item>
        <Card
          variant="outlined"
          aria-pressed={isCardSelected}
          onClick={(e) => {
            dispatch(setCardState(cardState));
            e.stopPropagation();
          }}
          sx={{
            maxWidth: isCardSelected ? 632 : undefined,
            width: isCardSelected ? "Calc( 100vw - 2rem )" : 200,
            height: isCardSelected ? 500 : 200,
            cursor: "pointer",
            transition: "all 0.35s ease",
          }}
        >
          {isCardSelected ? (
            <>
              <CardHeader
                title={title}
                avatar={icon}
                titleTypographyProps={{ variant: "h6" }}
              />
              {component || children}
            </>
          ) : (
            <CardContent
              style={{
                textAlign: "center",
                height: "100%",
                paddingTop: "2rem",
              }}
            >
              {icon && cloneElement(icon, { sx: { fontSize: 100 } })}
              <br />
              <Typography variant="caption">{title}</Typography>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Flipped>
  );
};

interface AnimatedCardProps {
  title: string;
  cardState: CardStates;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  component?: React.ReactNode;
}

export default AnimatedCard;
