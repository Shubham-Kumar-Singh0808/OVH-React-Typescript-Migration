import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormCheck,
  CInputGroup,
  CFormInput,
} from '@coreui/react-pro'
import { toDate } from 'date-fns'
import React from 'react'
import { TextWhite, TextDanger } from '../../../constant/ClassName'

const AssetTransactionalListFilter = () => {
  return (
    <>
      <CRow className="justify-content-end">
        <CRow>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Select:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectDateOfPurchus"
              data-testid="form-select1"
              name="selectDateOfPurchus"
              //   value={selectDate}
              //   onChange={(e) => setSelectDate(e.target.value)}
            >
              <option value="Select Date">Select Date</option>
              <option value="Last Month">Last Month</option>
              <option value="Current Month">Current Month</option>
              <option value="Current Year">Current Year</option>
              <option value="Last Year">Last Year</option>
              <option value="Custom">Custom</option>
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Asset Type:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectAssetType"
              data-testid="form-select-2"
              name="selectAssetType"
              //   value={assetType}
              //   onChange={(e) => setAssetType(e.target.value)}
            >
              <option value={''}>Select Asset type</option>
              {/* {assetListTypeList?.assetTypeList?.length > 0 &&
                assetListTypeList?.assetTypeList?.map((location, index) => (
                  <option key={index} value={location.id}>
                    {location.assetType}
                  </option>
                ))} */}
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Product Type:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="ProductType"
              data-testid="form-select-3"
              name="selectProductType"
              //   value={productType}
              //   onChange={(e) => setProductType(e.target.value)}
            >
              <option value={''}>Select Product type</option>
              {/* {assetListData.map((item, index) => {
                return (
                  <option key={index} value={item.productId}>
                    {item.productName}
                  </option>
                )
              })} */}
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Asset Status:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="Status"
              data-testid="form-select-4"
              name="selectStatus"
              //   value={statusType}
              //   onChange={(e) => setStatusType(e.target.value)}
            >
              <option value="Select Status">Select Status</option>
              <option value="Idle">Idle</option>
              <option value="Not Working">Not Working</option>
              <option value="Scrap">Scrap</option>
              <option value="Under Repair">Under Repair</option>
              <option value="Working">Working</option>
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Date of Purchase:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectDateOfPurchus"
              data-testid="form-select1"
              name="selectDateOfPurchus"
              //   value={selectDate}
              //   onChange={(e) => setSelectDate(e.target.value)}
            >
              <option value="Select Date">Select Date</option>
              <option value="Last Month">Last Month</option>
              <option value="Current Month">Current Month</option>
              <option value="Current Year">Current Year</option>
              <option value="Last Year">Last Year</option>
              <option value="Custom">Custom</option>
            </CFormSelect>
          </CCol>

          {/* {selectDate === 'Custom' ? (
            <>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel>
                  From:
                  {(fromDate == null || fromDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <DatePicker
                  className="form-control form-control-sm sh-date-picker"
                  data-testid="date-picker"
                  placeholderText="dd/mm/yyyy"
                  dateFormat="dd/mm/yy"
                  name="fromDate"
                  id="fromDate"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  value={fromDate as string}
                  onChange={(date: Date) => onHandleStartDate(date)}
                />
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel>
                  To:
                  {(toDate == null || toDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <DatePicker
                  className="form-control form-control-sm sh-date-picker"
                  data-testid="date-picker"
                  placeholderText="dd/mm/yyyy"
                  dateFormat="dd/mm/yy"
                  name="toDate"
                  id="toDate"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  value={toDate as string}
                  onChange={(date: Date) => onHandleEndDate(date)}
                />
                {dateError && (
                  <CCol sm={12} className="mt-1 pt-1">
                    <span className="text-danger fw-bold">
                      To date should be greater than From date
                    </span>
                  </CCol>
                )}
              </CCol>
            </>
          ) : (
            <></>
          )} */}

          <CRow className="mt-4 mb-4">
            <CCol sm={9} md={{ offset: 3 }}>
              <CButton
                className="cursor-pointer"
                color="success btn-ovh me-1"
                data-testid="view-btn"
                // onClick={viewButtonHandler}
                // disabled={
                //   (selectDate === 'Custom' &&
                //     !(fromDate !== '' && toDate !== '')) ||
                //   dateError ||
                //   !isButtonEnabled
                // }
              >
                View
              </CButton>
              <CButton
                data-testid="clear-btn"
                className="cursor-pointer"
                disabled={false}
                color="warning btn-ovh me-1"
                // onClick={ClearBtnHadler}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>

          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="text-white"
                size="sm"
                data-testid="Add-export-button"
              >
                <i className="fa fa-plus me-1"></i>
                Add
              </CButton>
            </CCol>
          </CRow>
          {/* {IndividualUserAccess?.viewaccess ? (
            ''
          ) : ( */}
          <CRow className="justify-content-end">
            <CCol sm={3}>
              <label className="search_emp">
                <CFormCheck
                  className="pt-2"
                  data-testid="ch-searchByEmployee"
                  id="searchByEmployee"
                  name="Multiple Search"
                  //   checked={searchByEmployee}
                  //   onChange={(e) => setSearchByEmployee(e.target.checked)}
                  // disabled={!isButtonEnabled}
                />
                <b>Search by Employee Name</b>
              </label>
              {/* <label className="search_emp">
                  <CFormCheck
                    className="pt-2"
                    data-testid="ch-searchByAdded"
                    id="searchByAdded"
                    name="searchByAdded"
                    // checked={searchByAdded}
                    // onChange={(e) => setSearchByAdded(e.target.checked)}
                  />
                  <b>Search by Added by Name</b>
                </label> */}
            </CCol>
          </CRow>
          {/* )} */}

          {/* {IndividualUserAccess?.viewaccess ? (
            ''
          ) : ( */}
          <CRow className="gap-2 d-md-flex justify-content-md-end">
            <CCol sm={3} md={3}>
              <CInputGroup className="global-search me-0">
                <CFormInput
                  // disabled={!isMultiSearchBtn}
                  //   disabled={!isButtonEnabled}
                  data-testid="searchField"
                  placeholder="Employee Search"
                  aria-label="Multiple Search"
                  aria-describedby="button-addon2"
                  //   value={searchInput?.replace(/^\s*/, '')}
                  //   onChange={(e) => {
                  //     setSearchInput(e.target.value)
                  //   }}
                  // onKeyDown={handleSearchBtn}
                />
                <CButton
                  //   disabled={!searchInput?.replace(/^\s*/, '')}
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="button-addon2"
                  //   onClick={multiSearchBtnHandler}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
          {/* )} */}
        </CRow>
      </CRow>
    </>
  )
}

export default AssetTransactionalListFilter
