import React from 'react'
import { render } from '@testing-library/react'
import RatingStar from './RatingStar'

describe('RatingStar', () => {
  it('should render 5 stars', () => {
    const { getAllByTestId } = render(
      <RatingStar rating={null} setRating={jest.fn()} />,
    )
    const stars = getAllByTestId('rating-star')
    expect(stars).toHaveLength(5)
  })
})
