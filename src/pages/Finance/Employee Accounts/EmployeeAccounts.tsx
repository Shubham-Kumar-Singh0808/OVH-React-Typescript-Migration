import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import EmployeeAccountsTable from './EmployeeAccountsTable'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeAccounts = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Accounts"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mt-2">
          <CCol
            lg={12}
            className="gap-2 d-md-flex justify-content-end"
            data-testid="exportBtn"
          >
            <CButton color="info" className="text-white" size="sm">
              <i className="fa fa-plus me-1"></i>
              Click to Export
            </CButton>
          </CCol>
        </CRow>
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={3} md={4}>
            <CInputGroup className="global-search me-0">
              <CFormInput
                data-testid="searchField"
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
              />
              <CButton
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        <EmployeeAccountsTable />
      </OCard>
    </>
  )
}
export default EmployeeAccounts
