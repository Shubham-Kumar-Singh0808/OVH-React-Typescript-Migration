import React, { useState } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ResignationViewList from './ResignationViewList'
import EmployeeView from './EmployeeView'
import OCard from '../../../components/ReusableComponent/OCard'

const ResignationView = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Employee View"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <CButton
                  color="btn btn-danger pull-right"
                  className="btn-ovh me-1"
                  data-testid="resignation-btn"
                  onClick={() => setToggle('EmployeeView')}
                >
                  Withdraw Your Resignation
                </CButton>
              </CCol>
            </CRow>
            <ResignationViewList />
          </OCard>
        </>
      )}
      {toggle === 'EmployeeView' && <EmployeeView />}
    </>
  )
}

export default ResignationView
