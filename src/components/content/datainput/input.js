import './input.css';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../header/navbar/navbar';
import Footer from '../../footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import PleaseLogin from '../pleaselogin/pleaselogin';
import VideoElement from './startvideo/startvideo';
import Waiting from './waiting/waiting';
import M from 'materialize-css';
import Output from './output/output';
import $ from 'jquery';
import { connect } from 'react-redux';
import axios from 'axios';
import { useAccordionToggle } from 'react-bootstrap';
import StopVideo from './stopvideo/stopvideo';
import Swal from 'sweetalert2';
import { CoolText } from 'react-cool-text';
// html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>'

// const formData = {
//     attachments: targetUser.pics.map((item) => {
//         return fs.createReadStream(path.resolve(__dirname + '/alldata/users/' + item))

//     }).concat(fs.createReadStream((req.file || { path: __dirname + '/alldata/temp/unknown.png' }).path))
// };

// request.post({ url: 'http://localhost:4000/verify', formData: formData }

function DataCapture(props) {
    const moment = require('moment');
    function clear(){
        // document.getElementById('clearfield').filer=''
    }
   

    let Camera = { DestinationType: '' }
    // function takePhoto() {
    //     navigator.camera.getPicture(onSuccess, onFail, {
    //         quality: 75,
    //         targetWidth: 320,
    //         targetHeight: 320,
    //         destinationType: 0
    //     })
    // }
    // function onSuccess(imageData) {
    //     var image = document.getElementById('myImage');
    //     image.src = "data:image/jpeg;base64," + imageData;
    // }

    // function onFail(message) {
    //     alert('Failed because: ' + message);
    // }
    console.log(props.SiteUserReducer.siteUser._id)
    let [result, setResult] = useState([]);
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   
    return (localStorage.getItem('token') ?
        isMobile ?
            (<div className='navspace'>
                <NavBar />
                <div>
                    <a class="waves-effect waves-light btn" id="cameraTakePicture" onClick={window.takePhoto} >
                        Capture Photo
                    </a>
                </div>
                <Footer />
            </div>) : (<div className='datasend'>
                <NavBar />
                <Waiting />
                <Output result={result} />
                
                <div className='dataSection'>
                
                    <div className='area'>
                        <div className='box'>
                            <VideoElement />
                        </div>
                        <div className='buttons'>
                            <form  >
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>Browse File</span>
                                        <input type="file" id="filer" style={{color:'white'}}/>
                                    </div>
                                    <form id='clearfield'>
                                        <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text"  style={{color:'white'}} />
                                    </div>
                                    </form>
                                    
                                </div>
                            </form>
                            <div className='flexbutton'>
                            <a class="waves-effect waves-light btn bothbtn" style={{marginRight:'10px'}} onClick={()=>{
                                document.getElementById('clearfield').reset();
                            }} >Clear</a>
                            <br/>
                            
                            <a class="waves-effect waves-light btn bothbtn" onClick={async () => {
                                 const today = moment();
                                 let date =today.format()
                                 console.log(date);
                                // let date = new Date().toString();
                                // console.log(date);

                                let video = document.querySelector("#videoElement");
                                let canvas = document.createElement('canvas');

                                canvas.width = video.offsetWidth;
                                canvas.height = video.offsetHeight;

                                let ctx = canvas.getContext('2d');
                                ctx.drawImage(video, 0, 0, canvas.width, canvas.width * 0.8);

                                let data = canvas.toBlob(async (blob) => {

                                    let file;
                                    let filer = document.getElementById('filer');

                                    if (filer.files.length) {
                                        file = filer.files[0];
                                    } else {
                                        file = new File([blob], "sample-file.png");
                                    }

                                    // console.log(file);
                                    const cdata = new FormData();
                                    cdata.append('attachments', file);
                                    cdata.append('id', props.SiteUserReducer.siteUser._id)
                                    // console.log(cdata);
                                    var waiting = M.Modal.init(document.getElementById('waitingModal'), {});
                                    waiting.open();

                                    let resp = await axios.post('/sendfile', cdata);
                                    console.log(resp.data);
                                    if (resp.data) {
                                        waiting.close();
                                        setResult(
                                            resp.data
                                        )
                                        var output = M.Modal.init(document.getElementById('outputModal'), {});
                                        output.open();
                                        Swal.fire({
                                            position: 'centre',
                                            icon: 'success',
                                            title: 'Your History has been updated',
                                            showConfirmButton: false,
                                            timer: 4000
                                          })

                                    }

                                });
                            }}>Capture</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>)
        :
        <div>
            <StopVideo />
            <Redirect to='/' />
            <PleaseLogin />
        </div>)
}
export default connect((myStore) => {
    return myStore;
})(DataCapture);