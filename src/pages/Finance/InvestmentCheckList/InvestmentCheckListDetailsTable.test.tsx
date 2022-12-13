import React from 'react'
import '@testing-library/jest-dom'
import InvestmentCheckListDetailsTable from './InvestmentCheckListDetailsTable'
import { render, screen } from '../../../test/testUtils'
import { mockInvestments } from '../../../test/data/investmentCheckListData'

describe('Client Details Table Component Testing', () => {
  beforeEach(() => {
    render(<InvestmentCheckListDetailsTable />)
  })
  test('should render the "Investment CheckList Details" table', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Investment' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Max-Limit' })).toBeTruthy()
  })

  describe('Investment CheckList Details Table Component with data', () => {
    beforeEach(() => {
      render(<InvestmentCheckListDetailsTable />, {
        preloadedState: {
          investmentCheckList: {
            investments: mockInvestments,
          },
        },
      })
    })
    test('should render Investment CheckList details table component with data', () => {
      mockInvestments.map((invest) =>
        expect(screen.getByText(invest.investmentName)).toBeInTheDocument(),
      )
    })
  })
})
