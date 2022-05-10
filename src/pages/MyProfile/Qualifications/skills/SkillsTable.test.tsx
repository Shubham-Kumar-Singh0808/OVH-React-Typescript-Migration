import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import SkillsTable from './SkillsTable'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../../stateStore'
import employeeQualificationsSlice from '../../../../reducers/Qualifications/qualificationSlice'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Skills Table Testing', () => {
  test('should render No Records Found if skills table is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <SkillsTable />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records Found')).toBeInTheDocument()
    })
  })
  test('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeQualificationsSlice(initialState, action)
    expect(result).toEqual({})
  })
})
