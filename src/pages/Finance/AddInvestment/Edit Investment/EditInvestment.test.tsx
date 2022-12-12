import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EditInvestment from './EditInvestment'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockSections,
  mockInvestments,
} from '../../../../test/data/investmentCheckListData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import InvestmentList from '../InvestmentList'

const sectionNameInput = 'editInv-section-name'
const investNameInput = 'editInv-investment-name'
const reqDocumentsInput = 'editInv-reqDocs'
const updateButtonElement = 'editInv-update-btn'
const backButtonElement = 'editInv-back-btn'
const investLimitElement = 'editInv-investment-limit'
const yesBtnElement = 'editInv-documentsReqYes'

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
describe('Add New Investment Component Testing', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <EditInvestment
          editInvestment={{
            investmentId: 1,
            investmentName: 'LIC',
            maxLimit: '0',
            description: 'testA',
            requiredDocs: 'Test Documents',
            sectionId: 1,
            sectionName: '80 C',
          }}
        />
      </Router>,
      {
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
      },
    )
  })
  afterEach(cleanup)
  test('should render section name Input', () => {
    expect(screen.getByTestId(sectionNameInput)).toBeDisabled()
  })
  test('should render investment name Input', () => {
    expect(screen.getByTestId(investNameInput)).toBeTruthy()
  })
  test('should render investment Limit Input', () => {
    expect(screen.getByTestId(investLimitElement)).toBeTruthy()
  })
  it('should render Yes and No Radio Buttons', () => {
    expect(screen.getByRole('radio', { name: 'Yes' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'No' })).toBeInTheDocument()
  })
  it('should render Update button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Update' })).toBeEnabled()
  })
  it('should render Back button in the Component', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  it('should redirect to addInvestment upon clicking back button from edit investment screen', () => {
    const backButtonEl = screen.getByTestId(backButtonElement)
    userEvent.click(backButtonEl)
    expect(render(toRender))
  })
  test('should disable update button, when mandatory fields are not entered', async () => {
    const sectionNameElement = screen.getByTestId(sectionNameInput)
    expect(sectionNameElement).toHaveValue('1')

    const investmentNameElement = screen.getByTestId(investNameInput)
    expect(investmentNameElement).toHaveValue('LIC')
    userEvent.clear(investmentNameElement)
    expect(investmentNameElement).toHaveValue('')

    const maxLimit = screen.getByTestId(investLimitElement)
    expect(maxLimit).toHaveValue('0')

    const updateButtonEl = screen.getByTestId(updateButtonElement)
    await waitFor(() => {
      expect(updateButtonEl).toBeDisabled()
    })
  })

  test('should Update the details when user enters valid data and clicks on Update Button', async () => {
    const sectionNameElem = screen.getByTestId(sectionNameInput)
    userEvent.selectOptions(sectionNameElem, ['80 C'])
    expect(sectionNameElem).toHaveValue('1')

    const investmentNameElem = screen.getByTestId(investNameInput)
    expect(investmentNameElem).toHaveValue('LIC')

    const checkReqDocsYes = screen.getByTestId(yesBtnElement)
    expect(checkReqDocsYes).toBeChecked()

    const maxLimitEle = screen.getByTestId(investLimitElement)
    expect(maxLimitEle).toHaveValue('0')

    const updateButtonElem = screen.getByTestId(updateButtonElement)
    expect(updateButtonElem).toBeEnabled()
    await waitFor(() => {
      userEvent.click(updateButtonElem)
    })
  })
})
