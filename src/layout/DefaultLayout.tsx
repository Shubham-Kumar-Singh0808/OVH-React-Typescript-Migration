import {
  AppAside,
  AppContent,
  AppFooter,
  AppHeader,
  AppSidebar,
} from '../components/index'
import React, { useMemo, useRef } from 'react'

import { CToaster } from '@coreui/react-pro'
import IdleModal from '../components/IdleModal'
import { useTypedSelector } from '../stateStore'

const DefaultLayout = (): JSX.Element => {
  const toastState = useTypedSelector((state) => state.app.toast)
  const toasterReference = useRef<HTMLDivElement>(null)
  const currentUsername = useTypedSelector(
    (state) => state.authentication.authenticatedUser.userName,
  )

  const timeoutProps = useMemo(() => {
    if (
      currentUsername === 'sunnymanesh.eagala' ||
      currentUsername === 'admin.staging'
    ) {
      return {
        timeout: 5 * 60 * 1000,
        promptTimeout: 5 * 60 * 1000,
      }
    }

    return {
      timeout: 20 * 60 * 1000,
      promptTimeout: 30 * 1000,
    }
  }, [currentUsername])

  return (
    <>
      <div className="d-flex flex-row">
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-1">
            <AppContent />

            <CToaster
              ref={toasterReference}
              push={toastState}
              placement="top-end"
            />

            <IdleModal
              timeout={timeoutProps.timeout}
              promptTimeout={timeoutProps.promptTimeout}
            />
          </div>
        </div>
        <AppAside />
      </div>
      <AppFooter />
    </>
  )
}

export default DefaultLayout
