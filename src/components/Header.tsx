import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu, Settings } from '@mui/icons-material';
function Header(props: any) {
  return (
    <Box className="header">
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
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} align="center">
            Pokemon Generator
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
          >
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
