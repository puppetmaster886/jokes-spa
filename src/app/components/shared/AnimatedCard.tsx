"use client";

import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { CardStates, setCardState } from "../../../../redux/features/cardSlice";
import { Flipped } from "react-flip-toolkit";
import { cloneElement } from "react";

/**
 * AnimatedCard component.
 * @param title - Title of the card.
 * @param cardSate - State of the card. Defined in the CardStates enum.
 * @param icon - Icon of the card.
 * @param component - Component to be displayed on the card, if not provided, children will be used.
 */
const AnimatedCard = ({
  title,
  cardSate,
  children,
  icon,
  component,
}: AnimatedCardProps) => {
  const currentCardState = useAppSelector(
    (state) => state.cardReducer.cardState
  );
  const dispatch = useAppDispatch();
  const isCardSelected = currentCardState === cardSate;

  return (
    <Flipped key={cardSate} flipId={cardSate} stagger="card">
      <Grid item>
        <Card
          variant="outlined"
          onClick={(e) => {
            dispatch(setCardState(cardSate));
            e.stopPropagation();
          }}
          style={{
            maxWidth: isCardSelected ? "632px" : undefined,
            width: !isCardSelected ? "200px" : "Calc( 100vw - 2rem )",
            height: isCardSelected ? "500px" : "200px",
            //TODO: work on responsive for mobile
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
  cardSate: CardStates;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  component?: React.ReactNode;
}

export default AnimatedCard;
