/* eslint-disable sonarjs/no-identical-functions */
import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import BankDetails from './BankDetails'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockBankInformation } from '../../../../test/data/panDetailsData'
import { BankInfo } from '../../../../types/Finance/PanDetails/panDetailsTypes'

const mockSetTogglePage = jest.fn()

describe('Bank Details without data', () => {
  beforeEach(() => {
    render(<BankDetails setToggle={mockSetTogglePage} />)
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'A/C No' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'IFSC Code' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(5)
  })

  test('should render the "Bank Details" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})

describe('Bank Details Table with data', () => {
  beforeEach(() => {
    render(<BankDetails setToggle={mockSetTogglePage} />, {
      preloadedState: {
        panDetails: {
          bankInfo: mockBankInformation,
          isLoading: ApiLoadingState.succeeded,
          editBankAccount: {} as BankInfo,
          error: 0,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockBankInformation.bankinfo.length),
    ).toBeInTheDocument()
  })
  test('should be able to click delete button element', () => {
    const deleteBtn = screen.getByTestId('btn-delete3')
    expect(deleteBtn).toBeInTheDocument()
    userEvent.click(deleteBtn)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })
})

describe('Bank Details Component Testing', () => {
  test('should render Bank Details component with out crashing', () => {
    render(<BankDetails setToggle={mockSetTogglePage} />)
    const addButtonElement = screen.getByTestId('add-button')
    expect(addButtonElement).toBeInTheDocument()
    userEvent.click(addButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(1)
  })
})
