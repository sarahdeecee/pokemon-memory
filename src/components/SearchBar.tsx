import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

type Pokemon = {
  name: string,
  id: number,
  generation: number,
  types?: string[],
  imgSrc?: string,
};

function SearchBar(props: {pool: Pokemon[]}) {
  const {pool} = props ?? []; 
  
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="searchbar"
      disableCloseOnSelect
      options={pool}
      getOptionLabel={pokemon => pokemon.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            checked={selected}
          />
          {option.name}
        </li>
      )}
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
      sx={{ width: 500 }}
    />
  );
}

export default  SearchBar;
