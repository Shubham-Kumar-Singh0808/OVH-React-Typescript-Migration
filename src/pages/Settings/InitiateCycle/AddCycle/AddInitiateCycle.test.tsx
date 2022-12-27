import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddInitiateCycle from './AddInitiateCycle'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockAllCycles } from '../../../../test/data/initiateCycleData'

const mockSetTogglePage = jest.fn()
describe('Add Cycle without data', () => {
  beforeEach(() => {
    render(<AddInitiateCycle />, {
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
  afterEach(cleanup)

  test('should render Add Cycle component with out crashing', () => {
    expect(screen.getByText('Add Cycle')).toBeInTheDocument()
  })

  test('should able to click Add Btn', () => {
    const addCycleBtn = screen.getByRole('button', {
      name: 'Add',
    })
    expect(addCycleBtn).toBeDisabled()
  })

  test('should able to click Clear Btn', () => {
    const clearBtn = screen.getByRole('button', {
      name: 'Clear',
    })
    expect(clearBtn).toBeEnabled()
  })

  test('should able to click Back Btn', () => {
    const backBtn = screen.getByRole('button', {
      name: 'Back',
    })
    expect(backBtn).toBeEnabled()
  })

  test('should render labels', () => {
    expect(screen.getByText('Cycle Name:')).toBeInTheDocument()
    expect(screen.getByText('From Month :')).toBeInTheDocument()
    expect(screen.getByText('To Month :')).toBeInTheDocument()
    expect(screen.getByText('Start Date :')).toBeInTheDocument()
    expect(screen.getByText('End Date :')).toBeInTheDocument()
    expect(screen.getByText('Activate :')).toBeInTheDocument()
  })

  test('should render Initiate Cycle component', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  })

  test('should render Initiate Cycle  screen and back button without crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(1)
  })

  test('should render Activate checkbox', () => {
    const cb = screen.findByTestId('ch-All')
    expect(cb).toBeTruthy()
  })

  test('should able to clear input field', () => {
    const cycleNameInput = screen.getByTestId('cycleName')
    userEvent.type(cycleNameInput, 'Testing the Cycle Flow')
    const cbAll = screen.getByTestId('ch-All')
    fireEvent.change(cbAll, { target: { checked: true } })
    fireEvent.change(cbAll, { target: { checked: false } })
    userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(cycleNameInput).toHaveValue('Testing the Cycle Flow')
    userEvent.click(screen.getByTestId('clear-btn'))
    expect(cycleNameInput).toHaveValue('')
  })

  test('should render on Dates', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '21 Dec, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '31 Dec, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('12/21/2022')
    expect(datePickers[1]).toHaveValue('12/31/2022')
    userEvent.click(screen.getByTestId('clear-btn'))
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
  })
})
