import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Notifications from './Notifications'
import { render, screen, waitFor } from '../../test/testUtils'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { UpdateList } from '../../types/Notifications/notificationTypes'
import { mockNotificationAlertsData } from '../../test/data/notificationsData'

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

describe('Notifications with data', () => {
  beforeEach(() => {
    render(<Notifications />, {
      preloadedState: {
        notification: {
          notificationAlerts: mockNotificationAlertsData.alertsList,
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          updateAlertsList: {} as UpdateList,
        },
      },
    })
  })
  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
})
