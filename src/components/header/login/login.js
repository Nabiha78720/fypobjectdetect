import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import M from 'materialize-css';
import './login.css';
import { connect } from 'react-redux';
import myStore from '../../../store/store';
import Swal from 'sweetalert2';
function Login() {
    function clear() {
        document.getElementById('loginForm').reset();
    }
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        let resp = await axios.post('/login', data);
        console.log(resp.data)

        if (resp.data.msg == 'SignUp First..!') {
            alert(resp.data.msg);
        } else if (resp.data.msg == 'Wrong Password') {
            alert(resp.data.msg);
        } else if (resp.data.msg == 'User Found') {
            var loginModal = M.Modal.init(document.getElementById('modal1'), {});
            loginModal.close();
            clear();
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('userId', resp.data._id);
            myStore.dispatch({
                type: "LOGIN_OK",
                payload: resp.data
            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Successfully Login'
            })
        }
        


        // if (resp.data.msg == 'User Found') {
        
        // } else if (resp.data.msg == 'User Not Found') {
        //     alert('Please Type valid User Name OR Password...!');
        // }
    };

    return <div id="modal1" class="modal">
        <center>
            <div className="container-login">
                <div className="z-depth-1 grey lighten-4 row" style={{ display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE' }}>

                    <form onSubmit={handleSubmit(onSubmit)} id='loginForm' className="col s12" method="post">
                        <div className='row'>
                            <div className='col s12'>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' type='email' name='email' id='email'  {...register('email')} />
                                <label for='email'>Enter your email</label>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' type='password' name='password' id='password' {...register('password')} />
                                <label for='password'>Enter your password</label>
                            </div>

                        </div>

                        <br />
                        <center>
                            <div className='row'>
                                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                            </div>
                        </center>
                    </form>
                </div>
            </div>

        </center>
    </div>
}
export default connect((myStore) => {
    return myStore;
})(Login);
