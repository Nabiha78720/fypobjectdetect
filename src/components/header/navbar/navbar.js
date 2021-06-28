import React,{ useState} from 'react';
import './navbar.css';
import M from 'materialize-css';
import Login from '../login/login';
import SignUp from '../signup/signup';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import myStore from '../../../store/store';
import { Redirect } from 'react-router';
import { BsClockHistory } from "react-icons/bs";

function NavBar(props){
 
    return<div>
      <Login/>
      <SignUp/>
      <nav class="nav-extended  pushpin z-depth-3">
        <div className="nav-wrapper">
          <a onClick={()=>{
          var drawer = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
          }}  data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <span className='rainbow'>
          <div class="topbar-desktop-text">
            <span class="rainbow-animation rainbow-char1">S</span>
            <span class="rainbow-animation rainbow-char2">m</span>
            <span class="rainbow-animation rainbow-char3">a</span>
            <span class="rainbow-animation rainbow-char4">r</span>
            <span class="rainbow-animation rainbow-char5">t</span>
            <span class="space"> </span>
            <span class="rainbow-animation rainbow-char7">R</span>
            <span class="rainbow-animation rainbow-char8">e</span>
            <span class="rainbow-animation rainbow-char9">c</span>
            <span class="rainbow-animation rainbow-char10">o</span>
            <span class="rainbow-animation rainbow-char11">g</span>
            <span class="rainbow-animation rainbow-char12">n</span>
            <span class="rainbow-animation rainbow-char13">i</span>
            <span class="rainbow-animation rainbow-char14">z</span>
            <span class="rainbow-animation rainbow-char15">e</span>
            <span class="rainbow-animation rainbow-char16">r</span>
        </div>
          </span>
          <ul className="right hide-on-med-and-down">
          <li className='blink' style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><span className='hello'>Hello..!  </span><span className='user'>{props.SiteUserReducer.siteUser.name}</span></li>
            <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><Link to='/history'><a className="waves-effect waves-light btn-small btn modal-trigger">History</a></Link></li>

            <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a className="waves-effect waves-light btn-small btn modal-trigger" onClick={()=>{
                myStore.dispatch({
                type: 'LOGOUT'
              })
              localStorage.removeItem('token');
              localStorage.removeItem('userId')
              
              
            }}>Logout</a></li>

            <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
              var loginModal = M.Modal.init(document.getElementById('modal1'), {});
              loginModal.open();}}>Login</a></li>
            <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
              var signupModal=M.Modal.init(document.getElementById('modal2'),{});
              signupModal.open();}}>SignUp</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><Link to='/history'><a className='post-ad ' onClick={()=>{
          var drawer = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
          }}>History</a></Link></li>

        <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a className='post-ad' onClick={()=>{
            myStore.dispatch({
            type: 'LOGOUT'
            })
          localStorage.removeItem('token');
          localStorage.removeItem('userId')
          }}>Logout</a></li>

        <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
          var loginModal = M.Modal.init(document.getElementById('modal1'), {});
          loginModal.open();}}>Login</a></li>

        <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
          var signupModal=M.Modal.init(document.getElementById('modal2'),{});
          signupModal.open();}} >SignUp</a></li>
      </ul>
    </div>
}
export default connect((myStore)=>{
  return myStore;
})(NavBar);