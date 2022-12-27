import '@testing-library/jest-dom'
import React from 'react'
import EmployeeReviewForm from './EmployeeReviewForm'
import { render, screen } from '../../../../test/testUtils'

describe('Ticket Configuration Component Testing', () => {
  test('should render Sub-Category List component without crashing', () => {
    render(<EmployeeReviewForm />, {
      preloadedState: {},
    })
    expect(screen.getByText('Employee Review Form')).toBeInTheDocument()
  })
})
