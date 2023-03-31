import { Button, Grid } from '@mui/material';

function ButtonMain(props: any) {
  const {func, label} = props;

  return (
    <Grid item className="btn-main">
      <Button onClick={func}>{label}</Button>
    </Grid>
  );
}

export default ButtonMain;
