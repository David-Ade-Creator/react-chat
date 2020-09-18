import React, { useEffect, useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from './actions/userAction';

export default function Signup(props) {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password1,setPassword1]=useState('');
    const [password2,setPassword2]=useState('');
    const userSignup = useSelector(state=>state.userSignup);
    const {loading,success, error} = userSignup;
    const dispatch = useDispatch();


    useEffect(()=>{
        if (success) {
          props.history.push('/signin');
        }
        return () =>{
    
        };
        //
      }, [success])


    const submitHandler = (e) => {
        e.preventDefault();
        if(name && email && password1) {
          if (password1 === password2){
            dispatch(signup(name,email,password1));
            setEmail('');
            setName('');
            setPassword1('');
            setPassword2('');
          } else {
            toast.error('Passwords don\'t match')
          }
        } else {
          toast.error('Please fill all fields')
        }
      };

    return (
        <div className="signup">
            <div className="signup_body">
                <form className="signup_form" onSubmit={submitHandler}>
                <div>
                       <h3>Create your account</h3>
                    </div>
                    <div>
                         <ToastContainer/>
                    </div>
                    {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
                    <div>
                        <input type="text"  onChange={(e)=>setName(e.target.value)} placeholder="Name" />
                    </div>
                    <div>
                        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div>
                        <input type="password"  onChange={(e)=>setPassword1(e.target.value)} placeholder="Password" />
                    </div>
                    <div>
                        <input type="password"  onChange={(e)=>setPassword2(e.target.value)} placeholder="Confirm-Password" />
                    </div>
                    <div>
                        <button type="submit">
                           Create Account
                        </button>

                    </div>
                </form>
                <div className="signup_link">
                   <h5>Already have an account? <Link to="/signin">Signin</Link></h5>
                </div>
            </div>
        </div>
    )
}
