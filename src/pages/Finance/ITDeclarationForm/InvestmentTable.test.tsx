import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import InvestmentTable from './InvestmentTable'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockSections } from '../../../test/data/itDeclarationFormData'
import { mockInvestments } from '../../../test/data/investmentCheckListData'

const selectInvest = 'form-select-investment0'
const customAmountInput = 'custom-amount'
describe('Investment Table Component Testing', () => {
  beforeEach(() => {
    render(
      <InvestmentTable
        setShowSubTotalAmount={jest.fn()}
        handleClickRemoveInvestment={jest.fn()}
        currentSec={{
          id: 1,
          investmentId: '1',
          customAmount: '100000',
          requiredDocs: '',
          description: 'test',
        }}
        secIndex={0}
        sectionList={mockSections}
        index={0}
        onChangeCustomAmount={jest.fn()}
        onChangeInvestment={jest.fn()}
        investmentButtonHandler={jest.fn()}
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
  afterEach(cleanup)
  test('should render the "Investment" table ', () => {
    const table = screen.getByRole('row')
    expect(table).toBeTruthy()
  })
  test('should render the select Investment Dropdown', () => {
    userEvent.selectOptions(screen.getByTestId(selectInvest), ['1'])
  })
  test('should render the Custom Amount Input', () => {
    const customAmountElement = screen.getByTestId(customAmountInput)
    expect(customAmountElement).toHaveValue('100000')
  })
  test('should render the remove Investment button', () => {
    userEvent.selectOptions(screen.getByTestId(selectInvest), '1')
    const removeInvestBtn = screen.getByTestId('df-remove-btn0')
    userEvent.click(removeInvestBtn)
    expect(removeInvestBtn).toBeTruthy()
  })
  test('should render the query button', () => {
    userEvent.selectOptions(screen.getByTestId(selectInvest), '1')
    const queryBtn = screen.getByTestId('df-query-btn0')
    userEvent.click(queryBtn)
    expect(queryBtn).toBeTruthy()
  })
})
