import '@testing-library/jest-dom'
import React from 'react'
import Notifications from './Notifications'
import { render, screen } from '../../test/testUtils'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { UpdateList } from '../../types/Notifications/notificationTypes'

describe('Notifications without data', () => {
  beforeEach(() => {
    render(<Notifications />, {
      preloadedState: {
        notification: {
          notificationAlerts: [],
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          updateAlertsList: {} as UpdateList,
        },
      },
    })
  })
  test('should be able to render  Notifications  Title', () => {
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })
})
