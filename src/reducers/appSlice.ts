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
  broswerLocale: string
}

const initialState: AppState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  asideShow: false,
  theme: 'default',
  toast: undefined,
  reRenderMenu: true,
  isSessionExpired: false,
  broswerLocale: '',
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
    setReRenderMenu: (state, action) => {
      return { ...state, reRenderMenu: action.payload }
    },
    setIsSessionExpired: (state, action) => {
      return { ...state, isSessionExpired: action.payload }
    },
    setBroswerLocale: (state, action) => {
      state.broswerLocale = action.payload
    },
  },
})

const selectIsSessionExpired = (state: RootState): boolean =>
  state.app.isSessionExpired
const currentBroswerLocale = (state: RootState): string =>
  state.app.broswerLocale

const appSelectors = { selectIsSessionExpired, currentBroswerLocale }

export const appService = { actions: appSlice.actions, selectors: appSelectors }

export default appSlice.reducer
