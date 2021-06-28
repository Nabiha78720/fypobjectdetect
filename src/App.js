import React, { useEffect, useState } from 'react';
import NavBar from './components/header/navbar/navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import myStore from './store/store';
import axios from 'axios';
import './App.css';
import History from './components/history/history';
import Footer from './components/footer/footer';
import Content from './components/content/slider/content';
import DataCapture from './components/content/datainput/input';

function App() {
  useEffect(async () => {
    let token= localStorage.getItem('token');
    if (token!=null) {
      try {
        let resp = await axios.post('/checksession', { token });
        // console.log(resp.data);
        myStore.dispatch({
          type:"LOGIN_OK",
          payload:resp.data
        })
      } catch (e) {
        console.log(e);
      }
    }
  }, [])
  return (
    <BrowserRouter className='flow'>
      <Provider store={myStore}>
        <Route exact path='/' render={()=>{
          return<div>
          <NavBar/>
          <Content/>
          <Footer/> 
          
        </div>
        }}/>
        
        
        <Route path='/history' component={History}/>
        <Route path='/datacapture' component={DataCapture}/>
      </Provider>
    </BrowserRouter>
  );
}
export default App;
