import React, { useState } from 'react'

const RatingStar = () => {
  const [rating, setRating] = useState(0)
  const maxStars = 0

  const handleRatingClick = (index: number) => {
    setRating(index + 1)
  }
  const renderStars = () => {
    const stars = []
    for (let i = 0; i < maxStars; i++) {
      const starClass = i < rating ? 'filled' : ''
      stars.push(
        <li
          key={i}
          className={`${starClass}`}
          onClick={() => handleRatingClick(i)}
        >
          ★
        </li>,
      )
    }
    console.log(stars + 'stars')

    return stars
  }

  return (
    <div>
      <ul className="rating">{renderStars()}</ul>
    </div>
  )
}

export default RatingStar
