import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EditHoliday from './EditHoliday'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../test/testUtils'
import { mockCountries } from '../../../../../test/data/handbookTotalListData'
import { mockEditHoliday } from '../../../../../test/data/upcomingHolidaysData'

const holidayNameInput = 'holiday-name'
const holidayDateInput = 'Holiday Date'
const countryInput = 'select-country'
const updateButtonElement = 'update-btn'

describe('Edit Holiday Component Testing', () => {
  describe('render all inputs without crashing', () => {
    beforeEach(() => {
      render(<EditHoliday />)
    })
    test('should render "Edit Holiday" title', () => {
      const editHolidayTitle = screen.getByRole('heading', {
        name: 'Edit Holiday',
      })
      expect(editHolidayTitle).toBeTruthy()
    })
    test('should render holidayName Input', () => {
      expect(screen.getByTestId(holidayNameInput)).toBeTruthy()
    })
    test('should render holidayDate Input', () => {
      expect(screen.getByPlaceholderText(holidayDateInput)).toBeTruthy()
    })
    test('should render country dropdown', () => {
      expect(screen.getByTestId(countryInput)).toBeTruthy()
    })
    it('should render Update button as enabled Initially', () => {
      expect(screen.getByRole('button', { name: 'Update' })).toBeDisabled()
    })
  })

  describe('Edit Holiday Form testing without crashing', () => {
    const history = createMemoryHistory()
    beforeEach(() => {
      render(
        <Router history={history}>
          <EditHoliday />
        </Router>,
        {
          preloadedState: {
            holidays: {
              editHoliday: mockEditHoliday,
            },
            employeeHandbookSettings: {
              employeeCountries: mockCountries,
            },
          },
        },
      )
    })
    test('should disable update button , when any field is cleared by the user ', async () => {
      const holidayName = screen.getByTestId(holidayNameInput)
      userEvent.clear(holidayName)
      expect(holidayName).toHaveValue('')

      userEvent.selectOptions(screen.getByTestId(countryInput), ['USA'])

      const holidayDatePickerElement =
        screen.getAllByPlaceholderText(holidayDateInput)
      fireEvent.change(holidayDatePickerElement[0], {
        target: { value: '30 Oct, 2022' },
      })
      expect(holidayDatePickerElement[0]).toHaveValue('30/10/2022')
      const updateButtonEl = screen.getByTestId(updateButtonElement)
      await waitFor(() => {
        expect(updateButtonEl).toBeDisabled()
      })
    })

    test('should save the changes when user modifies data and clicks on Update Button', async () => {
      const holidayNameElement = screen.getByTestId(holidayNameInput)
      userEvent.clear(holidayNameElement)
      userEvent.type(holidayNameElement, 'Vinayaka Chavithi')
      expect(holidayNameElement).toHaveValue('Vinayaka Chavithi')

      userEvent.selectOptions(screen.getByTestId(countryInput), ['INDIA'])

      const holidayDatePickerEl =
        screen.getAllByPlaceholderText(holidayDateInput)
      fireEvent.change(holidayDatePickerEl[0], {
        target: { value: '29 Nov, 2022' },
      })
      expect(holidayDatePickerEl[0]).toHaveValue('29/11/2022')
      const updateButtonEle = screen.getByTestId(updateButtonElement)
      await waitFor(() => {
        userEvent.click(updateButtonEle)
      })
    })

    test('should redirect to holidaysList page upon clicking back button from Edit Holiday page', async () => {
      userEvent.click(screen.getByRole('button', { name: /Back/i }))
      await waitFor(() => {
        // check if a redirect happens after clicking Back button to HolidaysList Page
        expect(history.location.pathname).toBe('/holidaylist')
      })
    })
  })
})
