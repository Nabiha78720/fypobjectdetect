import React,{useEffect} from 'react';
import './startvideo.css';
export default function VideoElement() {
    useEffect(() => {
       
        let video = document.querySelector("#videoElement");
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function (err0r) {
                    console.log(err0r);
                    console.log("Something went wrong!");
                });
        }
    }, [])
    return <video autoplay id="videoElement" width='100%' height='100%'></video>

}
