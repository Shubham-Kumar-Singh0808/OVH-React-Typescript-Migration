import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EditBankAccount from './EditBankAccount'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockBankInformation } from '../../../../test/data/panDetailsData'
import { BankInfo } from '../../../../types/Finance/PanDetails/panDetailsTypes'

const accountNumber = 'Bank Account Number'
const selectName = 'form-select1'
const code = 'IFSC Code'
const update = 'update-btn'
describe('Edit BankAccount without data', () => {
  beforeEach(() => {
    render(<EditBankAccount backButtonHandler={jest.fn()} selectBankId={2} />)
  })

  test('should be able to render  Edit BankAccount  Title', () => {
    expect(
      screen.getByText('Edit Bank Account Information'),
    ).toBeInTheDocument()
  })

  test('should render  Edit Bank Account  screen and back button without crashing', () => {
    const backBtn = screen.getByRole('button', { name: 'Back' })
    expect(backBtn).toBeInTheDocument()
    userEvent.click(backBtn)
  })

  test('should render labels', () => {
    expect(screen.getByText('Bank Account Number:')).toBeInTheDocument()
    expect(screen.getByText('Name of the Bank:')).toBeInTheDocument()
    expect(screen.getByText('IFSC Code:')).toBeInTheDocument()
  })

  test('should be able to click Edit button element', () => {
    const updateBtn = screen.getByRole('button', { name: 'Update' })
    userEvent.click(updateBtn)
    expect(updateBtn).toBeInTheDocument()
  })
})

describe('should render Edit Bank Account Component with data', () => {
  beforeEach(() => {
    render(<EditBankAccount backButtonHandler={jest.fn()} selectBankId={3} />, {
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

  test('Add button should be enabled ', async () => {
    const bankActNo = screen.getByPlaceholderText(accountNumber)
    userEvent.clear(bankActNo)
    userEvent.type(bankActNo, '134457921')
    expect(bankActNo).toHaveValue('134457921')

    const ifscCode = screen.getByPlaceholderText(code)
    userEvent.clear(ifscCode)
    userEvent.type(ifscCode, 'ABCD1234')
    expect(ifscCode).toHaveValue('ABCD1234')

    const bankName = screen.getByTestId(selectName)
    userEvent.selectOptions(bankName, [''])
    expect(bankName).toHaveValue('')

    const updateButton = screen.getByTestId(update)
    userEvent.click(updateButton)
    await waitFor(() => {
      expect(updateButton).toBeDisabled()
    })
  })
})
const mockSetToggle = jest.fn()

describe('Edit Bank Account Component Testing', () => {
  test('should render Edit Bank Account component with out crashing', () => {
    render(
      <EditBankAccount backButtonHandler={mockSetToggle} selectBankId={4} />,
    )
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
