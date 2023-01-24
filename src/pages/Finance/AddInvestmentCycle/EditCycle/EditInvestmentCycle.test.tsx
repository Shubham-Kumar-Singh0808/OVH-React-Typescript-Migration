import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditInvestmentCycle from './EditInvestmentCycle'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import AddInvestmentCycle from '../AddInvestmentCycle'

const cycleNameInput = 'editCycle-cycle-name'
const startDateInput = 'startDate-input'
const endDateInput = 'endDate-input'
const updateButton = 'ec-update-btn'
const activeCheckBox = 'ch-active'
const backButtonElement = 'ec-back-btn'
describe('Add Section Component Testing', () => {
  beforeEach(() => {
    render(
      <EditInvestmentCycle
        editCycle={{
          active: false,
          cycleId: 1,
          cycleName: 'Test',
          startDate: '01/2022',
          endDate: '12/2022',
        }}
      />,
      {
        preloadedState: {},
      },
    )
  })
  test('should render cycle name Input', () => {
    expect(screen.getByTestId(cycleNameInput)).toBeTruthy()
  })
  test('should render start-date Input field', () => {
    const toDatePicker = screen.findByTestId(startDateInput)
    expect(toDatePicker).toBeTruthy()
  })
  it('should render Add button as disabled and Clear Button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Update' })).toBeEnabled()
  })
  it('should redirect to addCycle upon clicking back button from edit Cycle screen', () => {
    const backButtonEl = screen.getByTestId(backButtonElement)
    userEvent.click(backButtonEl)
    expect(render(<AddInvestmentCycle />))
  })
  test('should enable update button , when all mandatory fields are entered', async () => {
    const cyclenameEl = screen.getByTestId(cycleNameInput)
    expect(cyclenameEl).toHaveValue('Test')

    const startDatePickerElement = screen.getAllByPlaceholderText('mm/yyyy')
    expect(startDatePickerElement[0]).toHaveValue('01/2022')
    const endDateEl = screen.getByTestId(endDateInput)
    expect(endDateEl).toHaveValue('12/2022')

    const activeCheckBoxEl = screen.getByTestId(activeCheckBox)
    userEvent.click(activeCheckBoxEl)
    expect(activeCheckBoxEl).toBeChecked()

    const updateButtonEl = screen.getByTestId(updateButton)
    await waitFor(() => {
      expect(updateButtonEl).toBeEnabled()
      userEvent.click(updateButtonEl)
    })
  })
  test('should able to update the cycle', async () => {
    const cycleNameEle = screen.getByTestId(cycleNameInput)
    userEvent.clear(cycleNameEle)
    userEvent.type(cycleNameEle, 'testing')
    expect(cycleNameEle).toHaveValue('testing')

    const startDatePickerElement = screen.getAllByPlaceholderText('mm/yyyy')
    expect(startDatePickerElement[0]).toHaveValue('01/2022')
    const endDateEl = screen.getByTestId(endDateInput)
    expect(endDateEl).toHaveValue('12/2022')

    const updateButtonEle = screen.getByTestId(updateButton)
    await waitFor(() => {
      expect(updateButtonEle).toBeEnabled()
      userEvent.click(updateButtonEle)
    })
  })
})
