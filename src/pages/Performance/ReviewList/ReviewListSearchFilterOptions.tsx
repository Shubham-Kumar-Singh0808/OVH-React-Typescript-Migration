import {
  CRow,
  CCol,
  CFormCheck,
  CInputGroup,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import React from 'react'

const ReviewListSearchFilterOptions = ({
  employeeNameCheckbox,
  setEmployeeNameCheckbox,
  managerNameCheckbox,
  setManagerNameCheckbox,
  searchValue,
  setSearchValue,
  searchButtonOnKeyDown,
  searchBtnHandler,
}: {
  employeeNameCheckbox: boolean
  setEmployeeNameCheckbox: React.Dispatch<React.SetStateAction<boolean>>
  managerNameCheckbox: boolean
  setManagerNameCheckbox: React.Dispatch<React.SetStateAction<boolean>>
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchButtonOnKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  searchBtnHandler: () => void
}): JSX.Element => {
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  return (
    <>
      <CRow>
        <CCol sm={12} className="justify-content-md-end">
          <div className="d-flex flex-column pull-right">
            <CFormCheck
              inline
              className="ticket-search-checkbox"
              type="radio"
              name="searchByName"
              data-testid="searchByEmployeeName"
              id="searchByEmployeeName"
              label="Search by Employee Name"
              value={'true'}
              onChange={handleRadio}
            />
            <CFormCheck
              inline
              className="ticket-search-checkbox"
              type="radio"
              name="searchByName"
              data-testid="searchByAssigneeName"
              id="searchByAssigneeName"
              label="Search by Manager Name"
              value={'false'}
              onChange={handleRadio}
            />
            <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
              <CInputGroup className="global-search me-0 flex-nowrap">
                <CFormInput
                  placeholder="Search here"
                  aria-label="Multiple Search"
                  aria-describedby="search-field"
                  data-testid="multi-search-input"
                />
                <CButton
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="search-field"
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
          </div>
        </CCol>
      </CRow>
    </>
  )
}
export default ReviewListSearchFilterOptions
