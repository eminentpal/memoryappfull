import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth'
// remember auth its a default component expoerted as authReducer
export const reducers = combineReducers({ posts, auth });
