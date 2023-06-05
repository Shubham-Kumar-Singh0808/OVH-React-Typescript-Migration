import { CButton } from '@coreui/react-pro'
import React from 'react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { AppFooter } from '../../components'
import { logoNegative } from '../../assets/brand/logo-negative'

const ErrorPage = (): JSX.Element => {
  const history = useHistory()

  return (
    <>
      <div
        className="cls-container"
        style={{ backgroundColor: '#212121', minHeight: 'calc(100vh - 27px)' }}
      >
        <div className="cls-header" style={{ background: '#fff' }}>
          <div className="cls-brand">
            <a className="box-inline">
              <span className="brand-title">
                <CIcon
                  className="sidebar-brand-full cursor-pointer"
                  icon={logoNegative}
                  height={35}
                />
              </span>
            </a>
          </div>
        </div>
        <div className="cls-content">
          <h1 className="error-code text-warning">403</h1>
          <br></br>
          <h3 className="text-warning">Unauthorized</h3>
          <br></br>
          <p className="h4 text-thin pad-btm mar-btm">
            <i className="fa fa-exclamation-circle fa-fw"></i>
            You are not authorized to view this page
          </p>
          <CButton
            color="info"
            className="btn-ovh me-1 btn-primary "
            data-testid="removeBack-button"
            onClick={() => history.push('/dashboard')}
          >
            Back
          </CButton>
        </div>
      </div>
      <AppFooter />
    </>
  )
}

export default ErrorPage
