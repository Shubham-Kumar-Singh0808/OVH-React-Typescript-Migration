import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import EmployeeApplyLeaveFilterOptions from './EmployeeApplyLeaveFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockLeaveApply,
  mockLeaveType,
} from '../../../test/data/employeeLeaveApplyData'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

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
  beforeEach(() => {
    render(<EmployeeApplyLeaveFilterOptions />, {
      preloadedState: {
        employeeLeaveApply: {
          employeeLeaveApply: mockLeaveApply,
          employeeLeaveType: mockLeaveType,
        },
      },
    })
  })
  screen.debug()
  test('should select Leave Type dropdown value', async () => {
    const selectLeaveType = screen.getByTestId(leaveFormSelect)
    userEvent.selectOptions(selectLeaveType, ['LOP'])
    expect(selectLeaveType).toHaveValue('LOP')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '10 Jan, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('10/29/2019')
    expect(datePickers[1]).toHaveValue('1/10/2022')

    const applyBtnElement = screen.getByRole('button', { name: 'Apply' })
    expect(applyBtnElement).toBeEnabled()
    userEvent.click(applyBtnElement)

    const history = createMemoryHistory()
    userEvent.click(screen.getByRole('button', { name: 'Apply' }))
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
})
