import React from 'react';
import Swal from 'sweetalert2';

export default function PleaseLogin(){
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
        icon: 'warning',
        title: 'Please Login to Get Started'
    })
    return<div>

    </div>
}