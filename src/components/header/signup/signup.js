import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import M from 'materialize-css';
import './signup.css';
import Swal from 'sweetalert2';
export default function SignUp() {
  function clear(){
    document.getElementById('reg-form').reset()
  }
  const { register, handleSubmit} = useForm();
  const onSubmit = async (data) =>{ 
    console.log(data)
    let resp = await axios.post('/signup',data);
    console.log(resp.data.msg)
    if(resp.data.msg=='Signed Up...!'){
      var signupModal=M.Modal.init(document.getElementById('modal2'),{});
      signupModal.close();
      clear();
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
        title: 'Signed in successfully'
    })
    }else if(resp.data.msg=='Email Already in Use'){
      alert(resp.data.msg);
    }
    
    
 
  };
  return<div className="container-signup modal" id="modal2" >
    <div className="row">
        <form onSubmit={handleSubmit(onSubmit)} className="col s12" id="reg-form">
          <div className="row">
            <div className="input-field col s12">
              <input id="name" type="text" className="validate" required {...register('name')} />
              <label for="name">Name</label>
            </div>
          </div> 

          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" required {...register('email')} />
              <label for="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" minlength="6" required  {...register('password')}/>
              <label for="password">Password</label>
            </div>
          </div>
          
          <div className="row">
            <div className="input-field col ">
              <button className="btn btn-large btn-register waves-effect indigo waves-light" type='submit'>Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>   
}