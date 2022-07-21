import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeeApplyLeave from './EmployeeApplyLeave'
import { render, screen, waitFor } from '../../test/testUtils'
import {
  mockLeaveApply,
  mockLeaveType,
} from '../../test/data/employeeLeaveApplyData'

describe('Leave Apply Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(<EmployeeApplyLeave />)
    })
    test('should be able to render applyLeave without crashing', () => {
      screen.debug()
    })

    test('should render "Apply For Leave" title', () => {
      const applyLeaveTitle = screen.getByRole('heading', {
        name: 'Apply For Leave',
      })
      expect(applyLeaveTitle).toBeTruthy()
    })
  })

  it('should render intially Apply button as disabled and Clear Button as enabled', () => {
    render(<EmployeeApplyLeave />)
    expect(screen.getByTestId('btn-save')).toBeDisabled()
    expect(screen.getByTestId('btn-clear')).toBeEnabled()
  })
  test('should clear dropdown and disable button after submitting ', async () => {
    render(<EmployeeApplyLeave />)
    userEvent.type(screen.getByRole('combobox'), '')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /clear/i }))
    })
  })

  test('renders the <CKEditor> component ', () => {
    render(<EmployeeApplyLeave />)
    const htmlElement = document.querySelector(
      '[data-testid="ckEditor-component"]',
    )
    const nonExistElement = document.querySelector('ckEditor-component')

    expect(htmlElement).toBeInTheDocument()
    expect(nonExistElement).not.toBeInTheDocument()
  })

  test('should enabled Apply button when input is not empty', () => {
    render(<EmployeeApplyLeave />)
    expect(screen.getByTestId('btn-clear')).not.toBeDisabled()
    expect(screen.getByTestId('btn-save')).toBeDisabled()
  })

  test('should correctly set default option', () => {
    render(<EmployeeApplyLeave />)
    expect(
      screen.getByRole('option', { name: 'Select a Leave' }).selected,
    ).toBe(true)
  })

  it('should display the correct number of options', () => {
    render(<EmployeeApplyLeave />)
    expect(screen.getAllByRole('option').length).toBe(1)
  })

  test('should render to  date picker', () => {
    const dateInput = screen.findByTestId('date-picker')
    expect(dateInput).toBeTruthy()
  })
})

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
describe('LeaveApply component with data', () => {
  beforeEach(() => {
    render(<EmployeeApplyLeave />, {
      preloadedState: {
        employeeLeaveApply: {
          employeeLeaveApply: mockLeaveApply,
        },
      },
    })
  })
  test('should be able to select date"', () => {
    const dateInput = screen.getAllByPlaceholderText('Select date')
    userEvent.type(
      dateInput[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })
  it('should fetch leave types dropdown data ', () => {
    render(<EmployeeApplyLeave />)
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
    const clearButton = screen.getByTestId('btn-clear')
    expect(clearButton).toBeEnabled()
  })

  test('should render from date picker', () => {
    const dateInput = screen.findByTestId('date-picker-to-date')
    expect(dateInput).toBeTruthy()
  })

  it('should display the correct number of options', () => {
    render(<EmployeeApplyLeave />)
    expect(screen.getAllByRole('option').length).toBe(2)
  })

  test('should render Template rich text editor', () => {
    const Comments = screen.findByTestId('ckEditor-component')
    expect(Comments).toBeTruthy()
  })
})
