import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './appSlice'
import authenticationReducer from './pages/Login/authenticationSlice'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

export const allReducers = {
  app: appReducer,
  authentication: authenticationReducer,
  // add your slice reducers here
}

const stateStore = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['app/addToast'],
      },
    }).concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof stateStore.getState>
export type AppDispatch = typeof stateStore.dispatch

// eslint-disable-next-line
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default stateStore
