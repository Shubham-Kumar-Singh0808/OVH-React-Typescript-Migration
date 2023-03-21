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
  setSelectRadio,
  selectRadio,
  searchValue,
  setSearchValue,
  searchButtonOnKeyDown,
  searchBtnHandler,
  isChecked,
  setIsChecked,
}: {
  setSelectRadio: (value: string) => void
  selectRadio: string
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchButtonOnKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  searchBtnHandler: () => void
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectRadio(e.target.value)
    setIsChecked(true)
  }
  return (
    <>
      <CRow>
        <CCol sm={12} className="justify-content-md-end">
          <div className="d-flex flex-column pull-right">
            <CFormCheck
              inline
              className="reviewList-search-checkbox"
              type="radio"
              name="searchByName"
              data-testid="searchByEmployeeName"
              id="searchByEmployeeName"
              label="Search by Employee Name"
              value={'true'}
              checked={selectRadio === 'true'}
              onChange={handleRadio}
            />
            <CFormCheck
              inline
              className="reviewList-search-checkbox"
              type="radio"
              name="searchByName"
              data-testid="searchByManagerName"
              id="searchByAssigneeName"
              label="Search by Manager Name"
              value={'false'}
              checked={selectRadio === 'false'}
              onChange={handleRadio}
            />
            <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
              <CInputGroup className="global-search me-0 flex-nowrap">
                <CFormInput
                  className={!isChecked ? 'hidden-block' : ''}
                  placeholder="Search here"
                  aria-label="Multiple Search"
                  aria-describedby="search-field"
                  data-testid="multi-search-input"
                  disabled={!isChecked}
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
    </>
  )
}
export default ReviewListSearchFilterOptions
