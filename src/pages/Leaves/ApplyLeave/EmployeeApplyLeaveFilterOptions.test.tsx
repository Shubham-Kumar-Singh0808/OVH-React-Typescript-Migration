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

describe('Leave Apply Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(<EmployeeApplyLeaveFilterOptions />)
    })
    test('should be able to render applyLeave without crashing', () => {
      screen.debug()
    })

    it('should display the correct number of options', () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      expect(screen.getAllByRole('option').length).toBe(2)
    })

    test('should render to  date picker', () => {
      const dateInput = screen.findByTestId('date-picker')
      expect(dateInput).toBeTruthy()
    })
  })
  describe('LeaveApply component with data', () => {
    beforeEach(() => {
      render(<EmployeeApplyLeaveFilterOptions />, {
        preloadedState: {
          employeeLeaveApply: {
            employeeLeaveApply: mockLeaveApply,
          },
        },
      })
    })
    it('should fetch leave types dropdown data ', () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      screen.debug()
      mockLeaveType.forEach(async (type) => {
        await waitFor(() => {
          expect(screen.queryAllByText(type.name)).toBeDefined()
        })
        await waitFor(() => {
          expect(screen.queryByText('Leave Type')).toBeDefined()
        })
      })
    })
    test('should render clear button', () => {
      const clearButton = screen.getByTestId('sh-clear-button')
      expect(clearButton).toBeEnabled()
    })

    test('should click on Apply button ', async () => {
      const viewButton1 = screen.findByTestId('sh-view-button')
      await userEvent.click(await viewButton1)
      expect(viewButton1).toBeTruthy()
    })

    test('should render from date picker', () => {
      const dateInput = screen.findByTestId('date-picker-to-date')
      expect(dateInput).toBeTruthy()
    })

    it('should display the correct number of options', () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      expect(screen.getAllByRole('option').length).toBe(2)
    })

    test('should render Template rich text editor', () => {
      const Comments = screen.findByTestId('ckEditor-component')
      expect(Comments).toBeTruthy()
    })
    test('should render data upon apply button click', async () => {
      const viewButtonElement = screen.getByRole('button', { name: 'Apply' })
      const fromDatePickerElement = screen.getAllByPlaceholderText('dd/mm/yy')
      fireEvent.click(fromDatePickerElement[0])
      await waitFor(() =>
        fireEvent.change(fromDatePickerElement[0], {
          target: { value: '29 Oct, 2015' },
        }),
      )
      fireEvent.click(fromDatePickerElement[1])
      await waitFor(() =>
        fireEvent.change(fromDatePickerElement[1], {
          target: { value: '10 Feb, 2022' },
        }),
      )
      userEvent.click(viewButtonElement)
      expect(fromDatePickerElement[0]).toHaveValue('10/29/2015')
      expect(fromDatePickerElement[1]).toHaveValue('2/10/2022')
    })
    test('should redirect to / when Apply Leave successful', async () => {
      const history = createMemoryHistory()
      userEvent.click(screen.getByRole('button', { name: 'Apply' }))
      await waitFor(() => {
        expect(history.location.pathname).toBe('/')
      })
    })
    test('should clear data upon clear button click', () => {
      const clearButtonElement = screen.getByRole('button', { name: 'Clear' })
      userEvent.click(clearButtonElement)
      const fromDatePickerElement = screen.getAllByPlaceholderText('dd/mm/yy')
      expect(fromDatePickerElement[0]).toHaveValue('')
    })
  })

  describe('LeaveType component with data', () => {
    beforeEach(() => {
      render(<EmployeeApplyLeaveFilterOptions />, {
        preloadedState: {
          employeeLeaveApply: {
            employeeLeaveType: mockLeaveType,
          },
        },
      })
    })
    test('should select dropdown value', () => {
      const LeaveTypeSelectListSelector = screen.getByTestId('form-select')
      userEvent.selectOptions(LeaveTypeSelectListSelector, ['LOP'])
      expect(LeaveTypeSelectListSelector).toHaveValue('LOP')
    })
    test('renders the <CKEditor> component ', () => {
      const htmlElement = document.querySelector(
        '[data-testid="ckEditor-component"]',
      )
      const nonExistElement = document.querySelector('ckEditor-component')

      expect(htmlElement).toBeInTheDocument()
      expect(nonExistElement).not.toBeInTheDocument()
    })
    test('should clear input and disable button after  new apply leave should be added', async () => {
      const LeaveTypeSelectListSelector = screen.getByTestId('form-select')
      userEvent.selectOptions(LeaveTypeSelectListSelector, ['LOP'])
      await waitFor(() => {
        userEvent.click(screen.getByTestId('sh-clear-button'))
        userEvent.selectOptions(LeaveTypeSelectListSelector, [''])
        expect(screen.getByTestId('sh-view-button')).toBeDisabled()
      })
    })
  })
})

test('should redirect to /employeeSumary when user clicks on Apply Button', async () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeApplyLeaveFilterOptions />
      </ReduxProvider>
    </Router>,
  )
  userEvent.click(screen.getByRole('button', { name: 'Apply' }))
  await waitFor(() => {
    expect(history.location.pathname).toBeTruthy()
  })
})
