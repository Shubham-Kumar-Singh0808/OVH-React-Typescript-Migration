import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ScheduledCandidatesFilterOptions from './ScheduledCandidatesFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { mockScheduledCandidatesData } from '../../../test/data/scheduledInterviewsData'

const mockSetFilterByTechnology = jest.fn()
const mockSetSelectTechnology = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ScheduledCandidatesFilterOptions
      filterByTechnology={''}
      setFilterByTechnology={mockSetFilterByTechnology}
      selectTechnology={''}
      setSelectTechnology={mockSetSelectTechnology}
    />
  </div>
)
describe('Scheduled Candidates Filter Options Component Testing', () => {
  describe('should render scheduled candidates filter options Component without data', () => {
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

    test('should render labels', () => {
      expect(screen.getByText('From:')).toBeInTheDocument()
      expect(screen.getByText('To:')).toBeInTheDocument()
      expect(screen.getByText('Experience')).toBeInTheDocument()
    })
    test('should render from date picker', () => {
      const fromDatePicker = screen.findByTestId('scheduledCandidatesFromDate')
      expect(fromDatePicker).toBeTruthy()
    })
    test('should render to date picker', () => {
      const toDatePicker = screen.findByTestId('scheduledCandidatesToDate')
      expect(toDatePicker).toBeTruthy()
    })
  })
  describe('should render scheduled candidates filter options Component with data', () => {
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
            selectedView: 'All',
            scheduledCandidates: mockScheduledCandidatesData,
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
    test('should render data upon view button click', async () => {
      const viewButtonElement = screen.getByRole('button', { name: 'View' })
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
      expect(fromDatePickerElement[1]).toHaveValue('02/10/2022')
    })
  })
})
