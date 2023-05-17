import React from 'react'
import userEvent from '@testing-library/user-event'
import ITSections from './ITSections'
import { act, cleanup, render, screen } from '../../../../test/testUtils'
import { mockDeclarationList } from '../../../../test/data/itDeclarationListData'
import { mockSections } from '../../../../test/data/itDeclarationFormData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const mockForm = mockDeclarationList.itforms[1]
const mockCurrentSection = mockForm.formSectionsDTOs[1]
const mockIsOldEmployee = true
const toRender = (
  <ITSections
    currentSection={mockCurrentSection}
    isOldEmployee={mockIsOldEmployee}
    sectionsWithInvests={mockSections}
  />
)

describe('IT Sections - Update IT Form', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          itDeclarationList: {
            isLoading: ApiLoadingState.succeeded,
            sections: mockSections,
            updatedITDeclarationFormDTO: {
              formSectionDTOs: [mockCurrentSection],
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('static data rendered', () => {
      //section name is rendered
      expect(
        screen.getByTestId(
          `sectionName-${mockIsOldEmployee}-${mockCurrentSection.sectionId}`,
        ),
      ).toHaveTextContent(`${mockCurrentSection.sectionName}`)

      //more investment button is rendered and disabled here as all investments are entered
      const moreInvestmentsButton = screen.getByTestId(
        `moreInvestmentBtn-${mockIsOldEmployee}-${mockCurrentSection.sectionId}`,
      )
      expect(moreInvestmentsButton).toBeDisabled()
      expect(moreInvestmentsButton).toHaveTextContent('More Investments')

      //max limit is rendered
      expect(
        screen.getByTestId(
          `maxLimitSection-${mockIsOldEmployee}-${mockCurrentSection.sectionId}`,
        ),
      ).toHaveTextContent(mockCurrentSection.maxLimit.toLocaleString('en-IN'))
    })
  })
})
