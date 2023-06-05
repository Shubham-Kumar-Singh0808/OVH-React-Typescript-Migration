import '@testing-library/jest-dom'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EventListFilterOptions from './EventListFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEventList } from '../../../test/data/eventListData'

const mockSetSelectDate = jest.fn()
const mockSetFromDate = jest.fn()
const mockSetToDate = jest.fn()
const history = createMemoryHistory()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <EventListFilterOptions
        selectDate={''}
        eventFromDate={''}
        eventToDate={''}
        setSelectDate={mockSetSelectDate}
        setEventFromDate={mockSetFromDate}
        setEventToDate={mockSetToDate}
      />
      ,
    </Router>
  </div>
)
const DateFormat = '10 Sep, 2022'
const DateFromFormat = '30 Sep, 2022'

const toRenderCustomDate = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <EventListFilterOptions
        selectDate={'Custom'}
        eventFromDate={DateFormat}
        eventToDate={DateFromFormat}
        setSelectDate={mockSetSelectDate}
        setEventFromDate={mockSetFromDate}
        setEventToDate={mockSetToDate}
      />
      ,
    </Router>
  </div>
)
const selectCustomDate = 'event-select-date'

describe('Filter Options Component Testing', () => {
  describe('Filter Options component without value', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          eventList: {
            events: mockEventList.list,
            isLoading: ApiLoadingState.succeeded,
            listSize: 41,
          },
        },
      })
    })
    test('should render date option select field', () => {
      const dateOptionSelect = screen.findByTestId(selectCustomDate)
      expect(dateOptionSelect).toBeTruthy()
    })
    it('should display the correct number of options', () => {
      expect(screen.getAllByRole('option').length).toBe(6)
    })
    it('should correctly set default option', () => {
      expect(screen.getByRole('option', { name: 'Today' }).selected).toBe(true)
    })
  })

  describe('Filter Options with Custom selection', () => {
    beforeEach(() => {
      render(toRenderCustomDate, {
        preloadedState: {
          eventList: {
            events: mockEventList.list,
            isLoading: ApiLoadingState.succeeded,
            listSize: 41,
          },
        },
      })
    })
    test('should render event from and to date fields upon selecting "custom" from options..', async () => {
      const dateOption = screen.getByTestId(selectCustomDate)
      expect(dateOption).toHaveValue('Custom')
      const datePickerElements = screen.getAllByPlaceholderText('dd/mm/yy')
      await waitFor(() => {
        fireEvent.click(datePickerElements[0])
        fireEvent.change(datePickerElements[0], {
          target: { value: '10 Sep, 2022' },
        })
        fireEvent.click(datePickerElements[1])
        fireEvent.change(datePickerElements[1], {
          target: { value: '30 Sep, 2022' },
        })
        expect(datePickerElements[0]).toHaveValue(DateFormat)
        expect(datePickerElements[1]).toHaveValue(DateFromFormat)
      })
    })
  })
})
