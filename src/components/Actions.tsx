import { Box, Toolbar, Typography } from "@mui/material";
import ButtonMain from "./ButtonMain";
import SearchBar from "./SearchBar";

function Actions(props: any) {
  const {generations, pokemon, add, reset, options, allPoolPulled, pool, veto, setVeto} = props;
  const empty = pokemon.length === 0 ? true : false;

  const noGenSelected = !Object.values(generations).includes(true);

  return (
    <Toolbar disableGutters sx={{ width: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
      <ButtonMain func={add} label="Generate" disabled={noGenSelected || allPoolPulled} />
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        {!empty && <ButtonMain func={() => options('reset')} label="Reset" />}
        <ButtonMain func={() => options('select')} label="Options" />
      </Box>
      {noGenSelected && <Typography variant='h6' component='p' className='accent'>Please select a generation.</Typography>}
      {allPoolPulled && <Typography variant='h6' component='p' className='accent'>All Pokemon from pool have been pulled.</Typography>}
    </Toolbar>
  );
}

export default Actions;
