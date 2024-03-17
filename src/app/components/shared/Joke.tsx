import { Typography } from "@mui/material";
import { Joke } from "../../../../redux/services/jokesApi";

const Joke = ({ joke }: { joke: Joke }) => {
  return (
    <>
      <Typography gutterBottom variant="body1">
        {joke.setup}
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary">
        {joke.punchline}
      </Typography>
      <br />
      <Typography gutterBottom variant="caption" color="text.secondary">
        ({joke.type})
      </Typography>
    </>
  );
};

export default Joke;
