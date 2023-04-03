import { Box, Toolbar, Typography } from "@mui/material";
import ButtonMain from "./ButtonMain";

function Actions(props: any) {
  const {generations, pokemon, add, reset, options} = props;
  const empty = pokemon.length === 0 ? true : false;

  const noGenSelected = !Object.values(generations).includes(true);

  return (
    <Toolbar disableGutters sx={{ width: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
      <ButtonMain func={add} label="Generate" disabled={noGenSelected} />
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        {!empty && <ButtonMain func={() => options('reset')} label="Reset" />}
        <ButtonMain func={() => options('select')} label="Options" />
      </Box>
      {!Object.values(generations).includes(true) && <Typography variant='h6' component='p' className='accent'>Please select a generation.</Typography>}
    </Toolbar>
  );
}

export default Actions;
