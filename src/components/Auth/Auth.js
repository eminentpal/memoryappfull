import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon';
import { useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {signin, signup} from '../../actions/auth'

const initialSate = { firstName: '', lastName: '', email: '', password:'', confirmPassword:'' }

const Auth = () => {
    const classes = useStyles()
    const state = null
    const [isSignup, setisSignup] = useState(false)
    const history = useHistory();


   const [showPassword, setShowPassword] = useState(false)
   const [formData, setFormData] = useState(initialSate)
   const dispatch = useDispatch()


   //we also dispatch history so we can navigatee
   //once anything change or keep tract of location.
    const handleSubmit = (e) => {
        e.preventDefault ()
       if (isSignup){
           dispatch(signup(formData, history))
       }
       else {
           dispatch(signin(formData, history))
       }
    }

    //make sure your names in the inputs are exactly
    //the same with the one in initialState formData
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    // when you are changing a state to a previous state always use callback function

    // this !prevShowPassword means we just toggle it to the previous state. thats if its on then turn it off if its off turn it on.

const handleShowPassword = () => {setShowPassword((prevShowPassword) => ( !prevShowPassword))
}
    //the 'half' is a material-ui prop like xs='6'

    const switchMode = () => {
        setisSignup ((previsSignup) =>  !previsSignup )
        setShowPassword (false)
         
         }
      
const googleSuccess = async (res)=> {
   const result = res?.profileObj
   const token = res?.tokenId;
   try {
       dispatch({type:'AUTH', data:{result, token}})
       //we use this to redirect them back to home after sign in
       history.push('/');
   } catch (error) {
       console.log(error)
   }
}
const googleFailure = (error)=>   {
   console.log(error)
    console.log('Google Sign In was unsuccessful. Try Again Later')
}   

    return (
        <Container component='main' maxWidth='xs' >
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar} >
               <LockOutlinedIcon />
            </Avatar>
            <Typography varient="h5">
                { isSignup ? 'Sign up' : 'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} >
            <Grid container spacing={2} >
              {
                  isSignup && (
                      <>
                     <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                     <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                     </>
                  )
                  
              }

              <Input name='email' label='Email Address'  handleChange={handleChange} type='email' />
              <Input name='password' label='Password' handleShowPassword={handleShowPassword} handleChange={handleChange} type={ showPassword ? 'text' : 'password'}  />
              {  isSignup && <Input name='confirmPassword' label='Repeat Password ' handleChange={handleChange} type={ showPassword ? 'text' : 'password'}  />}
              </Grid>
              
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
              {
                  isSignup ? 'Sign Up' : 'Sign In'
              }
              </Button>
              <GoogleLogin 
                  clientId='567989284856-vdshkcomac72qlk15pvva0nbfl9k64fj.apps.googleusercontent.com'
                  render={(renderProps) =>(
                      <Button className={classes.googleButton}  color="primary" fullWidth onClick={renderProps.onClick } disabled={renderProps.disabled} startIcon={<Icon />} variant='contained' >
                          Google Sign In
                      </Button>
                  )}
                     onSuccess={googleSuccess}
                     onFailure={googleFailure}
                     cookiePolicy='single_host_origin'       />
              <Grid container justify='flex-end' >
              <Grid item>
              <Button onClick={switchMode}>
                   { isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                </Button>
              </Grid>
                
              </Grid>
          

            </form>
         </Paper>
        </Container>
    )
}

export default Auth
