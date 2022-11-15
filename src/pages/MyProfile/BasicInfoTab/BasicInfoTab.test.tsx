import '@testing-library/jest-dom'
import React from 'react'
import BasicInfoTab from './BasicInfoTab'
import { getEmployeeGeneralInformationThunk } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import stateStore from '../../../stateStore'
import { queryByAttribute, render, screen } from '../../../test/testUtils'
import { mockLoggedInEmployeeData } from '../../../test/data/myProfileData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <BasicInfoTab />
  </div>
)

describe('Basic Info Tab Testing', () => {
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation('1978'),
    )
  })
  test('should render basic info tab component with out crashing', async () => {
    render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata koll',
            role: 'admin',
          },
        },
        getLoggedInEmployeeData: {
          generalInformation: mockLoggedInEmployeeData,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation('1978'),
    )
    expect(screen.getByText('Employee ID:')).toBeInTheDocument()
    expect(screen.getByText('1979')).toBeInTheDocument()
  })
  test('should render all field', () => {
    const getById = queryByAttribute.bind(null, 'id')

    const component = render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata kolla',
            role: 'admin',
          },
        },
        getLoggedInEmployeeData: {
          generalInformation: mockLoggedInEmployeeData,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
    const officialBday = getById(
      component.container,
      'employeeOfficialBirthday',
    )
    expect(officialBday).toBeTruthy()

    const realBirthday = getById(component.container, 'employeeRealBirthday')
    expect(realBirthday).toBeTruthy()
  })
  test('should render a file upload field', () => {
    const getById = queryByAttribute.bind(null, 'id')

    const component = render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata kolla',
            role: 'admin',
          },
        },
        getLoggedInEmployeeData: {
          generalInformation: mockLoggedInEmployeeData,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
    const uploadField = getById(component.container, 'uploadRBTCV')

    expect(uploadField).toBeTruthy()
  })
})
