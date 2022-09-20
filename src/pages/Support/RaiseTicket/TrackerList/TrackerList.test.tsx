import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { cleanup } from '@testing-library/react'
import TrackerList from './TrackerList'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { mockAddTrackerList } from '../../../../test/data/addTrackerListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const addButton = 'save-btn'
const clearButton = 'clear-btn'
const trackerName = 'tracker-name'
const AddTrackerName = 'Name:'
const checked = 'ch-All'
const mockSetTogglePage = jest.fn()

describe('AddTracker List without data', () => {
  beforeEach(() => {
    render(<TrackerList setToggle={mockSetTogglePage} />)
  })
  afterEach(cleanup)
  test('should render addTracker List component with out crashing', () => {
    expect(screen.getByText(AddTrackerName)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should be able to render  Tracker List  Title', () => {
    expect(screen.getByText('Tracker List')).toBeInTheDocument()
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

describe('AddTracker List with data', () => {
  beforeEach(() => {
    render(<TrackerList setToggle={mockSetTogglePage} />, {
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
    const cbAll = screen.getByTestId(checked)
    fireEvent.change(cbAll, { target: { checked: true } })
    userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(trackerNameInput).toHaveValue('Test')
    userEvent.click(screen.getByTestId(clearButton))
    expect(trackerNameInput).toHaveValue('')
  })

  test('should render TrackerName exist or not', () => {
    const trackerNameInput = screen.getByTestId(trackerName)
    userEvent.type(trackerNameInput, 'Issue')
    expect(trackerNameInput).toHaveValue('Issue')
  })
})
