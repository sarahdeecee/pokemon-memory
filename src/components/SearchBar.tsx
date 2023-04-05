import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

type Pokemon = {
  name: string,
  id: number,
  generation: number,
  types?: string[],
  imgSrc?: string,
};

function SearchBar(props: {pool: Pokemon[], veto: Pokemon[], setVeto: React.Dispatch<React.SetStateAction<Pokemon[]>>}) {
  const {pool, veto} = props ?? []; 
  const {setVeto} = props;
  
  const handleSearchChange = (e: React.SyntheticEvent, selected: Pokemon[]): void => {
    setVeto(selected);
  }
  // console.log(veto);
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
          label="Search pokemon to remove from pool"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          />
        )}
      onChange={handleSearchChange}
      sx={{ width: 500 }}
    />
  );
}

export default  SearchBar;
