import React from 'react';
import './footer.css';
export default function Footer() {
  return <div className='forbottom'>
    <footer class="text-center text-white" style={{ backgroundColor: 'rgb(93, 159, 214)' }}>
      <div class="footerUp container p-4 pb-0">
        <section class="mb-4">
          <a class="btn-floating m-1" style={{ backgroundColor: '#3b5998' }} role="button">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a class="btn-floating m-1" style={{ backgroundColor: '#55acee' }} role="button">
            <i class="fab fa-twitter"></i>
          </a>
          <a class="btn-floating m-1 google" style={{ backgroundcolor: '#dd4b39' }} role="button">
            <i class="fab fa-google"></i>
          </a>
          <a class="btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} role="button">
            <i class="fab fa-instagram"></i>
          </a>
          <a class="btn-floating m-1 linkedIn" style={{ backgroundcolor: '#0082ca' }} role="button">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a class="btn-floating m-1 github" style={{ backgroundcolor: '#333333' }} role="button">
            <i class="fab fa-github"></i>
          </a>
        </section>
      </div>
      <div class="footerDown text-center p-3" style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
        © Powered By Nabiha & Sehrish
      </div>
    </footer>
    {/* <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Footer Content</h5>
            <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <ul>
              <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
          © Powered By Nabiha & Sehrish
        </div>
      </div>
    </footer> */}
  </div>
}