import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketCategoryList from './TicketCategoryList'
import { render, screen } from '../../../../test/testUtils'
import {
  mockCategoryList,
  mockDepartments,
} from '../../../../test/data/ticketConfigurationData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketCategoryList />
  </div>
)

describe('Category Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        ticketConfiguration: {
          isLoading: ApiLoadingState.succeeded,
          category: mockCategoryList,
          departments: mockDepartments,
          isLoadingFilterOptions: ApiLoadingState.succeeded,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render Category List component without crashing', () => {
    expect(screen.getByText('Category List')).toBeInTheDocument()
  })
  test('should render Back button', () => {
    const backButton = screen.getByTestId('tc-toggle-back')
    userEvent.click(backButton)
    expect(location.pathname).toBe('/')
  })
})
