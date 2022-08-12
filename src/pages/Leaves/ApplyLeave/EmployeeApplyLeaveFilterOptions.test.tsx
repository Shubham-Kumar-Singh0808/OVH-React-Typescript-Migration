import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeeApplyLeaveFilterOptions from './EmployeeApplyLeaveFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockLeaveApply,
  mockLeaveType,
} from '../../../test/data/employeeLeaveApplyData'

describe('Leave Apply Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(<EmployeeApplyLeaveFilterOptions />)
    })
    test('should be able to render applyLeave without crashing', () => {
      screen.debug()
    })

    it('should render intially Apply button as disabled and Clear Button as enabled', () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      expect(screen.getByTestId('sh-view-button')).toBeDisabled()
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(screen.getByTestId('sh-clear-button')).toBeEnabled()
    })
    test('should clear dropdown and disable button after submitting ', async () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      userEvent.type(screen.getByRole('combobox'), '')
      await waitFor(() => {
        userEvent.click(screen.getByRole('button', { name: /clear/i }))
      })
    })

    test('renders the <CKEditor> component ', () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      const htmlElement = document.querySelector(
        '[data-testid="ckEditor-component"]',
      )
      const nonExistElement = document.querySelector('ckEditor-component')

      expect(htmlElement).toBeInTheDocument()
      expect(nonExistElement).not.toBeInTheDocument()
    })

    test('should enabled Apply button when input is not empty', () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      expect(screen.getByTestId('sh-clear-button')).not.toBeDisabled()
      expect(screen.getByTestId('sh-view-button')).toBeDisabled()
    })

    test('should correctly set default option', () => {
      render(<EmployeeApplyLeaveFilterOptions />)
      expect(
        screen.getByRole('option', { name: 'Select a Leave' }).selected,
      ).toBe(true)
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
  })
})
