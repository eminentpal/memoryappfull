import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

// we sending d data to the back end
export const signin = (formData, history) => async (dispatch) => {
    try {
        //sign in the user..
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH,  data });
    history.push('/')
    } catch (error) {
       console.log (error)
    }
}


export const signup = (formData, history) => async (dispatch) => {
    try {
        //signup in the user..
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH,  data });
    // we navigate back to homepage after sign up
    history.push('/')
    } catch (error) {
       console.log (error)
    }
}