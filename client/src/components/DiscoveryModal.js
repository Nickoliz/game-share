import React from 'react';
import '../css/discoverymodal.css'


export default function DiscoveryModal({ hideModal }) {



  return (
    <>
      {/* <div id='hide_modal' onClick={hideModal} /> */}
      <div className='discovery_modal-selection'>
        Popular
        </div>
      <div className='discovery_modal-selection'>
        Reddit Talk
        </div>
    </>
  )
}
