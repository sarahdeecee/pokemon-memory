import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { Pokemon } from "../types/Types";

function SearchBar(props: {pool: Pokemon[], setVeto: React.Dispatch<React.SetStateAction<Pokemon[]>>}) {
  const {pool} = props ?? []; 
  const {setVeto} = props;
  
  const handleSearchChange = (e: React.SyntheticEvent, selected: Pokemon[]): void => {
    setVeto(selected);
  }
  
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="searchbar"
      disableCloseOnSelect
      options={pool}
      getOptionLabel={pokemon => pokemon.name}
      renderOption={(props, pokemon, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            checked={selected}
          />
          {pokemon.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Pokemon"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          />
        )}
      onChange={handleSearchChange}
      sx={{ maxWidth: '800px', width: '100%' }}
      />
  );
}

export default  SearchBar;
