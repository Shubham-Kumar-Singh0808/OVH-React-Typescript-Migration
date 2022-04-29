import { createSlice } from '@reduxjs/toolkit'

type AppStateType = {
  sidebarShow: boolean
  sidebarUnfoldable: boolean
  asideShow: boolean
  theme: string
}

const initialState: AppStateType = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  asideShow: false,
  theme: 'default',
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
  },
})

export const { toggleSidebar } = appSlice.actions

export default appSlice.reducer
