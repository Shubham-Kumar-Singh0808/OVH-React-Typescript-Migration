import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockTicketReportData } from '../../../test/data/ticketReportsData'

const mockSetSelectDate = jest.fn()
const mockSetFromDate = jest.fn()
const mockSetToDate = jest.fn()
const mockSelectDepartment = jest.fn()

// describe('Ticket Report Filter Options Component Testing', () => {
//   describe('should render Ticket Report filter options Component with data', () => {
//     beforeEach(() => {
//       render(
//         <TicketReportFilterOptions
//           selectDate={''}
//           fromDate={''}
//           toDate={''}
//           selectDepartment={''}
//           setSelectDate={mockSetSelectDate}
//           setFromDate={mockSetFromDate}
//           setToDate={mockSetToDate}
//           setSelectDepartment={mockSelectDepartment}
//         />,
//         {
//           preloadedState: {
//             ticketReport: {
//               isLoading: ApiLoadingState.succeeded,
//               ticketsReportList: mockTicketReportData,
//             },
//           },
//         },
//       )
//     })
//     test('should render data upon view button click', async () => {
//       const viewButtonElement = screen.getByRole('button', { name: 'View' })
//       const fromDatePickerElement = screen.getAllByPlaceholderText('dd/mm/yy')
//       fireEvent.click(fromDatePickerElement[0])

//       await waitFor(() =>
//         fireEvent.change(fromDatePickerElement[0], {
//           target: { value: '29 Oct, 2015' },
//         }),
//       )
//       fireEvent.click(fromDatePickerElement[1])
//       await waitFor(() =>
//         fireEvent.change(fromDatePickerElement[1], {
//           target: { value: '10 Feb, 2022' },
//         }),
//       )
//       userEvent.click(viewButtonElement)
//       expect(fromDatePickerElement[0]).toHaveValue('10/29/2015')
//       expect(fromDatePickerElement[1]).toHaveValue('02/10/2022')
//     })
//   })
// })

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

describe('Add Employee Birthday Component', () => {
  beforeEach(() => {
    render(
      <TicketReportFilterOptions
        selectDate={''}
        fromDate={''}
        toDate={''}
        selectDepartment={''}
        setSelectDate={mockSetSelectDate}
        setFromDate={mockSetFromDate}
        setToDate={mockSetToDate}
        setSelectDepartment={mockSelectDepartment}
      />,
    )
  })

  test('should be able to render birthday without crashing', () => {
    screen.debug()
  })

  test('should be able to see place holder "dd/mm/yy"', () => {
    expect(screen.getByPlaceholderText('dd/mm/yy')).toBeInTheDocument()
  })

  test('should be able to render Birthday label', () => {
    expect(screen.getByText('From:')).toBeInTheDocument()
  })

  test('should render date picker', () => {
    const dateInput = screen.findByTestId('date-picker')
    expect(dateInput).toBeTruthy()
  })

  test('should be able to select date"', () => {
    const dateInput = screen.getAllByPlaceholderText('dd/mm/yy')
    userEvent.type(
      dateInput[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })
})
