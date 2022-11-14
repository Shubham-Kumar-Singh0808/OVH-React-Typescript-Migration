import React from 'react'

const OErrorComponent = (): JSX.Element => {
  return (
    <div>
      <h1 className="error-code text-warning">403</h1>
      <br></br>
      <h3 className=" text-warning">Unauthorized</h3>
      <p className="h4 text-thin pad-btm mar-btm">
        <i className="fa fa-exclamation-circle fa-fw"></i>
        You are not authorized to view this page
      </p>
      <a className="btn-link btn btn-primary" href="#">
        <strong>Back</strong>
      </a>
    </div>
  )
}
export default OErrorComponent
