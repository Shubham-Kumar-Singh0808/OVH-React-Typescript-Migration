import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import FamilyDetailsTable from './FamilyDetailsTable'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import personalInfoTabSlice from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const mockUseDispatchValue = 1984
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))

describe('FamilyDetails Table Testing', () => {
  test('should render', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <FamilyDetailsTable editButtonHandler={jest.fn()} />
      </ReduxProvider>,
    )
    expect(screen.getByText('Relationship')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })
  // test('should render no data to display if FamilyDetailsTable is empty', async () => {
  //   render(
  //     <ReduxProvider reduxStore={stateStore}>
  //       <FamilyDetailsTable editButtonHandler={jest.fn()} />
  //     </ReduxProvider>,
  //   )
  //   await waitFor(() => {
  //     expect(screen.getByText('No Records found')).toBeInTheDocument()
  //   })
  // })
})
