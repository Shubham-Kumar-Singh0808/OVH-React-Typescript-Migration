import React from 'react'
import { render } from '@testing-library/react'
import RatingStarValue from './RatingStarValue'

const id = 'selected-star'
describe('RatingStarValue', () => {
  it('should render 5 stars', () => {
    const { getAllByTestId } = render(<RatingStarValue rating={null} />)
    const stars = getAllByTestId('rating-star-value')
    expect(stars).toHaveLength(5)
  })

  it('should not render any selected star if rating is null', () => {
    const { queryByTestId } = render(<RatingStarValue rating={null} />)
    const selectedStars = queryByTestId(id)
    expect(selectedStars).toBeNull()
  })
})
