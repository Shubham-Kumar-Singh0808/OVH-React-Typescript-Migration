import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCol,
  CFormLabel,
  CFormCheck,
  CFormSelect,
  CRow,
  CButton,
  CInputGroup,
  CFormInput,
  CTooltip,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  EmploymentStatus,
  EmployeeReportOptionsProps,
} from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'

const FilterOptions = ({
  category,
  setCategory,
  country,
  setCountry,
  searchInput,
  setSearchInput,
  setCurrentPage,
  pageSize,
  currentPage,
  setPageSize,
}: EmployeeReportOptionsProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeReports.selectors.selectedEmploymentStatus,
  )
  const countries = useTypedSelector(
    reduxServices.employeeReports.selectors.countries,
  )

  const categoryOptions = [
    { label: 'Select Category', value: '' },
    { label: 'Working from Home', value: 'Home' },
    { label: 'Working from Office', value: 'Office' },
    { label: 'External Vendor', value: 'External Vendor' },
    { label: 'Employment Contract', value: 'Employment Contract' },
  ]

  const handleEmployeeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.employeeReports.actions.changeSelectedEmploymentStatus(
        event.target.value,
      ),
    )
  }

  const handleSearch = () => {
    dispatch(
      reduxServices.employeeReports.actions.setSearchEmployee(searchInput),
    )
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.employeeReports.getEmployeeReport({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          selectionStatus: selectedEmploymentStatus,
          selectedCategory: category,
          searchEmployee: searchInput,
          country,
        }),
      )
    }
  }

  const onChangeCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }

  const onChangeSelectCountryHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCountry(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }

  return (
    <>
      <CRow>
        <CCol
          className="mt-1"
          sm={2}
          md={1}
          lg={1}
          data-testid="activeFilterStatus"
        >
          <CFormCheck
            type="radio"
            name="employmentStatus"
            value={EmploymentStatus.active}
            id="employmentActive"
            label="Active"
            defaultChecked={
              selectedEmploymentStatus === EmploymentStatus.active
            }
            onChange={handleEmployeeStatus}
            inline
          />
        </CCol>
        <CCol
          className="mt-1"
          sm={2}
          md={1}
          lg={1}
          data-testid="inactiveFilterStatus"
        >
          <CFormCheck
            type="radio"
            name="employmentStatus"
            value={EmploymentStatus.inactive}
            id="employmentInactive"
            label="Inactive"
            defaultChecked={
              selectedEmploymentStatus === EmploymentStatus.inactive
            }
            onChange={handleEmployeeStatus}
            inline
          />
        </CCol>
        <CCol sm={2} md={2} lg={1}>
          <CFormLabel className="mt-1">Select:</CFormLabel>
        </CCol>
        <CCol sm={4} md={2} lg={2} data-testid="categoryFilter">
          <CFormSelect
            aria-label="Default select example"
            name="category"
            id="category"
            data-testid="form-select1"
            value={category}
            onChange={onChangeCategoryHandler}
          >
            {categoryOptions?.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={2} lg={1}>
          <CFormLabel className="mt-1">Country:</CFormLabel>
        </CCol>
        <CCol sm={2} md={2} lg={2} data-testid="countryFilter">
          <CFormSelect
            aria-label="Default select example"
            name="country"
            id="country"
            data-testid="form-select2"
            value={country}
            onChange={onChangeSelectCountryHandler}
          >
            <option>Select Country</option>
            {countries?.map((opt, index) => (
              <option key={index} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol
          className="d-md-flex justify-content-end"
          data-testid="designationLinkButton"
        >
          <Link to={`/report2`}>
            <CTooltip content="View">
              <CButton color="info btn-ovh me-0">
                <i className="fa fa-eye  me-1"></i>Employee Designation info
              </CButton>
            </CTooltip>
          </Link>
        </CCol>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end mt-4">
        <CCol sm={6} md={4} lg={5} xl={4} xxl={4}>
          <CInputGroup className="global-search me-0" data-testid="searchField">
            <CFormInput
              data-testid="searchInput"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchInput}
              name="searchEmployeeInput"
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
              onKeyUp={handleSearchByEnter}
              autoComplete="off"
            />
            <CButton
              disabled={!searchInput}
              data-testid="search-btn1"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={handleSearch}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default FilterOptions
