import { Typography } from "@mui/material";

function Results(props: any) {
  const {currentPokemon, reveal} = props;
  const {name, id, generation, imgSrc} = currentPokemon ?? '';

  return (
    <div>
      <Typography variant='h3'>{name}</Typography>
      {reveal && <img src={imgSrc} alt={`Illustration of ${name}`} className="Results" hidden={!name} />}
    </div>
  );
}

export default Results;
