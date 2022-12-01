import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import PanAndBankDetails from './PanAndBankDetails'
import AddBankAccount from './BankDetails/AddBankAccount'
import EditBankAccount from './BankDetails/EditBankAccount'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <PanAndBankDetails />,
  </div>
)
describe('Pan And Bank Details Component Testing', () => {
  test('should render Pan And Bank Details component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('P.F. & PAN Details')).toBeInTheDocument()
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

describe('Edit Bank Account Component Testing', () => {
  test('should render Edit Bank Account component with out crashing', () => {
    render(
      <EditBankAccount backButtonHandler={mockSetToggle} selectBankId={5} />,
    )
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
