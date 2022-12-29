import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { PipStatus } from '../../../../types/Performance/PipList/pipListTypes'

const EmployeePipList = (): JSX.Element => {
  const [Select, setSelect] = useState<string>('')

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'PIP List'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="employeeAllocation-form">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Select:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="Select"
              data-testid="form-select1"
              name="Select"
              value={Select}
              onChange={(e) => {
                setSelect(e.target.value)
              }}
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
              <option value="Current Month">Current Month</option>
              <option value="Custom">Custom</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CFormCheck
          type="radio"
          name="pip"
          value={PipStatus.pip}
          id="employmentActive"
          label="PIP"
          inline
        />
        <CFormCheck
          type="radio"
          name="RemovedFromPIP"
          value={PipStatus.RemovedFromPIP}
          id="RemovedFromPIP"
          label="Removed From PIP"
          inline
        />
        <CFormCheck
          type="radio"
          name="inactive"
          value={PipStatus.inactive}
          id="inactive"
          label="Inactive"
          inline
        />
      </OCard>
    </>
  )
}

export default EmployeePipList
