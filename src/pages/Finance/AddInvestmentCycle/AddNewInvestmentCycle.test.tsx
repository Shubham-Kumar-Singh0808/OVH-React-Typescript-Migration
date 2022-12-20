import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddNewInvestmentCycle from './AddNewInvestmentCycle'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const cycleNameInput = 'addCycle-cycle-name'
const startDateInput = 'startDate-picker-input'
const endDateInput = 'endDate-input'
const addButtonElement = 'ac-add-btn'
const activeCheckBox = 'ch-active'
const clearButtonElement = 'ac-clear-btn'

describe('Add Section Component Testing', () => {
  beforeEach(() => {
    render(<AddNewInvestmentCycle />, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
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
        target: { value: '01/2022' },
      }),
    )
    const endDateEl = screen.getByTestId(endDateInput)
    expect(endDateEl).toHaveValue('12/2022')

    const activeCheckBoxEl = screen.getByTestId(activeCheckBox)
    userEvent.click(activeCheckBoxEl)
    expect(activeCheckBoxEl).toBeChecked()

    const addButtonEl = screen.getByTestId(addButtonElement)
    await waitFor(() => {
      expect(addButtonEl).toBeEnabled()
      userEvent.click(addButtonEl)
    })
  })
  test('should clear inputs upon clicking clear button', async () => {
    const cycleNameEle = screen.getByTestId(cycleNameInput)
    userEvent.type(cycleNameEle, 'Test')
    expect(cycleNameEle).toHaveValue('Test')

    const startDatePickerEle = screen.getAllByPlaceholderText('mm/yyyy')

    fireEvent.click(startDatePickerEle[0])

    await waitFor(() =>
      fireEvent.change(startDatePickerEle[0], {
        target: { value: '01/2022' },
      }),
    )
    const endDateEle = screen.getByTestId(endDateInput)
    expect(endDateEle).toHaveValue('12/2022')

    const activeCheckBoxEle = screen.getByTestId(activeCheckBox)
    userEvent.click(activeCheckBoxEle)
    expect(activeCheckBoxEle).toBeChecked()

    const clearButton = screen.getByTestId(clearButtonElement)
    userEvent.click(clearButton)
    await waitFor(() => {
      expect(cycleNameEle).toHaveValue('')
      expect(startDatePickerEle[0]).toHaveValue('')
      expect(activeCheckBoxEle).not.toBeChecked()
    })
  })
})
