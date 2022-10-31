import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import RoomListToggle from './RoomListToggle'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const mockRoomList = {
  id: 1,
  roomName: 'Test',
  locationId: 1,
  locationName: 'RayBizTech-1',
  roomStatus: true,
}
describe('Room List without data', () => {
  beforeEach(() => {
    render(<RoomListToggle index={1} room={mockRoomList} />, {
      preloadedState: {
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })

  test('should be able to click update button element', async () => {
    const updateBtnElement = screen.getAllByTestId('btn-update1')
    userEvent.click(updateBtnElement[0])
    expect(updateBtnElement).toBeTruthy()
    await waitFor(() => {
      expect(updateBtnElement[0]).not.toBeChecked()
    })
  })
})
