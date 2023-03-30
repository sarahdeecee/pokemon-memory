import { Checkbox, FormControlLabel, Grid } from "@mui/material";

function Options(props: any) {
  const {generations, setGenerations} = props;

  const allGenerationsArr: string[] = Object.keys(Object.fromEntries(Object.entries(generations)));

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenerations({...generations, [e.target.value]: e.target.checked});
  };

  const handleCheckAllOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Object.values(generations).includes(true)) {
     setGenerations({1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      });
    } else {
      setGenerations({1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
      });
    }
  };

  const options = allGenerationsArr.map(gen => <Grid key={`grid-item-gen-${gen}`} item>
    <FormControlLabel
      key={gen}
      label={`Gen ${gen.toString()}`}
      value={gen}
      control={<Checkbox checked={generations[gen]} onChange={handleCheck} />}
    />
  </Grid>);

  const selectDeselectAll = <FormControlLabel
    label={!Object.values(generations).includes(true) ? 'Select All' : 'Deselect All'}
    control={
      <Checkbox
        checked={Object.values(generations).includes(true) && !Object.values(generations).includes(false)}
        indeterminate={Object.values(generations).includes(true) && Object.values(generations).includes(false)}
        onChange={handleCheckAllOptions}
      />
    }
  />

  return (
    <div className="Options">
      {selectDeselectAll}
      {options}
    </div>
  );
}

export default Options;
