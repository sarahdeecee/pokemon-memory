import { Button, Grid } from '@mui/material';

function ButtonMain(props: any) {
  const {func, label} = props;

  return (
    <Grid item className="btn-main">
      <Button
        size='large'
        onClick={func}
        sx={{width: '200px'}}
      >{label}</Button>
    </Grid>
  );
}

export default ButtonMain;
