import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ScheduledInterviewsFilterOptions from './ScheduledInterviewsFilterOptions'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { mockScheduledCandidatesForEmployeeData } from '../../../test/data/scheduledInterviewsData'

const mockSetSelectInterviewStatus = jest.fn()
const mockSetFilterByInterviewStatus = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ScheduledInterviewsFilterOptions
      selectInterviewStatus={''}
      filterByInterviewStatus={''}
      setFilterByInterviewStatus={mockSetFilterByInterviewStatus}
      setSelectInterviewStatus={mockSetSelectInterviewStatus}
    />
  </div>
)

describe('Scheduled Interviews Filter Options Component Testing', () => {
  describe('should render scheduled interviews filter options Component without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'venkata',
              employeeId: 1978,
              userName: 'venkata kolla',
              role: 'admin',
            },
          },
        },
      })
    })
    afterEach(cleanup)
    test('should render labels', () => {
      expect(screen.getByText('From:')).toBeInTheDocument()
      expect(screen.getByText('To:')).toBeInTheDocument()
    })
    test('should render from date picker', () => {
      const fromDatePicker = screen.findByTestId('scheduledInterviewsFromDate')
      expect(fromDatePicker).toBeTruthy()
    })
    test('should render to date picker', () => {
      const toDatePicker = screen.findByTestId('scheduledInterviewsToDate')
      expect(toDatePicker).toBeTruthy()
    })
  })
  describe('should render scheduled interviews filter options Component with data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'venkata',
              employeeId: 1978,
              userName: 'venkata kolla',
              role: 'admin',
            },
          },
          scheduledInterviews: {
            selectedView: 'Me',
            scheduledCandidatesForEmployee:
              mockScheduledCandidatesForEmployeeData,
          },
        },
      })
    })
    test('should clear data upon clear button click', () => {
      const clearButtonElement = screen.getByRole('button', { name: 'Clear' })
      userEvent.click(clearButtonElement)
      const fromDatePickerElement = screen.getAllByPlaceholderText('dd/mm/yy')
      expect(fromDatePickerElement[0]).toHaveValue('')
    })
    test('should render data upon view button click ', async () => {
      const viewButtonElement = screen.getByRole('button', { name: 'View' })
      const fromDatePickerElement = screen.getAllByPlaceholderText('dd/mm/yy')
      fireEvent.click(fromDatePickerElement[0])

      await waitFor(() =>
        fireEvent.change(fromDatePickerElement[0], {
          target: { value: '29 Oct, 2017' },
        }),
      )
      fireEvent.click(fromDatePickerElement[1])
      await waitFor(() =>
        fireEvent.change(fromDatePickerElement[1], {
          target: { value: '10 Jan, 2022' },
        }),
      )
      userEvent.click(viewButtonElement)
      expect(fromDatePickerElement[0]).toHaveValue('10/29/2017')
      expect(fromDatePickerElement[1]).toHaveValue('01/10/2022')
    })
  })
})
