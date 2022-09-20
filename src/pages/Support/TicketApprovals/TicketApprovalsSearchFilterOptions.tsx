import {
  CRow,
  CCol,
  CFormCheck,
  CInputGroup,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import React from 'react'

const TicketApprovalsSearchFilterOptions = ({
  employeeNameCheckbox,
  setEmployeeNameCheckbox,
  assigneeNameCheckbox,
  setAssigneeNameCheckbox,
  searchValue,
  setSearchValue,
  searchButtonOnKeyDown,
  searchBtnHandler,
}: {
  employeeNameCheckbox: boolean
  setEmployeeNameCheckbox: React.Dispatch<React.SetStateAction<boolean>>
  assigneeNameCheckbox: boolean
  setAssigneeNameCheckbox: React.Dispatch<React.SetStateAction<boolean>>
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchButtonOnKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  searchBtnHandler: () => void
}): JSX.Element => {
  return (
    <CRow>
      <CCol sm={12} className="justify-content-md-end">
        <div className="d-flex flex-column pull-right">
          <CFormCheck
            inline
            className="ticket-search-checkbox"
            type="checkbox"
            name="searchByEmployeeName"
            data-testid="searchByEmployeeName"
            id="searchByEmployeeName"
            label="Search by Employee Name"
            onChange={(e) => setEmployeeNameCheckbox(e.target.checked)}
            checked={employeeNameCheckbox}
          />
          <CFormCheck
            inline
            className="ticket-search-checkbox"
            type="checkbox"
            name="searchByAssigneeName"
            data-testid="searchByAssigneeName"
            id="searchByAssigneeName"
            label="Search by Assignee Name"
            onChange={(e) => setAssigneeNameCheckbox(e.target.checked)}
            checked={assigneeNameCheckbox}
          />
          <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
            <CInputGroup className="global-search me-0 flex-nowrap">
              <CFormInput
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                aria-describedby="search-field"
                data-testid="multi-search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={searchButtonOnKeyDown}
              />
              <CButton
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="search-field"
                onClick={searchBtnHandler}
                disabled={searchValue == null || searchValue === ''}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </div>
      </CCol>
    </CRow>
  )
}

export default TicketApprovalsSearchFilterOptions
