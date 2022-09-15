import React from 'react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import HolidaysListTable from './HolidaysListTable'
import EditHoliday from './EditHoliday/EditHoliday'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import {
  mockUpcomingHolidays,
  mockUpcomingUSAHolidays,
} from '../../../../test/data/upcomingHolidaysData'
import { mockCountries } from '../../../../test/data/handbookTotalListData'

describe('Employee Holidays Table Component Testing', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <HolidaysListTable
          selectedCountry="INDIA"
          setSelectedCountry={jest.fn()}
        />
      </Router>,
      {
        preloadedState: {
          holidays: {
            upcomingHolidays: mockUpcomingHolidays,
          },
          employeeHandbookSettings: {
            employeeCountries: mockCountries,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  test('should render the "Holidays List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Week' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Occasion' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Country' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(21)
  })

  test('should render edit button in the Actions', () => {
    expect(screen.getByTestId('holiday-edit-btn0')).toHaveClass(
      'btn btn-info btn-ovh me-2',
    )
  })
  test('should render delete button in the Actions', () => {
    expect(screen.getByTestId('holiday-delete-btn0')).toHaveClass(
      'btn btn-danger btn-sm',
    )
  })

  test('should redirect to Edit Holiday page upon clicking Edit button from HolidaysList Page', () => {
    const editButtonEl = screen.getByTestId('holiday-edit-btn1')
    userEvent.click(editButtonEl)
    expect(history.location.pathname).toBe('/editHoliday/148')
  })
  it('should render Delete modal on clicking delete button from Actions', async () => {
    const deleteButtonEl = screen.getByTestId('holiday-delete-btn1')
    userEvent.click(deleteButtonEl)
    await waitFor(() => {
      expect(screen.getByText('Delete Holiday')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  test('should render correct number of 40 page records', () => {
    userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
    const pageSizeSelect = screen.getByRole('option', {
      name: '40',
    }) as HTMLOptionElement
    expect(pageSizeSelect.selected).toBe(true)

    // 42 including the heading
    expect(screen.getAllByRole('row')).toHaveLength(41)
  })
})

describe('Holidays Table Component Testing of `Country:USA`', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <HolidaysListTable
          selectedCountry="USA"
          setSelectedCountry={jest.fn()}
        />
      </Router>,
      {
        preloadedState: {
          holidays: {
            upcomingHolidays: mockUpcomingUSAHolidays,
          },
          employeeHandbookSettings: {
            employeeCountries: mockCountries,
          },
        },
      },
    )
  })
  afterEach(cleanup)

  test('should render Number of Holidays: 0 if there is No holidays for selected Country', async () => {
    if (mockUpcomingUSAHolidays.length === 0)
      await waitFor(() => {
        expect(
          screen.queryByText('Total Number of Holidays:0'),
        ).toBeInTheDocument()
      })
  })
})
