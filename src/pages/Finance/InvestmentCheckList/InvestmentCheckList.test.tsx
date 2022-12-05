import '@testing-library/jest-dom'
import React from 'react'
import InvestmentCheckList from './InvestmentCheckList'
import { render, screen } from '../../../test/testUtils'

describe('Investment CheckList Component Testing', () => {
  test('should render Investment CheckList component without crashing', () => {
    render(<InvestmentCheckList />, {
      preloadedState: {},
    })
    expect(screen.getByText('Investment Check List')).toBeInTheDocument()
  })
})
