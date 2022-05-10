import employeeGeneralInformationSlice, {
  setEmployeeGeneralInformation,
} from './generalInformationSlice'

import { forEachChild } from 'typescript'
import { waitFor } from '@testing-library/react'

describe('General Information Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeGeneralInformationSlice(initialState, action)
    expect(result).toEqual({})
  })
})
