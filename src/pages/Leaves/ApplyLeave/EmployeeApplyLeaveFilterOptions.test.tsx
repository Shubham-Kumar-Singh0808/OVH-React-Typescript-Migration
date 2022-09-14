import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EmployeeApplyLeaveFilterOptions from './EmployeeApplyLeaveFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockLeaveApply,
  mockLeaveType,
} from '../../../test/data/employeeLeaveApplyData'

const leaveFormSelect = 'leaveApply-form-select'

describe('Leave Apply Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeApplyLeaveFilterOptions />)
  })
  it('should display the correct number of options', () => {
    render(<EmployeeApplyLeaveFilterOptions />)
    expect(screen.getAllByRole('option').length).toBe(2)
  })
  test('should render leave Type filter', () => {
    const leaveType = screen.findByTestId(leaveFormSelect)
    expect(leaveType).toBeTruthy()
  })
  test('should render date option select field', () => {
    const dateOptionSelect = screen.findByTestId('leaveApplyFromDate')
    expect(dateOptionSelect).toBeTruthy()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('sh-clear-button')
    expect(clearButton).toBeEnabled()
  })
  test('should render Template rich text editor', () => {
    const Comments = screen.findByTestId('ckEditor-component')
    expect(Comments).toBeTruthy()
  })
})

describe('Ticket Approvals Filter Options Component Testing with data', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <EmployeeApplyLeaveFilterOptions />
      </Router>,
      {
        preloadedState: {
          employeeLeaveApply: {
            employeeLeaveApply: mockLeaveApply,
            employeeLeaveType: mockLeaveType,
          },
        },
      },
    )
  })
  screen.debug()
  it('should render Apply button as enabled and Clear Button as disabled', () => {
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
  })
  test('should select Leave Type dropdown value', async () => {
    const selectLeaveType = screen.getByTestId(leaveFormSelect)
    userEvent.selectOptions(selectLeaveType, ['LOP'])
    expect(selectLeaveType).toHaveValue('LOP')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '11 Oct, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '12 Oct, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('10/11/2022')
    expect(datePickers[1]).toHaveValue('10/12/2022')

    const applyBtnElement = screen.getByRole('button', { name: 'Apply' })
    expect(applyBtnElement).toBeEnabled()
    userEvent.click(applyBtnElement)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/')
    })
  })

  test('should clear input and disable button after  new apply leave should be added', async () => {
    const LeaveTypeSelectListSelector = screen.getByTestId(leaveFormSelect)
    userEvent.selectOptions(LeaveTypeSelectListSelector, ['LOP'])
    await waitFor(() => {
      userEvent.click(screen.getByTestId('sh-clear-button'))
      userEvent.selectOptions(LeaveTypeSelectListSelector, [''])
      const datePickers = screen.getAllByPlaceholderText('dd/mm/yy')
      expect(datePickers[0]).toHaveValue('')
      expect(datePickers[1]).toHaveValue('')
      expect(screen.getByTestId('sh-view-button')).toBeDisabled()
    })
  })

  test('date error', async () => {
    const datePickerElement = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(datePickerElement[0])

    await waitFor(() =>
      fireEvent.change(datePickerElement[0], {
        target: { value: '11 Oct, 2022' },
      }),
    )
    fireEvent.click(datePickerElement[1])
    await waitFor(() =>
      fireEvent.change(datePickerElement[1], {
        target: { value: '02 Oct, 2022' },
      }),
    )
    expect(datePickerElement[0]).toHaveValue('10/11/2022')
    expect(datePickerElement[1]).toHaveValue('10/02/2022')
    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toBeInTheDocument()
    })
  })
})
