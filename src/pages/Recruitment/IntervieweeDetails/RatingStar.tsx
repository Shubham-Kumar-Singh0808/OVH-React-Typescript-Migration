import React from 'react'

const RatingStar = ({
  rating,
  setRating,
}: {
  rating: number | null
  setRating: React.Dispatch<React.SetStateAction<number | null>>
}): JSX.Element => {
  const handleStarClick = (selectedRating: number) => {
    if (selectedRating === 5) {
      setRating(5)
    } else if (rating === selectedRating) {
      setRating(null)
    } else {
      setRating(selectedRating)
    }
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        const isSelected = rating !== null && star <= rating
        return (
          <span
            key={star}
            className={`star ${isSelected ? 'selected' : ''}`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}

export default RatingStar
