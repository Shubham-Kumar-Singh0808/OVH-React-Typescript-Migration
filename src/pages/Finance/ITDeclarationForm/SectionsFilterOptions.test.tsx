import '@testing-library/jest-dom'
import React from 'react'
import SectionsFilterOptions from './SectionsFilterOptions'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockSections } from '../../../test/data/investmentCheckListData'

describe('Sections Filter Options Testing', () => {
  beforeEach(() => {
    render(<SectionsFilterOptions />, {
      preloadedState: {
        itDeclarationForm: {
          isLoading: ApiLoadingState.succeeded,
          sections: mockSections,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  //   test('should render Sections Dropdown without crashing', () => {

  //   })
})
