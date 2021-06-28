import React, { useEffect, useState } from 'react';
import NavBar from '../header/navbar/navbar';
import Footer from '../footer/footer';
import axios from 'axios';
import { connect } from 'react-redux';
import { CoolText } from 'react-cool-text';
import { Redirect } from 'react-router-dom';
import './history.css'
import 'react-cool-text/react-cool-text/output/theme.css';
// import background from './background.png';

function History(props) {
  // console.log(props.SiteUserReducer.siteUser._id);

  let [history, setHistory] = useState([]);
  useEffect(async () => {
    let token = localStorage.getItem('token');
    // let id=props.SiteUserReducer.siteUser._id

    let resp = await axios.post('/history', { token });
    // console.log(resp.data);
    setHistory(resp.data);
    
  }, []);
  return (localStorage.getItem('token') ?
    <div>
      <NavBar />
      <div className='historySection' 
      // style={{ backgroundImage: `url${background}` }}
      >
        <div className='centerTitle'>
          <CoolText className='colorchange'>History</CoolText>
        </div>

        {
          
        history.map((result) => {
          // console.log(result);
          let path = require('path');
          let values = JSON.parse(result.objects)
          console.log(values);
          console.log(history);
          return <div className='history-row flex'><div class="row">
            <div class="col s12 m3">
              <div class="card">
                <div class="card-image">
                  <img className='imageControl' src={`${result.image}`} />
                  <span class="card-title">{result.date}</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={async()=>{
                    if(window.confirm("Are you sure you wish to clear the page?")){
                      let data={
                        delId:result.referenceId,
                        delPersonId: result._id
                      }
                      let resp = await axios.post('/deletehistory',data);
                      setHistory(resp.data);
                      console.log(resp.data);
                    }
                  }}>
                    <i class="material-icons">close</i>
                    </a>
                </div>
                <div class="card-content">
                  <table>
                    <tr>
                      <th>Object Name</th>
                      <th>Probability</th>
                    </tr>
                    {
                      values.map((value) => {
                        let keys = Object.keys(value)
                        console.log(keys)
                        return <tr>
                          <td>{keys}</td>
                          <td>{value[keys]}</td>

                        </tr>
                      })
                    }
                  </table>
                  {/* <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p> */}
                </div>
              </div>
            </div>
          </div>
          </div>
          // <div className='history-row flex'>
          //     <div>
          //         <img className='imageControl' src={`${result.image}`} />
          //     </div>
          //     <div>
          //         <h4>{result.date}</h4>
          //         <table>
          //             <tr>
          //                 <th>Object Name</th>
          //                 <th>Probability</th>
          //             </tr>


          //         {
          //             values.map((value) => {
          //                 let keys = Object.keys(value)
          //                 console.log(keys)
          //                 return <tr>
          //                     <td>{keys}</td>
          //                     <td>{value[keys]}</td>

          //                 </tr>
          //             })
          //         }
          //         </table>
          //     </div>
          // </div>
        })}

      </div>
      <Footer />

    </div> :
    <Redirect to='/' />
  )
}
export default connect((myStore) => {
  return myStore;
})(History);