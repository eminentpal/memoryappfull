  import React from 'react'
import {  TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'    


const Input = ({half, handleChange, label, name, autoFocus, type, handleShowPassword}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
          <TextField name={name} 
          label={label}
          onChange={handleChange}
           autoFocus xs={6} 
           variant="outlined"
           required
           fullWidth
           autoFocus={autoFocus}
           type={type}
          
        //Inputprops is that icon you can click and it show you the password. we only want it to show on password input, thats why we used conditional code.
           InputProps={name === 'password' ? { 
             endAdornment:(
               <InputAdornment position='end'>
                 <IconButton onClick={handleShowPassword} >
                  {type === 'password' ? <VisibilityOff /> : <Visibility />}
                 </IconButton>
               </InputAdornment>

           ) } : null}

           />
           
        </Grid>
    )
}

export default Input
