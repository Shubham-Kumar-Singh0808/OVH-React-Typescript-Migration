import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer } from '@coreui/react-pro'
// routes config
import OLoadingSpinner from './ReusableComponent/OLoadingSpinner'
import routes from '../routes'
import { LoadingType } from '../types/Components/loadingScreenTypes'

const AppContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<OLoadingSpinner type={LoadingType.PAGE} />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={() => (
                    <>
                      <route.component />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
