import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddNewInvestment from './AddNewInvestment'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockSections,
  mockInvestments,
} from '../../../test/data/investmentCheckListData'

const sectionNameInput = 'select-section-name'
const investNameInput = 'investment-name'
const reqDocumentsInput = 'required-documents'
const addButtonElement = 'addInv-add-btn'
const clearButtonElement = 'addInv-clear-btn'
const investLimitElement = 'investment-limit'
const yesBtnElement = 'documentsReqYes'
const noBtnElement = 'documentsReqNo'

describe('Add New Investment Component Testing', () => {
  beforeEach(() => {
    render(
      <AddNewInvestment
        selectedSectionId={'10'}
        setSelectedSectionId={jest.fn()}
      />,
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
  it('should render Add button as disabled and Clear Button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
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

    const addButtonEl = screen.getByTestId(addButtonElement)
    await waitFor(() => {
      expect(addButtonEl).toBeEnabled()
    })
  })

  test('should clear input fields entered by the user, upon clicking clear button', async () => {
    const sectionNameEle = screen.getByTestId(sectionNameInput)
    userEvent.selectOptions(sectionNameEle, ['Test'])
    expect(sectionNameEle).toHaveValue('10')

    const investmentNameEle = screen.getByTestId(investNameInput)
    userEvent.type(investmentNameEle, 'Test Investment Name2')
    expect(investmentNameEle).toHaveValue('Test Investment Name2')

    const maxLimitEl = screen.getByTestId(investLimitElement)
    userEvent.type(maxLimitEl, '100000')
    expect(maxLimitEl).toHaveValue('100000')
    const clearButtonEl = screen.getByTestId(clearButtonElement)
    userEvent.click(clearButtonEl)
    await waitFor(() => {
      expect(maxLimitEl).toHaveValue('')
      userEvent.selectOptions(sectionNameEle, ['Select Section'])
      expect(investmentNameEle).toHaveValue('')
    })
  })

  test('should save the details when user enters valid data and clicks on Add Button', async () => {
    const sectionNameElem = screen.getByTestId(sectionNameInput)
    userEvent.selectOptions(sectionNameElem, ['Test'])
    expect(sectionNameElem).toHaveValue('10')

    const investmentNameElem = screen.getByTestId(investNameInput)
    userEvent.type(investmentNameElem, 'Test Investment Name22')
    expect(investmentNameElem).toHaveValue('Test Investment Name22')

    const maxLimitEle = screen.getByTestId(investLimitElement)
    userEvent.type(maxLimitEle, '200000')
    expect(maxLimitEle).toHaveValue('200000')

    const yesButtonEl = screen.getByTestId(yesBtnElement)
    userEvent.click(yesButtonEl)

    const reqDocsEle = screen.getByTestId(reqDocumentsInput)
    userEvent.type(reqDocsEle, 'test doc1, test doc2')
    expect(reqDocsEle).toHaveValue('test doc1, test doc2')

    const addButtonElem = screen.getByTestId(addButtonElement)
    expect(addButtonElem).toBeEnabled()
    await waitFor(() => {
      userEvent.click(addButtonElem)
    })
  })
})
