import React,{useEffect} from 'react';
export default function StopVideo() {
    useEffect(() => {
       
        let video = document.querySelector("#videoElement");
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: false })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.stop();
                })
                .catch(function (err0r) {
                    console.log(err0r);
                    console.log("Something went wrong!");
                });
        }
    }, [])
    return <video id="videoElement" width='100%' height='100%'></video>

}
