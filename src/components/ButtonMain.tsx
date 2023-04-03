import { Button, Grid } from '@mui/material';

function ButtonMain(props: any) {
  const {func, label, disabled} = props;

  return (
    <Grid item className="btn-main">
      <Button
        size='large'
        variant='contained'
        onClick={func}
        sx={{width: '150px', m: '10px'}}
        disabled={disabled}
      >{label}</Button>
    </Grid>
  );
}

export default ButtonMain;
