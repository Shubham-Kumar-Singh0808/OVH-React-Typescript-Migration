import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import ITInvestmentTableRow from './ITInvestmentTableRow'
import { mockDeclarationList } from '../../../../test/data/itDeclarationListData'
import { mockSections } from '../../../../test/data/itDeclarationFormData'
import { getSectionById } from '../ITDeclarationListHelpers'

const mockSection = mockDeclarationList.itforms[0].formSectionsDTOs[3]
const mockInvestment = mockSection.formInvestmentDTO[0]
const mockInvestmentIndex = 2
const mockInvestmentChangeHandler = jest.fn()
const mockContentButtonHandler = jest.fn()
const mockAmountChangeHandler = jest.fn()
const mockDeleteInvestmentButtonHandler = jest.fn()
const toRender = (
  <ITInvestmentTableRow
    investment={mockInvestment}
    currentSectionId={mockSection.sectionId}
    sectionsWithInvests={mockSections}
    investmentIndex={mockInvestmentIndex}
    investmentChangeHandler={mockInvestmentChangeHandler}
    contentButtonHandler={mockContentButtonHandler}
    amountChangeHandler={mockAmountChangeHandler}
    deleteInvestmentButtonHandler={mockDeleteInvestmentButtonHandler}
  />
)

const uniqueIdentifier = `${mockInvestmentIndex}-${mockInvestment.investmentId}-${mockSection.sectionId}`

describe('IT Investment Table - Update IT Form', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender)
    })
    afterEach(cleanup)
    screen.debug()

    test('all data is rendered appropriatly', () => {
      // the serial number is correctly rendered
      expect(
        screen.getByTestId(`investment-serial-${uniqueIdentifier}`),
      ).toHaveTextContent('3')

      // the investment select option has correct rendered value
      expect(
        screen.getByTestId(`investment-select-${uniqueIdentifier}`),
      ).toHaveValue(mockInvestment.investmentId.toString())

      //the number of options in investment table are rendered correctly
      expect(
        screen.getAllByTestId(`investment-select-options-${uniqueIdentifier}`),
      ).toHaveLength(
        getSectionById(mockSections, mockSection.sectionId).invests.length + 1,
      )

      // the investment amount is rendered correctly
      expect(
        screen.getByTestId(`investment-amount-${uniqueIdentifier}`),
      ).toHaveValue(mockInvestment.customAmount.toString())

      // delete investment button is enabled
      expect(
        screen.getByTestId(`investment-delete-btn-${uniqueIdentifier}`),
      ).toBeEnabled()

      // query button is visible for this investment
      const queryButton = screen.getByTestId(
        `investment-query-btn-${uniqueIdentifier}`,
      )
      expect(queryButton).toBeVisible()
      expect(queryButton).toBeEnabled()

      // document required button is visible
      const documentButton = screen.getByTestId(
        `investment-doc-btn-${uniqueIdentifier}`,
      )
      expect(documentButton).toBeVisible()
      expect(documentButton).toBeEnabled()
    })
  })
})
