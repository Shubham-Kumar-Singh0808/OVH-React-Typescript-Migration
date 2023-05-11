import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import SectionsFilterOptions from './SectionsFilterOptions'
import MoreSections from './MoreSections'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockSections } from '../../../test/data/investmentCheckListData'

const formSelectOption = 'mainSectionSelect-true'
const moreSectionsButton = 'btn-moreSections-Add More'
describe('Sections Filter Options Testing', () => {
  beforeEach(() => {
    render(
      <SectionsFilterOptions
        isOldEmployee={true}
        showAsterix={true}
        moreSectionButtonText="Add More"
      />,
      {
        preloadedState: {
          itDeclarationForm: {
            isLoading: ApiLoadingState.succeeded,
            sections: mockSections,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )
  })
  test('should render Sections Dropdown without crashing', () => {
    const selectSection = screen.getByTestId(formSelectOption)
    userEvent.selectOptions(screen.getByTestId(formSelectOption), ['80 C'])
    expect(selectSection).toBeTruthy()
  })
  test('should render More Sections Button as disabled initially', () => {
    const moreSectionsBtn = screen.getByTestId(moreSectionsButton)
    expect(moreSectionsBtn).toBeDisabled()
  })
  test('should enable Sections Button when section is selected', () => {
    userEvent.selectOptions(screen.getByTestId(formSelectOption), ['80 D'])
    const moreSectionsBtnEl = screen.getByTestId(moreSectionsButton)
    expect(moreSectionsBtnEl).toBeEnabled()
  })
  test('should render More Sections Component upon clicking More Sections Button', () => {
    userEvent.selectOptions(screen.getByTestId(formSelectOption), ['80 D'])
    const moreSectionsBtnEle = screen.getByTestId(moreSectionsButton)
    userEvent.click(moreSectionsBtnEle)
    expect(
      render(
        <MoreSections
          sectionItem={{
            sectionId: 0,
            sectionName: '',
            sectionLimit: 0,
            invests: [],
          }}
          handleShowRemoveSectionModal={jest.fn()}
          handleConfirmCancelSection={jest.fn()}
          setSectionList={jest.fn()}
          sectionList={[]}
          index={0}
          setFormSectionList={jest.fn()}
          formSectionList={[]}
          isOldEmployee={true}
        />,
      ),
    )
  })
})
