import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu, Settings } from '@mui/icons-material';
function Header(props: any) {
  const {handleOptions} = props;
  return (
    <Box sx={{ flexGrow: 1 }} className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            <Menu />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Pokemon Generator
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={handleOptions}
          >
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
