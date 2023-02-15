import { JSXElementConstructor, ReactElement } from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../stateStore'

type AppState = {
  sidebarShow: boolean
  sidebarUnfoldable: boolean
  asideShow: boolean
  theme: string
  toast:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | undefined
  reRenderMenu: boolean
  isSessionExpired: boolean
  persistCurrentPage: number
}

const initialState: AppState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  asideShow: false,
  theme: 'default',
  toast: undefined,
  reRenderMenu: true,
  isSessionExpired: false,
  persistCurrentPage: 1,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToast: (state, action) => {
      return { ...state, toast: action.payload }
    },
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
    toggleFoldable: (state) => {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    setReRenderMenu: (state, action) => {
      return { ...state, reRenderMenu: action.payload }
    },
    setIsSessionExpired: (state, action) => {
      return { ...state, isSessionExpired: action.payload }
    },
    setPersistCurrentPage: (state, action) => {
      return { ...state, persistCurrentPage: action.payload }
    },
  },
})

const selectIsSessionExpired = (state: RootState): boolean =>
  state.app.isSessionExpired

const selectCurrentPage = (state: RootState): number =>
  state.app.persistCurrentPage

const appSelectors = { selectIsSessionExpired, selectCurrentPage }

export const appService = { actions: appSlice.actions, selectors: appSelectors }

export default appSlice.reducer
