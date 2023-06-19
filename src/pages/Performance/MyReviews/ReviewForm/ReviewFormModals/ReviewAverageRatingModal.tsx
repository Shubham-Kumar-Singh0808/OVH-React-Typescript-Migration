import React from 'react'

const ReviewAverageRatingModal = ({
  averageRating,
}: {
  averageRating: number
}): JSX.Element => {
  return (
    <>
      <span style={{ color: '#2768a3', paddingRight: '8px' }}>
        <b>Average Rating:</b>
      </span>
      {averageRating}
    </>
  )
}

export default ReviewAverageRatingModal
