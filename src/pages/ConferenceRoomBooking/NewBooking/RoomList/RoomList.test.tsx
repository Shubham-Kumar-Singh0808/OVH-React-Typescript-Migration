import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import RoomList from './RoomList'
import { render, screen } from '../../../../test/testUtils'
import { mockRoomNames } from '../../../../test/data/addRoomListData'

const roomName = 'Name of the Room:'

describe('RoomList without data', () => {
  beforeEach(() => {
    render(<RoomList />)
  })
  test('should be able to render  Room List  Title', () => {
    expect(screen.getByText('Room List')).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('designationButton')).toBeDisabled()
  })

  test('should render RoomList component with out crashing', () => {
    expect(screen.getByText(roomName)).toBeInTheDocument()
  })

  test('should render  Room List screen and back button without crashing', () => {
    const backBtnElement = screen.getByRole('button', { name: 'Back' })
    expect(backBtnElement).toBeInTheDocument()
    userEvent.click(backBtnElement)
  })
})

describe('should render RoomList Component with data', () => {
  beforeEach(() => {
    render(<RoomList />, {
      preloadedState: {
        roomList: {
          meetingRooms: mockRoomNames,
        },
      },
    })
  })
  test('should select Location Name', () => {
    const LocationSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LocationSelector, ['Select Location'])
    expect(LocationSelector).toHaveValue('')
  })

  test('should render on every input of RoomList', () => {
    const roomNameInput = screen.getByPlaceholderText('Enter Name')
    userEvent.type(roomNameInput, 'Aurobindo')
    expect(roomNameInput).toHaveValue('Aurobindo')
  })
})
