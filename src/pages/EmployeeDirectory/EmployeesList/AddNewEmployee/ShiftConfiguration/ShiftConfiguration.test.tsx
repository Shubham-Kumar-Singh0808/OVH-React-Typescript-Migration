import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ShiftConfiguration from './ShiftConfiguration'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../test/testUtils'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'

const mockSetToggleShift = jest.fn()
const shiftName = 'Shift Name'
const startTimeHour = 'sh-startTimeHour'
const startTimeMinutes = 'sh-startTimeMinutes'
describe('Shift Configuration Component Testing', () => {
  describe('Shift Configuration Component without data', () => {
    beforeEach(() => {
      render(<ShiftConfiguration setToggleShift={mockSetToggleShift} />)
    })
    test('should render shift configuration component', () => {
      expect(screen.getByPlaceholderText(shiftName)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    })
    test('should render start time minutes input element', () => {
      const startTimeMinutesInputElement = screen.getByTestId(startTimeHour)
      expect(startTimeMinutesInputElement).toBeTruthy()
    })
  })

  describe('Shift Configuration Component with data', () => {
    const testShift = 'test shift'
    beforeEach(() => {
      render(<ShiftConfiguration setToggleShift={mockSetToggleShift} />, {
        preloadedState: {
          shiftConfiguration: {
            employeeShifts: mockEmployeeShifts,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should providing data to all necessary fields then add button should enable', async () => {
      const shiftNameField = screen.getByPlaceholderText(shiftName)
      userEvent.type(shiftNameField, testShift)
      expect(shiftNameField).toHaveValue(testShift)
      userEvent.type(screen.getByTestId(startTimeHour), '45')
      userEvent.type(screen.getByTestId(startTimeMinutes), '45')
      userEvent.type(screen.getByTestId('sh-endTimeHour'), '2')
      userEvent.type(screen.getByTestId('sh-endTimeMinutes'), '99')
      userEvent.type(screen.getByPlaceholderText('In Minutes'), '30')
      const addBtn = screen.getByRole('button', { name: 'Add' })
      userEvent.click(addBtn)
      await waitFor(() => {
        expect(addBtn).toBeEnabled()
      })
    })
    test('should validate input data which is greater then 59 for minutes', async () => {
      const shiftNameField = screen.getByPlaceholderText('Shift Name')
      userEvent.type(shiftNameField, testShift)
      expect(shiftNameField).toHaveValue(testShift)
      userEvent.type(screen.getByTestId(startTimeHour), '72')
      userEvent.type(screen.getByTestId(startTimeMinutes), '99')
      userEvent.type(screen.getByTestId('sh-endTimeHour'), '76')
      userEvent.type(screen.getByTestId('sh-endTimeMinutes'), '43')
      userEvent.type(screen.getByPlaceholderText('In Minutes'), '65')
      const addBtn = screen.getByRole('button', { name: 'Add' })
      await fireEvent.click(addBtn)
      await waitFor(() => {
        expect(screen.getByTestId(startTimeMinutes)).toHaveValue('59')
      })
    })
    test('should able to click back button', () => {
      const backBtnElement = screen.getByRole('button', { name: 'Back' })
      userEvent.click(backBtnElement)
      expect(mockSetToggleShift).toBeCalledTimes(1)
    })
  })
})
