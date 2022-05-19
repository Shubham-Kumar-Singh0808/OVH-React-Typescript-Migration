import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './reducers/appSlice'
import authenticationReducer from './reducers/Login/authenticationSlice'
import categoryReducer from './reducers/MyProfile/Categories/categorySlice'
import { configureStore } from '@reduxjs/toolkit'
import employeeGeneralInformationReducer from './reducers/MyProfile/GeneralTab/generalInformationSlice'
import employeeQualificationsReducer from './reducers/MyProfile/Qualifications/qualificationSlice'
import personalInfoReducer from './reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import profileHistoryReducer from './reducers/MyProfile/ProfileHistory/profileHistorySlice'
import qualificationCategoryReducer from './reducers/MyProfile/QualificationCategoryList/qualificationCategorySlice'
import sidebarMenuSliceReducer from './reducers/SidebarMenu/sidebarMenuSlice'
import skillReducer from './reducers/MyProfile/Skills/skillSlice'
import thunkMiddleware from 'redux-thunk'
import userRolesAndPermissionsReducer from './reducers/Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'

export const allReducers = {
  app: appReducer,
  authentication: authenticationReducer,
  getLoggedInEmployeeData: employeeGeneralInformationReducer,
  sidebarMenu: sidebarMenuSliceReducer,
  userRolesAndPermissions: userRolesAndPermissionsReducer,
  employeeQualificationsDetails: employeeQualificationsReducer,
  category: categoryReducer,
  personalInfoDetails: personalInfoReducer,
  skill: skillReducer,
  qualificationCategory: qualificationCategoryReducer,
  profileHistory: profileHistoryReducer,
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
