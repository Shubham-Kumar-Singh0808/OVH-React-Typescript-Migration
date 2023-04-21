import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { CContainer } from '@coreui/react-pro'
// routes config
import OLoadingSpinner from './ReusableComponent/OLoadingSpinner'
import routes from '../routes'
import { LoadingType } from '../types/Components/loadingScreenTypes'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../stateStore'

const AppContent = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const getPIPValue = useTypedSelector(
    reduxServices.pipList.selectors.getPIPValue,
  )
  console.log(location.pathname.split('/')[1] === 'ViewPIPDetail')

  useEffect(() => {
    if (
      location.pathname === '/PIPList' ||
      location.pathname === '/PIPClearnceCerticates' ||
      location.pathname.split('/')[1] === 'ViewPIPDetail'
    ) {
      dispatch(reduxServices.pipList.actions.setMonthValue(getPIPValue))
    } else {
      dispatch(reduxServices.pipList.actions.setMonthValue('Current Month'))
    }
  }, [dispatch, location, getPIPValue])

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
