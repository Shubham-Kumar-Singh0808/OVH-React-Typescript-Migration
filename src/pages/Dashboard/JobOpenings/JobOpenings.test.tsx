import '@testing-library/jest-dom'
import React from 'react'
import JobOpenings from './JobOpenings'
import { render, screen } from '../../../test/testUtils'

describe('List Of Birthdays Component Testing', () => {
  render(<JobOpenings />, {
    preloadedState: {},
  })
  test('should render JobOpenings Page without crashing', () => {
    expect(screen.getByText('Job Openings')).toBeInTheDocument()
  })
})
