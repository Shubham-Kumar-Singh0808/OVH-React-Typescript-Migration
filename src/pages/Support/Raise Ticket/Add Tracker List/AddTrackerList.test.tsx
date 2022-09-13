import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { cleanup } from '@testing-library/react'
import AddTrackerList from './AddTrackerList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { mockAddTrackerList } from '../../../../test/data/addTrackerListData'

const addButton = 'save-btn'
const clearButton = 'clear-btn'
const trackerName = 'tracker-name'
const AddTrackerName = 'Name:'
const checked = 'ch-All'

describe('AddTracker List without data', () => {
  beforeEach(() => {
    render(<AddTrackerList />)
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

  test('should render the "Tracker" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Approval' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })

  test('should enabled add button when input is not empty', () => {
    expect(screen.getByTestId(clearButton)).not.toBeDisabled()
    expect(screen.getByTestId(addButton)).toBeDisabled()
  })
})

describe('AddTracker List with data', () => {
  beforeEach(() => {
    render(<AddTrackerList />, {
      preloadedState: {
        addTrackerLists: {
          trackerList: mockAddTrackerList,
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

  test('should render TrackerName exist or not', async () => {
    const trackerNameInput = screen.getByTestId(trackerName)
    userEvent.type(trackerNameInput, 'Issue')
    expect(trackerNameInput).toHaveValue('Issue')
    await waitFor(() => {
      expect(screen.getByText('Name Already Exist')).toBeInTheDocument()
    })
  })
})
