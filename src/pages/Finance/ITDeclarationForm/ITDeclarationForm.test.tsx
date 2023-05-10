import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ITDeclarationForm from './ITDeclarationForm'
import { act, cleanup, render, screen } from '../../../test/testUtils'
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

describe('IT Declaration Form Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        itDeclarationForm: {
          isLoading: ApiLoadingState.succeeded,
          sections: mockSections,
          investments: mockInvestments,
          employeeDetails: {
            activeCycle: 'test',
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
  test('complete functionality', () => {
    const finalSubmitButton = screen.getByTestId('decform-final-submit-btn')
    const mainSectionSelect = screen.getByTestId('mainSectionSelect-true')
    const moreSectionsButton = screen.getByTestId(
      'btn-moreSections-More Sections',
    )

    expect(finalSubmitButton).toBeDisabled()
    expect(mainSectionSelect).toHaveValue('')
    expect(moreSectionsButton).toBeDisabled()

    act(() => {
      userEvent.selectOptions(mainSectionSelect, [
        mockSections[0].sectionId.toString(),
      ])
    })
    expect(mainSectionSelect).toHaveValue(mockSections[0].sectionId.toString())
    expect(moreSectionsButton).toBeEnabled()

    act(() => {
      userEvent.click(moreSectionsButton)
    })
  })
})
