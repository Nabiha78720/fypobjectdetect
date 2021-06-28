import React, { useEffect } from 'react';
import a from '../images/a.jpeg';
import b from '../images/b.jpeg';
import c from '../images/c.jpeg';
import d from '../images/d.jpeg';
import e from '../images/e.jpeg';
import f from '../images/f.jpg';
import g from '../images/g.jpeg';
import h from '../images/h.jpg';
import i from '../images/i.jpg';
import M from 'materialize-css';
import './content.css';
import { Link } from 'react-router-dom';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
export default function Content() {
  useEffect(() => {
    var instance = M.Carousel.init(document.getElementById('slider1'), {
      fullWidth: true,
      indicators: true,
      duration: 200
    });
  }, [])
  return <div className='navspace'>
    <Link to='/datacapture'>
          <span class=" center adjust-position">
            <span class="btn waves-effect indigo">Get Started</span>
          </span>
        </Link>
    <AwesomeSlider>
    
      <div>
        <img className='image' src={a}/>
      </div>
      <div>
        <img className='image' src={b}/>
      </div>
      <div>
        <img className='image' src={c}/>
      </div>
      <div>
        <img className='image' src={d}/>
      </div>
    </AwesomeSlider>
    {/* <div id='slider1' class="carousel carousel-slider center">
        <Link to='/datacapture'>
          <span class="carousel-fixed-item center">
            <span class="btn waves-effect indigo">Get Started</span>
          </span>
        </Link>
        <div class="carousel-item white-text" href="#one!">
          <img  src={a}/>
        </div>
        <div class="carousel-item  white-text" href="#two!">
          <img src={b}/>
        </div>
        <div class="carousel-item  white-text" href="#three!">
          <img src={c}/>
        </div>
        <div class="carousel-item white-text" href="#four!">
          <img src={d}/>
        </div>
      </div> */}
  </div>
}