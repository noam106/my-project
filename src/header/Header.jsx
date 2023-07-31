import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import GamesIcon from '@mui/icons-material/Games';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'me', 'rewiew']
const pageMapping = {
    Home: '/',
    Results: '/previous-games',
    Settings: '/settings'
}

const Header = () => {

    const navigate = useNavigate()

    const handlePageClick = (pageName) => {
        navigate(pageMapping[pageName])
    }

    return(
        <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <GamesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                // fontFamily: 'monospace',
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DressApp
            </Typography>
  

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={() => handlePageClick(page)}>
                  {page}
                </Button>
              ))}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Header;