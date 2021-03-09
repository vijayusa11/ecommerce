import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Avatar } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import {useDispatch} from 'react-redux';
import logo from '../../assets/commerce1.png';
import useStyles from './styles';
import { logout } from '../../features/userSlice';
import { useAuthState } from 'react-firebase-hooks/auth';

const PrimarySearchAppBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const signOut = () => {
    auth.signOut().then(() => {
        dispatch(logout())
    })
  }
  const [user, loading] = useAuthState(auth);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
           
            <img height="50px" className={classes.image} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbakR5ubiXlIHHfcnhWgrBhrE9dXNGOtHru0CrUnqgvW7HU4whC7G--S6_GHM2bEKKnF0&usqp=CAU'/>
          </Typography>
          <div className={classes.grow} />
          <p style={{ fontWeight: 600, marginRight: '1%' }}>{user?.displayName}</p>
          <Avatar className='header__avatar' onClick={signOut} src={user?.photoURL} alt={user?.displatName} style={{ cursor: 'pointer', marginRight: '5%' }}/>
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
