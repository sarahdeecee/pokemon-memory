import { Checkbox, FormControlLabel, Grid } from "@mui/material";

function Options(props: any) {
  const {generations, setGenerations} = props;

  const allGenerationsArr: string[] = Object.keys(Object.fromEntries(Object.entries(generations)));

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenerations({...generations, [e.target.value]: e.target.checked});
  };

  const options = allGenerationsArr.map(gen => <Grid key={`grid-item-gen-${gen}`} item>
    <FormControlLabel
      key={gen}
      label={`Gen ${gen.toString()}`}
      value={gen}
      control={<Checkbox checked={generations[gen]} onChange={handleCheck} />}
    />
  </Grid>);

  return (
    <div className="Options">
      {options}
    </div>
  );
}

export default Options;
