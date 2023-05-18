import userEvent from '@testing-library/user-event'
import React from 'react'
import UpdateITDeclarationForm from './UpdateITDeclarationForm'
import { act, cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockDeclarationList,
  mockUpdateITFormEmployeeInformation,
} from '../../../../test/data/itDeclarationListData'
import { declareStatement } from '../../ITDeclarationForm/ITDeclarationFormHelpers'
import { mockSections } from '../../../../test/data/itDeclarationFormData'

const toRender = <UpdateITDeclarationForm />

const allSectionsId = `section-column`
const mockForm = mockDeclarationList.itforms[0]
const mockEmployeeDetails = mockUpdateITFormEmployeeInformation

describe('Update IT Declaration Form', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          itDeclarationList: {
            isLoading: ApiLoadingState.succeeded,
            updatedITDeclarationFormDTO: mockForm,
            employeeDetails: mockEmployeeDetails,
            sectionsWithInvests: mockSections,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('rendered data correctly', () => {
      //correct number of sections are rendered
      expect(screen.getAllByTestId(allSectionsId)).toHaveLength(
        mockForm.formSectionsDTOs.length,
      )

      //initial grand total is rendered correctly
      expect(screen.getByTestId('updateIt-grand-total')).toHaveTextContent(
        `Grand Total: ${mockForm.grandTotal.toLocaleString('en-IN')}`,
      )

      //checkbox is rendered
      expect(screen.getByLabelText(declareStatement)).not.toBeChecked()

      //number of sections is correctly rendered in the sections select
      expect(screen.getAllByTestId('section-select-options-true')).toHaveLength(
        mockSections.length + 1,
      ) // checking for true only as same component is used
    })

    test('back button functionality', () => {
      const backButton = screen.getByTestId('updateIT-back-btn')
      expect(backButton).toBeEnabled()
      act(() => {
        userEvent.click(backButton)
      })
    })

    test('update functionality', () => {
      //getting all elements
      const updateButton = screen.getByTestId('updateIT-btn')
      const checkboxButton = screen.getByLabelText(declareStatement)
      const prevEmpSectionSelect = screen.getByTestId(
        'updateIT-section-select-false',
      )
      const prevEmpMoreSectionsButton = screen.getByTestId(
        'moreSectionsBtn-false',
      )
      const mainMoreSectionsButton = screen.getByTestId('moreSectionsBtn-true')
      //inital
      expect(mainMoreSectionsButton).toBeDisabled()
      expect(prevEmpMoreSectionsButton).toBeDisabled()
      expect(checkboxButton).not.toBeChecked()
      expect(updateButton).toBeDisabled()

      // checking the checkbox - update button will be enabled once this is done
      act(() => {
        userEvent.click(checkboxButton)
      })
      expect(checkboxButton).toBeChecked()
      expect(updateButton).toBeEnabled()

      //updating a section in the main income tax act
      const sectionToBeUpdated = mockForm.formSectionsDTOs[3] // two investments under this
      const secondInvestmentInSection = sectionToBeUpdated.formInvestmentDTO[1] //80 C Section - ULIP investment
      const investmentIdentifier = `1-${secondInvestmentInSection.investmentId}-${sectionToBeUpdated.sectionId}` //unique identifer for investment
      const secondInvestmentSelect = screen.getByTestId(
        `investment-select-${investmentIdentifier}`,
      ) // changing the investment here
      expect(secondInvestmentSelect).toHaveValue(
        secondInvestmentInSection.investmentId.toString(),
      )
      const newInvestmentId = mockSections[0].invests[8].investmentId.toString()
      act(() => {
        userEvent.selectOptions(secondInvestmentSelect, [
          newInvestmentId, //section 80C - Children Tution Fees
        ])
      })
      expect(secondInvestmentSelect).toHaveValue(newInvestmentId)
      const finalUniqueIdentifier = `1-${newInvestmentId}-${sectionToBeUpdated.sectionId}`
      const secondInvestmentAmount = screen.getByTestId(
        `investment-amount-${finalUniqueIdentifier}`, // newInvestmentId - as we have changed the value of select
      ) // changing the amount here
      expect(secondInvestmentAmount).toHaveValue(
        secondInvestmentInSection.customAmount.toString(),
      )
      act(() => {
        userEvent.clear(secondInvestmentAmount)
      })
      expect(secondInvestmentAmount).toHaveValue('')
      expect(updateButton).toBeDisabled() //as amount is cleared the update button must be disabled
      act(() => {
        userEvent.type(secondInvestmentAmount, '3444')
      })
      expect(updateButton).toBeEnabled()
      const deleteButtonSecondInvestment = screen.getByTestId(
        // deleting the investment
        `investment-delete-btn-${finalUniqueIdentifier}`,
      )
      expect(deleteButtonSecondInvestment).toBeEnabled()
      act(() => {
        userEvent.click(deleteButtonSecondInvestment)
      })
      expect(
        screen.queryByTestId(`investment-delete-btn-${finalUniqueIdentifier}`),
      ).not.toBeInTheDocument()

      //throwing error for adding new section that already exists in prev emp act
      expect(prevEmpMoreSectionsButton).toBeDisabled()
      act(() => {
        userEvent.selectOptions(prevEmpSectionSelect, [
          mockSections[6].sectionId.toString(),
        ]) //10 exemptionA
      })
      expect(prevEmpMoreSectionsButton).toBeEnabled()
      act(() => {
        userEvent.click(prevEmpMoreSectionsButton)
      })
      expect(screen.getAllByTestId(allSectionsId)).toHaveLength(
        mockForm.formSectionsDTOs.length,
      ) // same length as initial as already exists

      //adding new section
      act(() => {
        userEvent.selectOptions(prevEmpSectionSelect, [
          mockSections[0].sectionId.toString(),
        ])
      })
      userEvent.click(prevEmpMoreSectionsButton)
      expect(screen.getAllByTestId(allSectionsId)).toHaveLength(
        mockForm.formSectionsDTOs.length + 1,
      ) // new section added
      expect(updateButton).toBeDisabled() //empty investment is also added

      //deleting investment from x button - deleting the above added section
      const deleteXButton = screen.getByTestId(
        `updateIT-del-section-${mockSections[0].sectionId}-false`,
      )
      expect(deleteXButton).toBeEnabled()
      act(() => {
        userEvent.click(deleteXButton)
      })
      const modalConfirmButton = screen.getByTestId('modalConfirmBtn')
      expect(modalConfirmButton).toBeEnabled()
      act(() => {
        userEvent.click(modalConfirmButton)
      })
      expect(screen.getAllByTestId(allSectionsId)).toHaveLength(
        mockForm.formSectionsDTOs.length,
      ) // section deleted
      expect(updateButton).toBeEnabled()

      act(() => {
        userEvent.click(updateButton)
      })
    })

    test('add investment functionality', () => {
      const sectionToBeUpdated = mockForm.formSectionsDTOs[3] // one investment under this
      const moreInvestmentBtn = screen.getByTestId(
        `moreInvestmentBtn-true-${sectionToBeUpdated.sectionId}`,
      )
      expect(moreInvestmentBtn).toBeEnabled()
      expect(
        screen.getAllByTestId(`investment-row-${sectionToBeUpdated.sectionId}`),
      ).toHaveLength(sectionToBeUpdated.formInvestmentDTO.length)

      act(() => {
        userEvent.click(moreInvestmentBtn)
      })
      expect(
        screen.getAllByTestId(`investment-row-${sectionToBeUpdated.sectionId}`),
      ).toHaveLength(sectionToBeUpdated.formInvestmentDTO.length + 1)
    })
  })
})
