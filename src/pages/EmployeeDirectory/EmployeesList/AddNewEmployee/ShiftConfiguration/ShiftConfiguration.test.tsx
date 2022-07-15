import '@testing-library/jest-dom'
import { debug } from 'console'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ShiftConfiguration from './ShiftConfiguration'
import { render, screen, waitFor } from '../../../../../test/testUtils'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'

const mockSetToggleShift = jest.fn()
describe('Shift Configuration Component Testing', () => {
  describe('Shift Configuration Component without data', () => {
    beforeEach(() => {
      render(<ShiftConfiguration setToggleShift={mockSetToggleShift} />)
    })
    test('should render shift configuration component', () => {
      expect(screen.getByPlaceholderText('Shift Name')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    })
    test('should render start time hours input element', () => {
      const startTimeHoursInputElement = screen.getByTestId('sh-startTimeHour')
      expect(startTimeHoursInputElement).toBeTruthy()
    })
    test('should render start time minutes input element', () => {
      const startTimeMinutesInputElement = screen.getByTestId(
        'sh-startTimeMinutes',
      )
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
    test('should providing data to all necessary fields then add button should enable', async () => {
      const shiftNameField = screen.getByPlaceholderText('Shift Name')
      userEvent.type(shiftNameField, testShift)
      expect(shiftNameField).toHaveValue(testShift)
      userEvent.type(screen.getByTestId('sh-startTimeHour'), '45')
      userEvent.type(screen.getByTestId('sh-startTimeMinutes'), '45')
      userEvent.type(screen.getByTestId('sh-endTimeHour'), '2')
      userEvent.type(screen.getByTestId('sh-endTimeMinutes'), '99')
      userEvent.type(screen.getByPlaceholderText('In Minutes'), '30')
      const addBtn = screen.getByRole('button', { name: 'Add' })
      userEvent.click(addBtn)
      debug()
      await waitFor(() => {
        expect(addBtn).toBeEnabled()
        // expect(screen.getByText(testShift)).toBeInTheDocument()
      })
    })
    test('should render start', () => {
      const backBtnElement = screen.getByRole('button', { name: 'Back' })
      userEvent.click(backBtnElement)
      expect(mockSetToggleShift).toBeCalledTimes(1)
    })
  })
})
