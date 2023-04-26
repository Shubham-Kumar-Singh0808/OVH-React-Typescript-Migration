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

  const getSelectedMonthValue = useTypedSelector(
    reduxServices.resignationList.selectors.getSelectedMonthValue,
  )
  const getSelectedStatusValue = useTypedSelector(
    reduxServices.resignationList.selectors.getSelectedStatusValue,
  )
  const getSelectedEmployeeStatusValue = useTypedSelector(
    reduxServices.resignationList.selectors.getSelectedEmployeeStatusValue,
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

  useEffect(() => {
    if (
      location.pathname === '/resignationList' ||
      location.pathname === '/managerComments' ||
      location.pathname === '/separationChart' ||
      location.pathname === '/ClearanceCertificateIT' ||
      location.pathname === '/ClearanceCertificateFinance' ||
      location.pathname === '/ClearanceCertificateAdmin' ||
      location.pathname === '/ClearanceCertificateHR'
    ) {
      dispatch(
        reduxServices.resignationList.actions.setMonthValue(
          getSelectedMonthValue,
        ),
      )
      dispatch(
        reduxServices.resignationList.actions.setStatusValue(
          getSelectedStatusValue,
        ),
      )
      dispatch(
        reduxServices.resignationList.actions.setEmployeeStatusValue(
          getSelectedEmployeeStatusValue,
        ),
      )
    } else {
      dispatch(reduxServices.resignationList.actions.setMonthValue(''))
      dispatch(reduxServices.resignationList.actions.setStatusValue('All'))
      dispatch(reduxServices.resignationList.actions.setEmployeeStatusValue(''))
    }
  }, [
    dispatch,
    location,
    getPIPValue,
    getSelectedStatusValue,
    getSelectedEmployeeStatusValue,
  ])

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
