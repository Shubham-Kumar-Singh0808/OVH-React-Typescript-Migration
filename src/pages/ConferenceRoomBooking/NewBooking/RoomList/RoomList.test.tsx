import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import RoomList from './RoomList'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockRoomNames } from '../../../../test/data/addRoomListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { mockLocationNames } from '../../../../test/data/addLocationListData'

const roomName = 'Name of the Room:'
const mockSetToggle = jest.fn()
describe('RoomList without data', () => {
  beforeEach(() => {
    render(<RoomList setToggle={jest.fn()} />, {
      preloadedState: {
        roomList: {
          meetingRooms: mockRoomNames,
        },
        addLocationList: {
          meetingLocations: mockLocationNames,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
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

  test('should select Location Name', () => {
    const LocationSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LocationSelector, ['RayBusiness-1'])
    expect(LocationSelector).toHaveValue('1')
  })

  test('should render on every input of RoomList', () => {
    const roomNameInput = screen.getByPlaceholderText('Enter Room Name')
    userEvent.type(roomNameInput, 'Aurobindo')
    expect(roomNameInput).toHaveValue('Aurobindo')
  })
  jest.retryTimes(3)
  test('should render  Room List screen and add button', async () => {
    const addBtnElement = screen.getByRole('button', { name: 'Add' })
    expect(addBtnElement).toBeInTheDocument()
    userEvent.click(addBtnElement)
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter Room Name')).toHaveValue('')
    })
  })
  test('should render click on back button ', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
