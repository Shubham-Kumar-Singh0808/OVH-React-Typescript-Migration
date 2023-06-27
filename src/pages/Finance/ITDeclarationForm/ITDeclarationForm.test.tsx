import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ITDeclarationForm from './ITDeclarationForm'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockSections,
  mockInvestments,
} from '../../../test/data/itDeclarationFormData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { initialSubmitITDeclarationForm } from '../../../reducers/Finance/ITDeclarationForm/itDeclarationFormSlice'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITDeclarationForm />
  </div>
)

const oldOrganizationNameId = 'itdec-oldOrganizationName'
const mockActiveCycleDate = '01/02/2023'

describe('IT Declaration Form', () => {
  describe('IT Declaration Form Component Testing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          itDeclarationForm: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            sections: mockSections,
            investments: mockInvestments,
            employeeDetails: {
              activeCyle: mockActiveCycleDate,
              designation: 'Associate Software Engineer',
              employeeId: 2050,
              fullName: 'Testing',
              joinDate: '07/05/2023',
              pan: '8948354',
            },
            grandTotal: 0,
            modal: {
              showModal: false,
              modalDescription: '',
            },
            itDeclarationFormExist: false,
            isSubmitButtonEnabled: false,
            submitITDeclarationForm: initialSubmitITDeclarationForm,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('should render IT Declaration Form component without crashing', () => {
      expect(screen.getByText('IT Declaration Form')).toBeInTheDocument()
    })
    test('previous employer act heading is rendered correctly', () => {
      expect(screen.getByTestId('PrevEmpAct-heading')).toHaveTextContent(
        'Employees Who Joined After 1 February 2023 (Income from Previous Employer ( Joined After 1-February-2023 ))',
      )
    })
    test('complete functionality', async () => {
      const finalSubmitButton = screen.getByTestId('decform-final-submit-btn')
      const agreeCheckbox = screen.getByTestId('ch-agree')
      const mainSectionSelectOldEmp = screen.getByTestId(
        'mainSectionSelect-true',
      )
      const mainSectionSelectNewEmp = screen.getByTestId(
        'mainSectionSelect-false',
      )
      const moreSectionsButton = screen.getByTestId(
        'btn-moreSections-More Sections',
      )
      const addMoreSectionsButton = screen.getByTestId(
        'btn-moreSections-Add More',
      ) // This is in the second form
      const organizationNameInput = screen.getByTestId(oldOrganizationNameId)
      const organizationDatesSelect =
        screen.getAllByPlaceholderText('dd/mm/yyyy')
      const documentUpload = screen.getByTestId(
        'prevEmployerActDocUpload',
      ) as HTMLInputElement

      //initial configuration
      expect(finalSubmitButton).toBeDisabled() //submit button disabled
      expect(mainSectionSelectOldEmp).toHaveValue('') //main sections select option set to default
      expect(moreSectionsButton).toBeDisabled() //more sections button is disabled
      expect(addMoreSectionsButton).toBeDisabled() //add more button in second form is disabled
      expect(agreeCheckbox).not.toBeChecked() //the agree checkbox is un checked
      expect(organizationNameInput).toHaveValue('') //organization name default value

      act(() => {
        userEvent.click(agreeCheckbox)
      })
      expect(agreeCheckbox).toBeChecked() //agree button is checked
      expect(finalSubmitButton).toBeDisabled() //the button is still disabled

      act(() => {
        userEvent.selectOptions(mainSectionSelectOldEmp, [
          mockSections[0].sectionId.toString(),
        ])
      }) //selecting a section
      expect(mainSectionSelectOldEmp).toHaveValue(
        mockSections[0]?.sectionId.toString(),
      )
      expect(moreSectionsButton).toBeEnabled() //more section button enabled

      act(() => {
        userEvent.click(moreSectionsButton) //adding the section
      })
      expect(screen.queryByTestId('1-true')).toBeInTheDocument() //the section box is added

      const section0investmentBox1Select = screen.getByTestId(
        'form-select-investment0-true',
      )
      const section0customAmount1Input = screen.getByTestId(
        'custom-amount0-true',
      )
      act(() => {
        userEvent.selectOptions(section0investmentBox1Select, [
          mockSections[0]?.invests[0]?.investmentId.toString(),
        ]) //selecting an investment
      })
      act(() => {
        userEvent.type(section0customAmount1Input, '9879')
      })
      expect(finalSubmitButton).toBeEnabled() //as investment is entered and checkbox checked, button is enabled
      // expect(section0customAmount1Input).toHaveValue('9879')

      act(() => {
        userEvent.type(organizationNameInput, 'test organization') //entering old organization name
      })
      // expect(organizationNameInput).toHaveValue('test organization')

      //filling out the from Date
      userEvent.click(organizationDatesSelect[0])
      await waitFor(() => {
        fireEvent.change(organizationDatesSelect[0], {
          target: { value: '08/05/2022' },
        })
      })
      // expect(organizationDatesSelect[0]).toHaveValue('05/08/2022')

      //filling out to date
      userEvent.click(organizationDatesSelect[1])
      await waitFor(() => {
        fireEvent.change(organizationDatesSelect[1], {
          target: { value: '08/05/2023' },
        })
      })
      // expect(organizationDatesSelect[1]).toHaveValue('05/08/2023')

      const fileToUpload = new File(['(⌐□_□)'], 'test.pdf', {
        type: 'application/pdf',
      })
      await waitFor(() => {
        act(() => {
          userEvent.upload(documentUpload, fileToUpload)
        })
      })
      expect(documentUpload).toBeTruthy()

      // act(() => {
      //   userEvent.selectOptions(mainSectionSelectNewEmp, [
      //     mockSections[1].sectionId.toString(),
      //   ])
      // })
      // expect(mainSectionSelectNewEmp).toHaveValue(
      //   mockSections[0].sectionId.toString(),
      // )

      expect(finalSubmitButton).toBeEnabled()
      act(() => {
        userEvent.click(finalSubmitButton)
      })
    }, 15000)
  })

  describe('No Active Cycle Testing', () => {
    beforeEach(() => {
      render(<ITDeclarationForm />, {
        preloadedState: {
          itDeclarationForm: {
            itDeclarationForm: {
              isLoading: ApiLoadingState.failed,
              error: 406,
              sections: mockSections,
              investments: mockInvestments,
              employeeDetails: {
                activeCyle: mockActiveCycleDate,
                designation: 'Associate Software Engineer',
                employeeId: 2050,
                fullName: 'Testing',
                joinDate: '07/05/2023',
                pan: '8948354',
              },
              grandTotal: 0,
              modal: {
                showModal: false,
                modalDescription: '',
              },
              itDeclarationFormExist: false,
              isSubmitButtonEnabled: false,
              submitITDeclarationForm: initialSubmitITDeclarationForm,
            },
            userAccessToFeatures: {
              userAccessToFeatures: mockUserAccessToFeaturesData,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('no active cycle error displayed', () => {
      expect(
        screen.getByText('No Active Cycle Found to add IT Declaration Form'),
      ).toBeVisible()
    })
  })
})
