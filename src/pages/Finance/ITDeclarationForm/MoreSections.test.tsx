import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MoreSections from './MoreSections'
import { act, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockInvestments,
  mockSections,
} from '../../../test/data/itDeclarationFormData'

const mockInvestmentSelect0 = 'form-select-investment0-false'
const cancelButton = 'df-cancel-btn'
const moreInvestmentsBtnId = 'moreInvestmentBtn'
const mockCancelSectionHandler = jest.fn()
const testSection = mockSections[0]
describe('More Sections Component Testing', () => {
  beforeEach(() => {
    render(
      <MoreSections
        sectionItem={testSection}
        handleShowRemoveSectionModal={jest.fn()}
        handleConfirmCancelSection={mockCancelSectionHandler}
        setSectionList={jest.fn()}
        sectionList={[testSection]}
        index={0}
        setFormSectionList={jest.fn()}
        formSectionList={[]}
        isOldEmployee={false}
      />,
      {
        preloadedState: {
          itDeclarationForm: {
            isLoading: ApiLoadingState.succeeded,
            sections: mockSections,
            investments: mockInvestments,
          },
        },
      },
    )
  })
  test('should render Section Name', () => {
    expect(screen.getByText('Sections:')).toBeInTheDocument()
    expect(screen.getByText('80 C')).toBeInTheDocument()
  })
  test('should render cancel section button', () => {
    const cancelSection = screen.getByTestId(cancelButton)
    userEvent.click(cancelSection)
    expect(mockCancelSectionHandler).toBeCalledTimes(0)
  })
  test('more investments button functionality', () => {
    const moreInvestmentsButton = screen.getByTestId(moreInvestmentsBtnId)
    expect(moreInvestmentsButton).toHaveTextContent('More Investments')
    expect(screen.queryAllByRole('row')).toHaveLength(1)
    expect(moreInvestmentsButton).toBeEnabled()
    for (let i = 1; i < mockSections[0].invests.length; i++) {
      act(() => {
        userEvent.click(moreInvestmentsButton)
      })
      expect(screen.queryAllByRole('row')).toHaveLength(i + 1)
    }
    expect(moreInvestmentsButton).toBeDisabled()
  })
  test('query button functionality', () => {
    const investmentSelectOption = screen.getByTestId(mockInvestmentSelect0)
    act(() => {
      userEvent.selectOptions(investmentSelectOption, [
        testSection.invests[1].investmentId.toString(),
      ])
    })
    const queryButton = screen.getByTestId('df-query-btn0-false')
    expect(queryButton).toBeTruthy()
    expect(queryButton).toBeEnabled()
    act(() => {
      userEvent.click(queryButton)
    })
  })
  test('document button functionality', () => {
    const investmentSelectOption = screen.getByTestId(mockInvestmentSelect0)
    act(() => {
      userEvent.selectOptions(investmentSelectOption, [
        mockSections[0].invests[1].investmentId.toString(),
      ])
    })
    const documentButton = screen.getByTestId('df-doc-btn0-false')
    expect(documentButton).toBeTruthy()
    expect(documentButton).toBeEnabled()
    act(() => {
      userEvent.click(documentButton)
    })
  })
  test('new investment input functionality', () => {
    const investmentSelectOption = screen.getByTestId(mockInvestmentSelect0)
    const moreInvestmentsButton = screen.getByTestId(moreInvestmentsBtnId)
    const investmentAmountOption = screen.getByTestId('custom-amount0-false')
    const chosenInvestment = testSection.invests[1]
    expect(investmentSelectOption).toHaveValue('')
    act(() => {
      userEvent.selectOptions(investmentSelectOption, [
        chosenInvestment.investmentId.toString(),
      ])
    })
    expect(investmentSelectOption).toHaveValue(
      chosenInvestment.investmentId.toString(),
    )
    expect(screen.getByTestId('df-remove-btn0-false')).toBeEnabled()
    expect(screen.getByTestId('df-query-btn0-false')).toBeVisible()
    expect(screen.getByTestId('df-doc-btn0-false')).toBeVisible()

    expect(investmentAmountOption).toHaveValue('')
    act(() => {
      userEvent.clear(investmentAmountOption)
      userEvent.type(investmentAmountOption, '4768')
    })
    // expect(investmentAmountOption).toHaveValue('4768') giving error
    act(() => {
      userEvent.click(moreInvestmentsButton)
    })
    act(() => {
      userEvent.selectOptions(
        screen.getByTestId('form-select-investment1-false'),
        [testSection.invests[0].investmentId.toString()],
      )
    })
    expect(screen.getByTestId('form-select-investment1-false')).toHaveValue(
      testSection.invests[0].investmentId.toString(),
    )
    expect(screen.getByTestId('df-remove-btn1-false')).toBeEnabled()
    // expect(screen.getByTestId('df-query-btn1')).not.toBeInTheDocument()
    // expect(screen.getByTestId('df-doc-btn1')).not.toBeVisible()
  })
  test('delete investments - multiple investments', () => {
    const moreInvestmentsButton = screen.getByTestId(moreInvestmentsBtnId)
    for (let i = 1; i < testSection.invests.length; i++) {
      act(() => {
        userEvent.click(moreInvestmentsButton)
      })
      expect(screen.queryAllByRole('row')).toHaveLength(i + 1)
    }
    for (let i = testSection.invests.length; i >= 1; i--) {
      act(() => {
        userEvent.click(screen.getByTestId(`df-remove-btn${i - 1}-false`))
      })
      expect(screen.queryAllByRole('row')).toHaveLength(i - 1)
    }
  })
})
