import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'

const FilterOptions = (): JSX.Element => {
  return (
    <>
      <CRow className="justify-content-end">
        <CRow>
          <CCol sm={1} md={1} className="text-end">
            <CFormLabel className="mt-1">Cycle:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="cycle"
              name="investmentCycle"
              id="cycle"
              data-testid="investment-cycle"
              //   onChange={(e) => setSelectCategory(e.target.value)}
              //   value={selectCategory}
            >
              <option value="">Select Category</option>
              {/* {getCategories &&
                  getCategories
                    ?.slice()
                    .sort((catg1, catg2) =>
                      catg1.categoryName.localeCompare(catg2.categoryName),
                    )
                    ?.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))} */}
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CButton
              color="info btn-ovh me-1"
              className="text-white"
              data-testid="add-investmentCycle-btn"
            >
              <i className="fa fa-plus me-1"></i>Add Investment Cycle
            </CButton>
          </CCol>
          <CCol sm={5} className="text-end">
            <CButton color="info btn-ovh me-1" className="text-white">
              <i className="fa fa-plus me-1"></i>Add Investment
            </CButton>

            <CButton
              color="info btn-ovh me-1"
              className="text-white"
              data-testid="export-button"
            >
              <i className="fa fa-plus me-1"></i>Click to Export
            </CButton>
          </CCol>
        </CRow>
        <CRow className="gap-2 d-md-flex justify-content-md-end mt-4">
          <CCol sm={6} md={4} lg={5} xl={4} xxl={4}>
            <CInputGroup className="global-search me-0">
              <CFormInput
                data-testid="search-employee"
                placeholder="Search By Employee Name"
                aria-label="Search"
                aria-describedby="button-addon2"
                // value={searchInput}
                // onChange={(e) => {
                //   setSearchInput(e.target.value)
                // }}
                // onKeyDown={handleSearchButton}
              />
              <CButton
                disabled
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                // onClick={multiSearchButtonHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CRow>
    </>
  )
}

export default FilterOptions
