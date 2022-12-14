import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddNewInvestmentCycle from './AddNewInvestmentCycle'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'

const cycleNameInput = 'addCycle-cycle-name'
const startDateInput = 'startDate-picker-input'
const endDateInput = 'endDate-input'
const addButtonElement = 'ac-add-btn'
const clearButtonElement = 'ac-clear-btn'

describe('Add Section Component Testing', () => {
  beforeEach(() => {
    render(<AddNewInvestmentCycle />, {
      preloadedState: {},
    })
  })
  test('should render cycle name Input', () => {
    expect(screen.getByTestId(cycleNameInput)).toBeTruthy()
  })
  test('should render start-date date picker', () => {
    const toDatePicker = screen.findByTestId(startDateInput)
    expect(toDatePicker).toBeTruthy()
  })
  it('should render Add button as disabled and Clear Button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
  })
  test('should enable add button , when all mandatory fields are entered', async () => {
    const cyclenameEl = screen.getByTestId(cycleNameInput)
    userEvent.type(cyclenameEl, 'Test')
    expect(cyclenameEl).toHaveValue('Test')

    const startDatePickerElement = screen.getAllByPlaceholderText('mm/yyyy')

    fireEvent.click(startDatePickerElement[0])

    await waitFor(() =>
      fireEvent.change(startDatePickerElement[0], {
        target: { value: '02/2022' },
      }),
    )
    fireEvent.click(startDatePickerElement[0])

    const addButtonEl = screen.getByTestId(addButtonElement)
    await waitFor(() => {
      expect(addButtonEl).toBeEnabled()
      userEvent.click(addButtonEl)
    })
  })
})
