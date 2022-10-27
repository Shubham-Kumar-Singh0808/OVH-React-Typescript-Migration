import '@testing-library/jest-dom'
import React from 'react'
import PersonalInfoTab from './PersonalInfoTab'
import { cleanup, render, screen } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import stateStore from '../../../stateStore'
import { getEmployeeGeneralInformationThunk } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'

describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<PersonalInfoTab handleActiveTab={jest.fn()} />, {
      preloadedState: {
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Personal info tab component with out crashing', async () => {
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation('1985'),
    )
    expect(screen.getByText('Work:')).toBeInTheDocument()
    expect(screen.getByText('Home:')).toBeInTheDocument()
  })
  test('should render PersonalInfoTab button as disabled initially', () => {
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
  it('should display the correct number of options', () => {
    expect(screen.getAllByRole('option').length).toBe(11)
  })
})
