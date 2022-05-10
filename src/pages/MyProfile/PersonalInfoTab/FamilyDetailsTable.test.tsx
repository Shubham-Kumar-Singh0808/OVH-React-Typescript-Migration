import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import FamilyDetailsTable from './FamilyDetailsTable'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { mockFamilyTableDetails } from '../../../test/data/familyTableData'
import stateStore from '../../../stateStore'
import personalInfoTabSlice from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('FamilyDetails Table Testing', () => {
  test('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = personalInfoTabSlice(initialState, action)
    expect(result).toEqual({})
  })
})
