import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddBankAccount from './AddBankAccount'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockBankInformation } from '../../../../test/data/panDetailsData'
import { BankInfo } from '../../../../types/Finance/PanDetails/panDetailsTypes'

const accountNumber = 'Bank Account Number'
const selectName = 'form-select1'
const code = 'IFSC Code'
const save = 'save-btn'
describe('Add BankAccount without data', () => {
  beforeEach(() => {
    render(<AddBankAccount backButtonHandler={jest.fn()} />)
  })

  test('should be able to render  Add BankAccount  Title', () => {
    expect(screen.getByText('Add Bank Account Information')).toBeInTheDocument()
  })

  test('should render  Add Bank Account  screen and back button without crashing', () => {
    const backBtn = screen.getByRole('button', { name: 'Back' })
    expect(backBtn).toBeInTheDocument()
    userEvent.click(backBtn)
  })

  test('should render labels', () => {
    expect(screen.getByText('Bank Account Number:')).toBeInTheDocument()
    expect(screen.getByText('Name of the Bank:')).toBeInTheDocument()
    expect(screen.getByText('IFSC Code:')).toBeInTheDocument()
  })

  test('should be able to click Add button element', () => {
    const addBtn = screen.getByRole('button', { name: 'Add' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
})

describe('should render Add Bank Account Component with data', () => {
  beforeEach(() => {
    render(<AddBankAccount backButtonHandler={jest.fn()} />, {
      preloadedState: {
        panDetails: {
          bankInfo: mockBankInformation.bankAccountInfo,
          isLoading: ApiLoadingState.succeeded,
          editBankAccount: {} as BankInfo,
          error: 0,
        },
      },
    })
  })

  test('Add button should be enabled ', async () => {
    const bankActNo = screen.getByPlaceholderText(accountNumber)
    userEvent.type(bankActNo, '134457921')
    expect(bankActNo).toHaveValue('134457921')

    const ifscCode = screen.getByPlaceholderText(code)
    userEvent.type(ifscCode, 'ABCD1234')
    expect(ifscCode).toHaveValue('ABCD1234')

    const bankName = screen.getByTestId(selectName)
    userEvent.selectOptions(bankName, [''])
    expect(bankName).toHaveValue('')

    const addBtn = screen.getByTestId(save)
    userEvent.click(addBtn)
    await waitFor(() => {
      expect(addBtn).toBeDisabled()
    })
  })
})
const mockSetToggle = jest.fn()

describe('Add Bank Account Component Testing', () => {
  test('should render Edit Bank Account component with out crashing', () => {
    render(<AddBankAccount backButtonHandler={mockSetToggle} />)
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
