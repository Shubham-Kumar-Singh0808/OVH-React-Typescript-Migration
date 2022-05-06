import '@testing-library/jest-dom'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRoleSubFeaturesTable from './UserRoleSubFeaturesTable'
import { render } from '@testing-library/react'
import stateStore from '../../../stateStore'

const childFeaturesArray = {
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
          childFeaturesArray={childFeaturesArray}
          checkBoxHandleChange={jest.fn()}
        />
      </ReduxProvider>,
    )
  })
})
