import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import moment from 'moment'
import ReportOptions from './ReportOptions'
import { render, screen } from '../../../test/testUtils'

const mockSetSearchValue = jest.fn()
const mockSetStartDate = jest.fn()
const mockViewButtonHandler = jest.fn()

describe('Report Options Component Testing', () => {
  test('should render Report Options component with out crashing', () => {
    render(
      <ReportOptions
        setSearchValue={mockSetSearchValue}
        setStartDate={mockSetStartDate}
        viewButtonHandler={mockViewButtonHandler}
        startDate={undefined}
      />,
      {
        preloadedState: {
          timeInOfficeReport: {
            selectedDate: moment().subtract(1, 'months').format('M/YYYY'),
            selectedView: 'Me',
          },
        },
      },
    )

    const allRadio = screen.getByTestId('select-view-all')
    userEvent.click(allRadio)

    const searchBtn = screen.getByTestId('multi-search-btn')
    const searchInput = screen.getByTestId('multi-search-input')

    expect(searchBtn).toBeDisabled()
    userEvent.type(searchInput, 'test')
    expect(searchBtn).not.toBeDisabled()

    const previousRadio = screen.getByTestId('select-month-previous')
    userEvent.click(previousRadio)

    const otherRadio = screen.getByTestId('select-month-other')
    userEvent.click(otherRadio)
    const viewBtn = screen.getByTestId('form-button1')
    const clearBtn = screen.getByTestId('form-button2')
    expect(viewBtn).toBeDisabled()
    expect(clearBtn).toBeDisabled()

    const datePicker = screen.getByPlaceholderText('mm/yyyy')
    userEvent.click(datePicker)

    // const todayBtn = screen.getByText('Today')
    // userEvent.click(todayBtn)
    screen.debug()
    // expect(mockSetStartDate).toBeCalled()
  })
})
