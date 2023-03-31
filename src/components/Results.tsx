import { Typography } from "@mui/material";

function Results(props: any) {
  const {currentPokemon, reveal, empty, button} = props;
  const {name, id, generation, imgSrc} = currentPokemon ?? '';

  return (
    <div>
      <Typography variant='h3'>{name}</Typography>
      {!empty && button}
      {reveal && <img src={imgSrc} alt={`Illustration of ${name}`} className="Results" hidden={!name} />}
      {(!empty && reveal) && <Typography variant='h6'>Pokemon #: {id}, Gen {generation}</Typography>}
    </div>
  );
}

export default Results;
