import React from 'react';


export default function GameImages({ image }) {


  return (
    <>
      <div className='game_image'>
        <img src={image.small} alt={image.thumb} />
      </div>
    </>
  )
}
