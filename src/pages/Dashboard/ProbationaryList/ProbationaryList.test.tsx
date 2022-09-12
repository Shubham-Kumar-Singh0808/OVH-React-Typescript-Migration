import '@testing-library/jest-dom'
import React from 'react'
import ProbationaryList from './ProbationaryList'
import { render, screen } from '../../../test/testUtils'

describe('List Of Birthdays Component Testing', () => {
  render(<ProbationaryList />, {
    preloadedState: {},
  })
  screen.debug()
  test('should render ProbationaryList Page without crashing', () => {
    expect(
      screen.getByText('Upcoming Probationary End Dates'),
    ).toBeInTheDocument()
  })
})
