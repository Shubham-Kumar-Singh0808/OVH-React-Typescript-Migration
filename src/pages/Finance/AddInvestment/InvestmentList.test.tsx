import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import InvestmentList from './InvestmentList'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockSections,
  mockInvestments,
} from '../../../test/data/investmentCheckListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const history = createMemoryHistory()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <InvestmentList />
    </Router>
  </div>
)
const addSectionButtonElement = 'add-section-btn'
describe('IT Declaration List Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        itDeclarationList: {
          isLoading: ApiLoadingState.succeeded,
          sections: mockSections,
          investments: mockInvestments,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render InvestmentList Page Title', () => {
    expect(screen.getByText('Add Investment')).toBeInTheDocument()
  })
  test('should redirect to addSection page upon clicking AddSection button', () => {
    const addSectionButton = screen.getByTestId(addSectionButtonElement)
    userEvent.click(addSectionButton)
    expect(history.location.pathname).toBe('/addSection')
  })
  test('should redirect to /itDeclarationList page upon clicking back button', () => {
    const backButton = screen.getByTestId('back-button')
    userEvent.click(backButton)
    expect(history.location.pathname).toBe('/itDeclarationList')
  })
})
