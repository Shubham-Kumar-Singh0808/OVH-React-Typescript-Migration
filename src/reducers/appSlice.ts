import { JSXElementConstructor, ReactElement } from 'react'

import { createSlice } from '@reduxjs/toolkit'

type AppStateType = {
  sidebarShow: boolean
  sidebarUnfoldable: boolean
  asideShow: boolean
  theme: string
  toast:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | undefined
}

const initialState: AppStateType = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  asideShow: false,
  theme: 'default',
  toast: undefined,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    addToast: (state, action) => {
      return { ...state, toast: action.payload }
    },
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
  },
})

export const { addToast, toggleSidebar } = appSlice.actions

export default appSlice.reducer
