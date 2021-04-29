import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'



const Navbar = () => {
const classes = useStyles()
const history = useHistory()
const location = useLocation()


//to check if user is logged in
const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

const dispatch = useDispatch()
const logout = () => {
  dispatch ({type: 'LOGOUT'})
   history.push("/auth")
   setUser(null)
}

useEffect(() => {
  // we check if token exist we send it to the token variable.
 const token = user?.token

 //check if the jwt token is expired and log user out
 if(token ) {
   const decodedToken = decode(token)
   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
 }
 setUser(JSON.parse(localStorage.getItem('profile')))
}, [location]);

//remember it calls the usefffect again when location changes, thats route


    return (
        <>
        
        <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer}>

        <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        
        </div>
        <Toolbar  className ={classes.toolbar} >
         {/* to check if user exist or logged in */}
            {
              user ? (
               <div  className={classes.profile} >
                 <Avatar className={classes.purple} src={user.result.imageUrl} alt={user.result.name} >
                  {/* {user.result.name.charArt(0)} */}
                 </Avatar>
                 <Typography variant='h6' className={classes.userName} >
                   {user.result.name}
                 </Typography>
                 <Button variant='contained' color='secondary' className={classes.logout} onClick={logout} >Logout</Button>
               </div>
              )
              :
              (
                <Button component={Link} to="/auth" variant='contained'   color='primary'>Sign In</Button>
              )
            }
         
        </Toolbar>
      </AppBar>  
        </>
    )
}

export default Navbar
