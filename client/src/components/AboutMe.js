import React from 'react';
import '../css/aboutme.css';

export default function AboutMe({ hideModal }) {

  return (
    <>
      <div onClick={hideModal} className='edit-listing-overlay'>
        <div className='edit-listing-container' style={{ borderRadius: '20px', width: '500px' }}>
          <div className='edit-container-title'>Nicholas Litz</div>
          <br />
          <a className='about-me-button' href='https://www.nicholaslitz.com' target="_blank" style={{ textDecoration: 'none' }}>Profile</a>
          <div className='about-me-icons'>
            <a className='fa fa-linkedin fa-3x' href='https:www.linkedin.com/in/nicholaslitz' target='_blank' style={{textDecoration: 'none', backgroundColor: '#333A3F'}} />
            <a className='fa fa-github fa-3x' href='https://www.github.com/nickoliz' target='_blank' style={{textDecoration: 'none', backgroundColor: '#333A3F'}} />
            <a className='fa fa-angellist fa-3x' href='https://angel.co/u/nick-litz' target='_blank' style={{textDecoration: 'none', backgroundColor: '#333A3F'}} />
          </div>
          <div onClick={hideModal} className='view-offer'>Close</div>
        </div>
      </div>
    </>
  )
}