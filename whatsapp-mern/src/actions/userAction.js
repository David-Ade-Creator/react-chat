import Axios from 'axios';
import Cookie from 'js-cookie';
import { 
  USER_SIGNIN_REQUEST, 
  USER_SIGNIN_SUCCESS, 
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LIST_USER_REQUEST,
  LIST_USER_SUCCESS,
  LIST_USER_FAIL,
  USER_LOGOUT
 } from '../constants/userConstants';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("/api/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload:error });
    }
  }


  const signup = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
      const { data } = await Axios.post("/api/users/signup", { name, email, password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }


  const listUser = (userId) => async (dispatch, getState) => {
      try {
          dispatch({type: LIST_USER_REQUEST });
          const { userSignin: { userInfo } } = getState();
          const {data} = await Axios.get(`/api/users/${userId}`,{userId}, {
            headers:
        { Authorization: 'Bearer ' + userInfo.token }  
          });
          dispatch({ type: LIST_USER_SUCCESS, payload: data})
      } catch (error) {
          dispatch({ type: LIST_USER_FAIL, payload: error.message});
      }
  }

  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }


export {signin,signup,logout, listUser}