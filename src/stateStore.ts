import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './reducers/appSlice'
import authenticationReducer from './reducers/Login/authenticationSlice'
import categoryReducer from './reducers/MyProfile/Categories/categorySlice'
import { configureStore } from '@reduxjs/toolkit'
import skillReducer from './reducers/MyProfile/Skills/skillSlice'
import thunkMiddleware from 'redux-thunk'
import employeeGeneralInformationReducer from './reducers/MyProfile/GeneralTab/generalInformationSlice'
import employeeSkillsReducer from './reducers/MyProfile/QualificationTab/EmployeeSkill/skillTableSlice'
import personalInfoReducer from './reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'

export const allReducers = {
  app: appReducer,
  authentication: authenticationReducer,
  getLoggedInEmployeeData: employeeGeneralInformationReducer,
  familyDetails: personalInfoReducer,
  employeeSkills: employeeSkillsReducer,
  category: categoryReducer,
  skill: skillReducer,
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
