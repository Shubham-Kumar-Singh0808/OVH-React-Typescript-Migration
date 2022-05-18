import './assets/scss/style.scss'
import 'react-datepicker/dist/react-datepicker.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Suspense, useCallback, useEffect } from 'react'

import { CSpinner } from '@coreui/react-pro'
import ProtectRoute from './components/ProtectRoutes'
import { setAuthentication } from './reducers/Login/authenticationSlice'
import { useDispatch } from 'react-redux'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./pages/Login/Login'))

const App = (): JSX.Element => {
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

    dispatch(setAuthentication(initialAuthenticationState))
  })

  return (
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
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
