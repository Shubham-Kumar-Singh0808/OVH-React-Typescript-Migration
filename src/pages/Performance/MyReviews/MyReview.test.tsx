import '@testing-library/jest-dom'
import React from 'react'
import MyReview from './MyReview'
import { render, screen } from '../../../test/testUtils'

describe('Ticket Configuration Component Testing', () => {
  test('should render MyReview component without crashing', () => {
    render(<MyReview />, {
      preloadedState: {},
    })
    expect(screen.getByText('My Review')).toBeInTheDocument()
  })
})
