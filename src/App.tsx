import './assets/scss/style.scss'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Component, Suspense } from 'react'

import { CSpinner } from '@coreui/react-pro'
import ProtectRoute from './components/ProtectRoutes'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./pages/Login/Login'))

class App extends Component {
  render(): JSX.Element {
    return (
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Switch>
            {/* <Route path="/" render={() => <DefaultLayout />} /> */}
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
}

export default App
