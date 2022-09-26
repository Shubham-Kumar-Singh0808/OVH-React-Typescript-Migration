import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { cleanup, waitFor } from '@testing-library/react'
import TrackerListOptions from './TrackerListOptions'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { mockAddTrackerList } from '../../../../test/data/addTrackerListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockTrackerList } from '../../../../test/data/ticketApprovalsData'

const addButton = 'save-btn'
const clearButton = 'clear-btn'
const trackerName = 'trackerName'
const AddTrackerName = 'Name:'
const checked = 'ch-All'
const mockSetTogglePage = jest.fn()

describe('AddTracker List without data', () => {
  beforeEach(() => {
    render(<TrackerListOptions setToggle={mockSetTogglePage} />)
  })
  afterEach(cleanup)
  test('should render addTracker List component with out crashing', () => {
    expect(screen.getByText(AddTrackerName)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    expect(screen.getByTestId(addButton)).toBeDisabled()
    expect(screen.getByTestId(clearButton)).toBeEnabled()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
  })

  test('should enabled add button when input is not empty', () => {
    expect(screen.getByTestId(clearButton)).not.toBeDisabled()
    expect(screen.getByTestId(addButton)).toBeDisabled()
  })
})

describe('Tracker List with data', () => {
  beforeEach(() => {
    render(<TrackerListOptions setToggle={mockSetTogglePage} />, {
      preloadedState: {
        addTrackerLists: {
          trackerList: mockAddTrackerList,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })

  afterEach(cleanup)
  test('should render  Tracker List  screen and back button without crashing', () => {
    const backBtnElement = screen.getByRole('button', { name: 'Back' })
    expect(backBtnElement).toBeInTheDocument()
    userEvent.click(backBtnElement)
  })

  test('should able to clear input field', () => {
    const trackerNameInput = screen.getByTestId(trackerName)
    userEvent.type(trackerNameInput, 'Test')
    const addButton = screen.getByTestId('save-btn')
    expect(addButton).toBeEnabled()
    const cbAll = screen.getByTestId(checked)
    fireEvent.change(cbAll, { target: { checked: true } })
    userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(trackerNameInput).toHaveValue('Test')
    userEvent.click(screen.getByTestId(clearButton))
    expect(trackerNameInput).toHaveValue('')
  })
  test('should render WorkFlow checkbox', () => {
    const cb = screen.findByTestId('ch-All')
    expect(cb).toBeTruthy()
  })
})

describe('TrackerList with data', () => {
  beforeEach(() => {
    render(<TrackerListOptions setToggle={mockSetTogglePage} />, {
      preloadedState: {
        ticketApprovals: {
          trackerList: mockTrackerList,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should display error message, when user enters already existing tracker', async () => {
    const inputElement = screen.getByTestId('trackerName')
    userEvent.type(inputElement, 'Issue')
    await waitFor(() => {
      expect(screen.getByText('Name Already Exist')).toBeInTheDocument()
    })
  })
})
