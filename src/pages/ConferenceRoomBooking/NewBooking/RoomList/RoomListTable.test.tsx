import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RoomListTable from './RoomListTable'
import { render, screen } from '../../../../test/testUtils'
import { mockRoomNames } from '../../../../test/data/addRoomListData'

describe('Room List without data', () => {
  beforeEach(() => {
    render(<RoomListTable />)
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Location' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Room Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(5)
  })

  test('should render the "Tracker" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})

describe('Room List Table with data', () => {
  beforeEach(() => {
    render(<RoomListTable />, {
      preloadedState: {
        roomList: {
          meetingRooms: mockRoomNames,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Room List component with data', () => {
    expect(screen.getByText('Vivekananda - 2nd Floor')).toBeInTheDocument()
    expect(screen.getByText('Ajay Ray Cabin')).toBeInTheDocument()
    expect(screen.getByText('Aurobindo')).toBeInTheDocument()
    expect(screen.getByText('Valmiki - 3rd Floor')).toBeInTheDocument()
  })

  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-delete3')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })

  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockRoomNames.length),
    ).toBeInTheDocument()
  })
})
