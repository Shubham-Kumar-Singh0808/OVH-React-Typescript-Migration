import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './reducers/appSlice'
import authenticationReducer from './reducers/Login/authenticationSlice'
import categoryReducer from './reducers/MyProfile/Categories/categorySlice'
import { configureStore } from '@reduxjs/toolkit'
import skillReducer from './reducers/MyProfile/Skills/skillSlice'
import thunkMiddleware from 'redux-thunk'
import qualificationCategoryReducer from './reducers/MyProfile/QualificationCategoryList/qualificationCategorySlice'
export const allReducers = {
  app: appReducer,
  authentication: authenticationReducer,
  category: categoryReducer,
  skill: skillReducer,
  qualificationCategory: qualificationCategoryReducer,
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
