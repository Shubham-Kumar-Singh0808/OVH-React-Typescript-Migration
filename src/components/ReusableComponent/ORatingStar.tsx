import React from 'react'

const ORatingStar = ({
  rating,
}: {
  rating: number | null | string
}): JSX.Element => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        const isSelected = rating !== null && star <= +rating
        return (
          <span key={star} className={`star ${isSelected ? 'selected' : ''}`}>
            ★
          </span>
        )
      })}
    </div>
  )
}

export default ORatingStar
