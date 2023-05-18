import React, { useState } from 'react'

const RatingStar = () => {
  const [rating, setRating] = useState<number | null>(null)

  const handleStarClick = (selectedRating: number) => {
    if (rating === selectedRating) {
      setRating(null)
    } else {
      setRating(selectedRating)
    }
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${rating && star <= rating ? 'selected' : ''}`}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default RatingStar
