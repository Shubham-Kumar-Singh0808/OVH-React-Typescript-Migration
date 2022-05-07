import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { ChildFeaturesArrayProps } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRoleSubFeaturesTable from './UserRoleSubFeaturesTable'
import stateStore from '../../../stateStore'

const mockChildFeaturesArray: ChildFeaturesArrayProps = {
  childFeatures: [
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 301,
      name: 'Category',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 308,
      name: 'Credit Card List',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 306,
      name: 'DepartmentWiseList',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: false,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 303,
      name: 'Expense Form',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 309,
      name: 'Payment List',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
  ],
  index: 23,
  subFeatureItemIndex: 0,
}
const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('User Role SubFeatures Table Component Testing', () => {
  test('should render user role sub features table component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRoleSubFeaturesTable
          childFeaturesArray={mockChildFeaturesArray}
          checkBoxHandleChange={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockChildFeaturesArray.childFeatures.forEach((childFeature) => {
      const formCheck = screen.getAllByTestId('form-checkbox')
      expect(screen.getByText(childFeature.name)).toBeInTheDocument()
      expect(formCheck).toHaveLength(
        mockChildFeaturesArray.childFeatures.length,
      )
    })
  })
})
