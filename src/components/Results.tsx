import { Box, Typography } from "@mui/material";

function Results(props: any) {
  const {currentPokemon, reveal, empty, button} = props;
  const {name, id, generation, imgSrc, types} = currentPokemon ?? '';
  
  const typeString = Array.isArray(types) ? ((types.length === 1) ? `Type: ${types[0]}` : `Types: ${types[0]}, ${types[1]}`) : '';
  const displayType = reveal ? 'inline' : 'none';
  
  return (
    <div>
      <Typography variant='h3'>{name}</Typography>
      {!empty && button}
      <Box sx={{display: {displayType}}} >
        {reveal && <img src={imgSrc} alt={`Illustration of ${name}`} className="Results" hidden={!name} />}
        {(!empty && reveal) && <Typography variant='h6'>Pokemon #: {id}, Gen {generation}</Typography>}
        {(!empty && reveal) && <Typography variant='h6'>{typeString}</Typography>}
      </Box>
    </div>
  );
}

export default Results;