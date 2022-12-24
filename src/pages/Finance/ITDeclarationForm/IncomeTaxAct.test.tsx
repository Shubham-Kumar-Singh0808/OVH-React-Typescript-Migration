import '@testing-library/jest-dom'
import React from 'react'
import IncomeTaxAct from './IncomeTaxAct'
import { render, screen } from '../../../test/testUtils'

describe(' Deduction available for Salaried employees under Income Tax Act 1961 Section Testing', () => {
  test('should render `Deduction available for Salaried employees under Income Tax Act 1961` Section Title without crashing', () => {
    render(<IncomeTaxAct />, {
      preloadedState: {},
    })
    expect(
      screen.getByText(
        'Deduction available for Salaried employees under Income Tax Act 1961',
      ),
    ).toBeInTheDocument()
  })
})
