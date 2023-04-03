import { Autocomplete, TextField } from "@mui/material";

type Pokemon = {
  name: string,
  id: number,
  generation: number,
  types?: string[],
  imgSrc?: string,
};

function SearchBar(props: {pool: Pokemon[]}) {
  const {pool} = props; 
  
  return (
    <Autocomplete
      freeSolo
      id="searchbar"
      disableClearable
      options={pool.map(pokemon => pokemon.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
}

export default  SearchBar;
