import { Box, Toolbar, Typography } from "@mui/material";
import ButtonMain from "./ButtonMain";

function Actions(props: any) {
  const {generations, pokemon, add, reset, options} = props;
  const empty = pokemon.length === 0 ? true : false;

  return (
    <Toolbar sx={{bottom: 0, width: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
      {!Object.values(generations).includes(true) && <Typography variant='body1'>Please select a generation.</Typography>}
        <ButtonMain func={add} label="Generate" />
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          {!empty && <ButtonMain func={reset} label="Reset" />}
          <ButtonMain func={options} label="Options" />
        </Box>
    </Toolbar>
  );
}

export default Actions;
