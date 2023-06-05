import './assets/scss/style.scss'

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import React, { Suspense, useCallback, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from './stateStore'
import ProtectRoute from './components/ProtectRoutes'
import SessionTimeout from './components/SessionTimeout'
import { getEmployeeGeneralInformationThunk } from './reducers/MyProfile/GeneralTab/generalInformationSlice'
import { reduxServices } from './reducers/reduxServices'
import OLoadingSpinner from './components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from './types/Components/loadingScreenTypes'
import ErrorPage from './pages/ErrorPage/ErrorPage'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./pages/Login/Login'))

const App = (): JSX.Element => {
  const setIsSessionExpired = useTypedSelector(
    reduxServices.app.selectors.selectIsSessionExpired,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const authenticatedToken = useTypedSelector(
    reduxServices.authentication.selectors.selectToken,
  )
  const dispatch = useAppDispatch()

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
      reduxServices.authentication.actions.setAuthentication(
        initialAuthenticationState,
      ),
    )
  })

  useEffect(() => {
    if (authenticatedToken) {
      dispatch(
        getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation(
          employeeId,
        ),
      )
      dispatch(
        reduxServices.userAccessToFeatures.getUserAccessToFeatures(employeeId),
      )
    }
  }, [authenticatedToken, dispatch, employeeId])

  const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
      if (pathname !== '/newEvent') {
        dispatch(reduxServices.newEvent.actions.clearProjectMembers())
      }
      window.scrollTo(0, 0)
    }, [pathname])
    return null
  }

  return (
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <ScrollToTop />
      <Suspense fallback={<OLoadingSpinner type={LoadingType.PAGE} />}>
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
              <ProtectRoute callback={(token) => !token} redirectTo="/">
                <Login />
              </ProtectRoute>
            )}
          />

          <Route exact path="/forbidden" component={ErrorPage} />
          <Route
            path="/"
            render={() => (
              <ProtectRoute callback={(token) => !!token} redirectTo="/login">
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
