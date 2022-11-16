import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AddHoliday from './AddHoliday'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../test/testUtils'
import { mockCountries } from '../../../../../test/data/handbookTotalListData'
import { mockAddNewHoliday } from '../../../../../test/data/upcomingHolidaysData'

const holidayNameInput = 'holiday-name'
const holidayDateInput = 'Holiday Date'
const employeeCountryInput = 'country-form-select'
const addButtonElement = 'add-btn'

describe('Add Holiday Component Testing', () => {
  describe('render all inputs without crashing', () => {
    beforeEach(() => {
      render(<AddHoliday />)
    })
    test('should render "Add Holiday" title', () => {
      const addHolidayTitle = screen.getByRole('heading', {
        name: 'Add Holiday',
      })
      expect(addHolidayTitle).toBeTruthy()
    })
    test('should render holiday name Input', () => {
      expect(screen.getByTestId(holidayNameInput)).toBeTruthy()
    })
    test('should render holiday date Input', () => {
      expect(screen.getByPlaceholderText(holidayDateInput)).toBeTruthy()
    })
    test('should render country Input', () => {
      expect(screen.getByTestId(employeeCountryInput)).toBeTruthy()
    })
    it('should render Add button as enabled and Clear Button as disabled Initially', () => {
      expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
    })
  })

  describe('Add Holiday Form testing without crashing', () => {
    const history = createMemoryHistory()
    beforeEach(() => {
      render(
        <Router history={history}>
          <AddHoliday />
        </Router>,
        {
          preloadedState: {
            holidays: {
              addNewHoliday: mockAddNewHoliday,
            },
            employeeHandbookSettings: {
              employeeCountries: mockCountries,
            },
          },
        },
      )
    })
    test('should enable add button , when all mandatory fields are entered', async () => {
      const holidayName = screen.getByTestId(holidayNameInput)
      userEvent.type(holidayName, 'Christmas')
      expect(holidayName).toHaveValue('Christmas')

      userEvent.selectOptions(screen.getByTestId(employeeCountryInput), [
        'INDIA',
      ])

      const holidayDatePickerElement =
        screen.getAllByPlaceholderText(holidayDateInput)
      fireEvent.change(holidayDatePickerElement[0], {
        target: { value: '30 Oct, 2095' },
      })
      expect(holidayDatePickerElement[0]).toHaveValue('10/30/2095')
      const addButtonEl = screen.getByTestId(addButtonElement)
      await waitFor(() => {
        expect(addButtonEl).toBeEnabled()
      })
    })

    test('should clear input fields entered by the user, upon clicking clear button', async () => {
      const holidayNameEl = screen.getByTestId(holidayNameInput)
      userEvent.type(holidayNameEl, 'National Election')
      expect(holidayNameEl).toHaveValue('National Election')

      const selectCountry = userEvent.selectOptions(
        screen.getByTestId(employeeCountryInput),
        ['PHILIPPINES'],
      )

      const holidayDatePickerEl =
        screen.getAllByPlaceholderText(holidayDateInput)
      fireEvent.change(holidayDatePickerEl[0], {
        target: { value: '09 May, 2022' },
      })
      userEvent.click(screen.getByRole('button', { name: 'Clear' }))
      await waitFor(() => {
        expect(holidayNameEl).toHaveValue('')
        expect(holidayDatePickerEl[0]).toHaveValue('')
        expect(selectCountry).toBeUndefined()
      })
    })

    test('should save the details when user enters valid data and clicks on Add Button', async () => {
      const holidayNameElement = screen.getByTestId(holidayNameInput)
      userEvent.type(holidayNameElement, '	Bonifacio Day')
      expect(holidayNameElement).toHaveValue('	Bonifacio Day')

      userEvent.selectOptions(screen.getByTestId(employeeCountryInput), [
        'PHILIPPINES',
      ])

      const holidayDatePickerEl =
        screen.getAllByPlaceholderText(holidayDateInput)
      fireEvent.change(holidayDatePickerEl[0], {
        target: { value: '30 Nov, 2090' },
      })
      expect(holidayDatePickerEl[0]).toHaveValue('11/30/2090')
      const addButtonEle = screen.getByTestId(addButtonElement)
      expect(addButtonEle).toBeEnabled()
      await waitFor(() => {
        userEvent.click(addButtonEle)
      })
    })

    test('should redirect to holidaysList page upon clicking back button', async () => {
      userEvent.click(screen.getByRole('button', { name: /Back/i }))
      await waitFor(() => {
        // check if a redirect happens after clicking Back button to HolidaysList Page
        expect(history.location.pathname).toBe('/holidaylist')
      })
    })
  })
})
