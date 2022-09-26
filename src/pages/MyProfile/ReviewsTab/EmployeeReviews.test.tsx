import '@testing-library/jest-dom'
import React from 'react'
import EmployeeReviews from './EmployeeReviews'
import { render, screen } from '../../../test/testUtils'

describe('Employee Reviews Component Testing', () => {
  test('should render Employee Reviews tab component with out crashing', () => {
    render(<EmployeeReviews />)

    expect(screen.getByText('Review List')).toBeInTheDocument()
  })
})
