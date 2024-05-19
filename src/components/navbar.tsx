import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { TokenContext } from '../App';
import LoginModal from './loginModal';
import { useNavigate } from 'react-router-dom';

const pages = [
    {
        text: 'Home',
        url: ""
    },
    {
        text: 'Nuevo Teddy',
        url: "newTeddy"
    },
    {
        text: "Teddy's Guardados",
        url: "teddys"
    }
];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const { token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();

    const logged = token !== "";

    const settings = logged ? ["Logout"] : ["Login"];

    const filteredPages = pages.filter((item, index) => logged || index === 0);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginClick = () => {
        setLoginModalOpen(true);
        handleCloseUserMenu();
    };

    const handleLogoutClick = () => {
        setToken("");
        handleCloseUserMenu();
        navigate("/");
    };

    const handleModalClose = () => {
        setLoginModalOpen(false);
    };

    return (
        <>
            <AppBar position="sticky" sx={{ boxShadow: "none", borderBottom: "1px solid black", height: "70px" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {filteredPages.map((page) => (
                                    <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                                        <Link to={`/${page.url}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography textAlign="center">{page.text}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {filteredPages.map((page) => (
                                <Button
                                    key={page.text}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', mx: "20px" }}
                                >
                                    <Link to={`/${page.url}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {page.text}
                                    </Link>
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={setting === "Login" ? handleLoginClick : handleLogoutClick}
                                    >
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <LoginModal open={loginModalOpen} handleClose={handleModalClose} />
        </>
    );
}

export default NavBar;
