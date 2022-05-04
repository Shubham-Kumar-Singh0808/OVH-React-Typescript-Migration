import {
  AppAside,
  AppContent,
  AppFooter,
  AppHeader,
  AppSidebar,
} from '../components/index'

import React from 'react'

const DefaultLayout = (): JSX.Element => {
  return (
    <>
      <div className="d-flex flex-row">
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-1">
            <AppContent />
          </div>
        </div>
        <AppAside />
      </div>
      <AppFooter />
    </>
  )
}

export default DefaultLayout
