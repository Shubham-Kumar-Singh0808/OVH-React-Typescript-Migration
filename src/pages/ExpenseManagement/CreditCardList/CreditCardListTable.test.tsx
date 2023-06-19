import React from 'react'
import CreditCardListTable from './CreditCardListTable'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCreditCardListData } from '../../../test/data/creditCardListData'

describe('Credit Card List Table without data', () => {
  beforeEach(() => {
    render(<CreditCardListTable />)
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Card Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Card Number' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })

  test('should render the "Category" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})

describe('Expense Category List Table with data', () => {
  beforeEach(() => {
    render(<CreditCardListTable />, {
      preloadedState: {
        creditCardList: {
          getCardsList: mockCreditCardListData,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render credit card list table component with data', () => {
    expect(screen.getByText('Citi Credit Card')).toBeInTheDocument()
    expect(screen.getByText('Kotak Credit Card')).toBeInTheDocument()
    expect(screen.getByText('IndusInd Credit Card')).toBeInTheDocument()
    expect(screen.getByText('SBI Credit Card')).toBeInTheDocument()
  })
})
