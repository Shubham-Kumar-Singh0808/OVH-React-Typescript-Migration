import sidebarMenuSliceReducer, {
  setSidebarMenuSliceHandler,
} from './sidebarMenuSlice'

import { forEachChild } from 'typescript'
import { mockSidebarData } from '../../test/data/sidebaeMenuData'
import { waitFor } from '@testing-library/react'

describe('Sidebar Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = sidebarMenuSliceReducer(initialState, action)
    expect(result).toEqual({})
  })
})
