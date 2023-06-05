import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditInitiateCycle from './EditInitiateCycle'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import AddInitiateCycle from '../AddCycle/AddInitiateCycle'
import { mockAllCycles } from '../../../../test/data/initiateCycleData'

const cycleNameInput = 'cycleName'
const fromMonth = 'cycleFromMonth-input'
const toMonth = 'cycleToMonth-input'
const fromDateInput = 'cycleFromDate-input'
const toDateInput = 'cycleToDate-input'
const backButtonElement = 'back-button'
describe('Edit Initiate Cycle Component Testing', () => {
  beforeEach(() => {
    render(<EditInitiateCycle />, {
      preloadedState: {
        initiateCycle: {
          isLoading: ApiLoadingState.succeeded,
          error: null,
          activeCycleData: [],
          allCycles: mockAllCycles,
          allQuestions: { size: 0, list: [] },
          listSize: 0,
        },
      },
    })
  })
  test('should render cycle name Input', () => {
    expect(screen.getByTestId(cycleNameInput)).toBeTruthy()
  })
  test('should render fromMonth Input field', () => {
    const toDatePicker = screen.findByTestId(fromMonth)
    expect(toDatePicker).toBeTruthy()
  })
  test('should render toMonth Input field', () => {
    const toDatePicker = screen.findByTestId(toMonth)
    expect(toDatePicker).toBeTruthy()
  })
  test('should render fromDate Input field', () => {
    const toDatePicker = screen.findByTestId(fromDateInput)
    expect(toDatePicker).toBeTruthy()
  })
  test('should render toDate Input field', () => {
    const toDatePicker = screen.findByTestId(toDateInput)
    expect(toDatePicker).toBeTruthy()
  })
  it('should render Update Button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Update' })).toBeDisabled()
  })
  it('should redirect to addCycle upon clicking back button from edit Cycle screen', () => {
    const backButtonEl = screen.getByTestId(backButtonElement)
    userEvent.click(backButtonEl)
    expect(render(<AddInitiateCycle />))
  })
})
