import { CCardHeader, CCardBody } from '@coreui/react-pro'
import React from 'react'
import EmployeeAssetsTable from './EmployeeAssetsTable'

const EmployeeAssets = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">My Assets</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0">
        <EmployeeAssetsTable />
      </CCardBody>
    </>
  )
}

export default EmployeeAssets
