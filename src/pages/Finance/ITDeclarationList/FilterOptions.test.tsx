import '@testing-library/jest-dom'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import FilterOptions from './FilterOptions'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockInvestmentCycles } from '../../../test/data/itDeclarationListData'

const selectCycle = 'select-investment-cycle'
const addCycleButton = 'add-investmentCycle-btn'
const addInvestmentButton = 'add-investment-btn'
const exportButton = 'dl-export-button'
const searchInputElement = 'search-employee'
const searchEmployeeButton = 'employee-search-btn'
const mockSearchEmployee = jest.fn()
const mockSelectCycle = jest.fn()
const history = createMemoryHistory()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <FilterOptions
        investmentCycle={'1'}
        setInvestmentCycle={jest.fn()}
        searchInput={'Sai'}
        setSearchInput={mockSearchEmployee}
      />
    </Router>
  </div>
)

describe('IT Declaration List Filter Options Component Testing', () => {
  describe('IT Declaration List Filter Options Component Testing without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          itDeclarationList: {
            isLoading: ApiLoadingState.succeeded,
            cycles: mockInvestmentCycles,
            listSize: 0,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should render Cycles filter', () => {
      const cycles = screen.findByTestId(selectCycle)
      expect(cycles).toBeTruthy()
    })
    test('should render Investment Cycle Button', () => {
      const investCycleButton = screen.findByTestId(addCycleButton)
      expect(investCycleButton).toBeTruthy()
    })
    test('should render Investment Button', () => {
      const investmentButton = screen.findByTestId(addInvestmentButton)
      expect(investmentButton).toBeTruthy()
    })
    test('should render Export Button', () => {
      const exportButtonEl = screen.findByTestId(exportButton)
      expect(exportButtonEl).toBeTruthy()
    })
    test('cycle select element value should equal to option selected ', () => {
      const cycleDropdown = screen.getByTestId(selectCycle)
      userEvent.selectOptions(screen.getByTestId(selectCycle), [
        'For the F.Y 2018-19',
      ])
      expect(cycleDropdown).toBeTruthy()
    })
    test('should render search input field', () => {
      const searchComponent = screen.getByTestId(searchInputElement)
      expect(searchComponent).toBeTruthy()
    })
    test('should enable search button only when search text is entered', async () => {
      const searchInputEle = screen.getByTestId(searchInputElement)
      userEvent.type(searchInputEle, 'Sai')
      const searchButtonElement = screen.getByTestId(searchEmployeeButton)
      await waitFor(() => {
        expect(searchButtonElement).toBeEnabled()
      })
    })
    test('should redirect to addCycle Page upon clicking Add Investment Cycle Button', () => {
      const investCycleButtonEl = screen.getByTestId(addCycleButton)
      fireEvent.click(investCycleButtonEl)
      expect(history.location.pathname).toBe('/addCycle')
    })
    test('should redirect to addInvestment Page upon clicking Add Investment Cycle Button', () => {
      const investmentButtonEl = screen.getByTestId(addInvestmentButton)
      fireEvent.click(investmentButtonEl)
      expect(history.location.pathname).toBe('/addInvestment')
    })
    test('upon providing search text and then clicking enter key it should call a function ', async () => {
      const searchInputEl = screen.getByTestId(searchInputElement)
      userEvent.type(searchInputEl, 'Sai')
      fireEvent.keyDown(searchInputEl, { key: 'Enter', keyCode: 13 })
      await waitFor(() => {
        expect(mockSearchEmployee).toBeCalledTimes(3)
      })
    })
  })
})
