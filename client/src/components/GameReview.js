import React from 'react';


export default function GameReviews({ review }) {

  return (
    <>
      <section className='game_review_container'>
        <div id='review_title'>{review.title}</div>
        <div id='review_username'>By: {review.user.username}</div>
        <div id='review_rating'>{review.rating}</div>
        <div id='review_description'>{review.description}</div>
      </section>
    </>
  )
}
