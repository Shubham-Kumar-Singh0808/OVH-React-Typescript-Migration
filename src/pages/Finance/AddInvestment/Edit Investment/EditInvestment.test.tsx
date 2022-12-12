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
import AddNewInvestment from '../AddNewInvestment'

const sectionNameInput = 'editInv-section-name'
const investNameInput = 'editInv-investment-name'
const reqDocumentsInput = 'editInv-reqDocs'
const updateButtonElement = 'editInv-update-btn'
const backButtonElement = 'editInv-back-btn'
const clearButtonElement = 'addInv-clear-btn'
const investLimitElement = 'editInv-investment-limit'
const yesBtnElement = 'editInv-documentsReqYes'
const noBtnElement = 'editInv-documentsReqNo'
const history = createMemoryHistory()
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
            requiredDocs: 'Document of Payment of LIC Premium',
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
    expect(screen.getByTestId(sectionNameInput)).toBeTruthy()
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
    expect(
      render(
        <AddNewInvestment
          selectedSectionId={''}
          setSelectedSectionId={jest.fn()}
        />,
      ),
    )
  })
  test('should enable add button, when all mandatory fields are entered', async () => {
    const sectionNameElement = screen.getByTestId(sectionNameInput)
    userEvent.selectOptions(sectionNameElement, ['Test'])
    expect(sectionNameElement).toHaveValue('10')

    const investmentNameEl = screen.getByTestId(investNameInput)
    userEvent.type(investmentNameEl, 'Test Investment Name1')
    expect(investmentNameEl).toHaveValue('Test Investment Name1')

    const maxLimit = screen.getByTestId(investLimitElement)
    userEvent.type(maxLimit, '200000')
    expect(maxLimit).toHaveValue('200000')

    const updateButtonEl = screen.getByTestId(updateButtonElement)
    await waitFor(() => {
      expect(updateButtonEl).toBeEnabled()
    })
  })

  test('should Update the details when user enters valid data and clicks on Update Button', async () => {
    const sectionNameElem = screen.getByTestId(sectionNameInput)
    userEvent.selectOptions(sectionNameElem, ['Test'])
    expect(sectionNameElem).toHaveValue('10')

    const investmentNameElem = screen.getByTestId(investNameInput)
    userEvent.type(investmentNameElem, 'Test Investment Name22')
    expect(investmentNameElem).toHaveValue('Test Investment Name22')

    const maxLimitEle = screen.getByTestId(investLimitElement)
    userEvent.type(maxLimitEle, '200000')
    expect(maxLimitEle).toHaveValue('200000')

    const updateButtonElem = screen.getByTestId(updateButtonElement)
    expect(updateButtonElem).toBeEnabled()
    await waitFor(() => {
      userEvent.click(updateButtonElem)
    })
  })
})
