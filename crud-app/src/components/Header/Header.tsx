'use client';

import Link from 'next/link';
import
{
   AppBar,
   Box,
   IconButton,
   Toolbar,
   Typography,
   Button,
   Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { cyan, deepOrange, grey } from '@mui/material/colors';
// Styles
import styles from './styles.module.css';
import useAuthInfo from '../hooks/useAuthInfo';
import { userLogout } from '@/store/auth/authSlice';




const toolbarStyles = {
   '&.MuiToolbar-root': { height: "100%" },
   overFlow: "hidden",
}

const navBtnOverrides = {
   color: "#FFF",
   px: "8px",
   mx: "10px",
   "&:hover": {
      color: cyan[400],
      backgroundColor: "transparent"
   }
};

const { mainHeader, logo } = styles;

const Header = () =>
{
   const { dispatch, token, user } = useAuthInfo()
   const userLogoutHandler = () =>
   {
      dispatch(userLogout())
   }


   return (
      <header className={mainHeader}>
         <AppBar component="nav" sx={{ height: "72px" }}>
            <Toolbar sx={toolbarStyles}>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  // onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
               >
                  <MenuIcon />
               </IconButton>

               <Button
                  component={Link}
                  href='/'
                  className={logo}
                  sx={{
                     display: { xs: 'none', sm: 'block' },
                     color: grey[50],
                     "&:hover": {
                        color: grey[300],
                        backgroundColor: "transparent"
                     }
                  }}
               >
                  CRUD-APP
               </Button>

               <Box
                  sx={{
                     display: { xs: 'none', sm: 'flex' },
                     alignItems: "center",
                     flexGrow: 1
                  }}
               >
                  <Button sx={navBtnOverrides} component={Link} href='/'>
                     Home
                  </Button>
                  <Button sx={navBtnOverrides} component={Link} href='/profile'>
                     Profile
                  </Button>
               </Box>

               <Box
                  sx={{
                     display: { xs: 'none', sm: 'flex' },
                     alignItems: "center",
                     height: "100%",
                  }}
               >

                  {
                     !token ? (
                        <>
                           <Button sx={navBtnOverrides} component={Link} href='/login'>
                              Login
                           </Button>
                           <Typography component="span" mx=".5rem">|</Typography>
                           <Button sx={navBtnOverrides} component={Link} href='/register'>
                              Sign Up
                           </Button>
                        </>
                     ) :
                        (
                           <>
                              <Avatar sx={{
                                 bgcolor: deepOrange[800],
                                 color: "HighlightText",
                                 textTransform: "uppercase",
                                 mr: "20px",
                              }}>
                                 {user?.username.slice(0, 2)}
                              </Avatar>
                              <Button
                                 sx={{ textTransform: "capitalize" }}
                                 variant='outlined'
                                 size='small'
                                 color='error'
                                 onClick={userLogoutHandler}
                              >
                                 Logout
                              </Button>
                           </>
                        )
                  }

               </Box>
            </Toolbar>
         </AppBar>

         <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
         </Box>
      </header>
   );
}

export default Header;