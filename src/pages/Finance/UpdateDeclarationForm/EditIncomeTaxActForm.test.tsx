import '@testing-library/jest-dom'
import React from 'react'
import EditIncomeTaxActForm from './EditIncomeTaxActForm'
import { render, screen } from '../../../test/testUtils'

describe(' Deduction available for Salaried employees under Income Tax Act 1961 Section Testing', () => {
  test('should render `Deduction available for Salaried employees under Income Tax Act 1961` Section Title without crashing', () => {
    render(<EditIncomeTaxActForm />, {
      preloadedState: {},
    })
    expect(
      screen.getByText(
        'Deduction available for Salaried employees under Income Tax Act 1961',
      ),
    ).toBeInTheDocument()
  })
})
