import './assets/scss/style.scss'

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import React, { Suspense, useCallback, useEffect } from 'react'
import {
  authenticationActions,
  authenticationSelectors,
} from './reducers/Login/authenticationSlice'

import { CSpinner } from '@coreui/react-pro'
import ProtectRoute from './components/ProtectRoutes'
import SessionTimeout from './components/SessionTimeout'
import { appSelectors } from './reducers/appSlice'
import { getEmployeeGeneralInformationThunk } from './reducers/MyProfile/GeneralTab/generalInformationSlice'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from './stateStore'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./pages/Login/Login'))

const App = (): JSX.Element => {
  const setIsSessionExpired = useTypedSelector(
    appSelectors.selectIsSessionExpired,
  const employeeId = useTypedSelector(authenticationSelectors.selectEmployeeId)
  const authenticatedToken = useTypedSelector(
    authenticationSelectors.selectToken,
  )
  const dispatch = useDispatch()

  const loadState = useCallback(() => {
    const employeeNameFromStorage = localStorage.getItem('employeeName')
    const employeeIdFromStorage = localStorage.getItem('employeeId')
    const userNameFromStorage = localStorage.getItem('userName')
    const roleFromStorage = localStorage.getItem('role')
    const tenantKeyFromStorage = localStorage.getItem('tenantKey')
    const tokenFromStorage = localStorage.getItem('token')

    return {
      authenticatedUser: {
        employeeName: employeeNameFromStorage,
        employeeId: employeeIdFromStorage,
        userName: userNameFromStorage,
        role: roleFromStorage,
        tenantKey: tenantKeyFromStorage,
        token: tokenFromStorage,
      },
    }
  }, [])

  useEffect(() => {
    const initialAuthenticationState = loadState()

    dispatch(
      authenticationActions.setAuthentication(initialAuthenticationState),
    )
  })
  useEffect(() => {
    if (authenticatedToken) {
      dispatch(
        getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation(
          employeeId,
        ),
      )
    }
  }, [authenticatedToken, dispatch, employeeId])

  return (
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          <Route
            path="/sessionExpire"
            render={() =>
              setIsSessionExpired ? <SessionTimeout /> : <Redirect to={'/'} />
            }
          />
          <Route
            path="/login"
            render={() => (
              <ProtectRoute
                callback={(token) => (token ? false : true)}
                redirectTo="/"
              >
                <Login />
              </ProtectRoute>
            )}
          />
          <Route
            path="/"
            render={() => (
              <ProtectRoute
                callback={(token) => (token ? true : false)}
                redirectTo="/login"
              >
                <DefaultLayout />
              </ProtectRoute>
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
