import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeePIPDetails from './EmployeePIPDetails'
import EmployeeExtendPIP from './EmployeeExtendPIP'
import EmployeeRemovePIP from './EmployeeRemovePIP'
import EmployeeUpdatePIP from './EmployeeUpdatePIP'
import OCard from '../../../../components/ReusableComponent/OCard'

const EmployeePipTimeline = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="PIP Details"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="justify-content-end">
            <CCol className="text-end" md={5}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={() => setToggle('employeeUpdatePIP')}
              >
                Update
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh me-1 text-white"
                onClick={() => setToggle('employeeExtendPIP')}
              >
                Extend PIP
              </CButton>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={() => setToggle('employeeRemovePIP')}
              >
                Remove From PIP
              </CButton>
              <Link to={`/PIPList`}>
                <CButton
                  color="info"
                  className="btn-ovh me-1"
                  data-testid="toggle-back-btn"
                >
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </Link>
            </CCol>
          </CRow>
          <EmployeePIPDetails />
        </OCard>
      )}
      {toggle === 'employeeExtendPIP' && (
        <EmployeeExtendPIP setToggle={setToggle} />
      )}
      {toggle === 'employeeRemovePIP' && (
        <EmployeeRemovePIP setToggle={setToggle} />
      )}
      {toggle === 'employeeUpdatePIP' && (
        <EmployeeUpdatePIP setToggle={setToggle} />
      )}
    </>
  )
}

export default EmployeePipTimeline
