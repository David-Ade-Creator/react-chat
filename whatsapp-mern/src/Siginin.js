import React, { useState, useEffect } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signin} from './actions/userAction'

export default function Siginin(props) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

  const userSignin = useSelector(state=>state.userSignin);
  const {loading, userInfo, error } = userSignin;
  console.log(userInfo);
  const dispatch = useDispatch();
  toast.error(error);

  useEffect(() =>{
    if(userInfo){
      props.history.push('/');
      console.log(userInfo);
    }
   }, []);

  const submithandler = (e) =>{
    e.preventDefault();
    if (email && password){
    dispatch(signin(email,password));
    } else {
      toast.error('Please fill all fields');
    }
  }

    return (
        <div className="signup">
        <div className="signup_body">
            <form className="signup_form"  onSubmit={submithandler}>
            <div>
                   <h3>Login</h3>
                </div>
                <div>
                <ToastContainer/>
                </div>
                {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
                <div>
                    <input type="email"  onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div>
                    <input type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div>
                    <button type="submit">
                      Login
                    </button>

                </div>
            </form>
            <div className="signup_link">
               <h5>Do no have an account? <Link to="/signin">Signup</Link></h5>
            </div>
        </div>
    </div>
    )
}
