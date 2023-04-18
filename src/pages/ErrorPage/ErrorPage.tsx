import { CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { AppFooter } from '../../components'

const ErrorPage = (): JSX.Element => {
  return (
    <>
      <div className="cls-content">
        <h1 className="error-code text-warning">403</h1>
        <br></br>
        <h3 className="text-warning">Unauthorized</h3>
        <br></br>
        <p className="h4 text-thin pad-btm mar-btm">
          <i className="fa fa-exclamation-circle fa-fw"></i>
          You are not authorized to view this page
        </p>
        <Link to={`/dashboard`} className="btn-link btn btn-primary">
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="removeBack-button"
          >
            Back
          </CButton>
        </Link>
      </div>
      <AppFooter />
    </>
  )
}

export default ErrorPage
