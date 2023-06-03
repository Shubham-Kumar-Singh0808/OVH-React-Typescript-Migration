/* eslint-disable sonarjs/no-identical-functions */
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { dateFormat } from '../../../constant/DateFormat'

const AssetTransactionalListFilter = ({
  selectDatePicker,
  setSelectDatePicker,
  searchInputField,
  setSearchInputField,
  fromDatePicker,
  setFromDatePicker,
  toDatePicker,
  setToDatePicker,
  searchByEmployeeName,
  setSearchByEmployeeName,
  currentPage,
  pageSize,
  setCurrentPage,
  setIsTableView,
}: {
  selectDatePicker: string
  setSelectDatePicker: React.Dispatch<React.SetStateAction<string>>
  searchInputField: string
  setSearchInputField: React.Dispatch<React.SetStateAction<string | undefined>>
  fromDatePicker: string | Date | undefined
  setFromDatePicker: React.Dispatch<React.SetStateAction<string | undefined>>
  toDatePicker: string | Date | undefined
  setToDatePicker: React.Dispatch<React.SetStateAction<string | undefined>>
  searchByEmployeeName: boolean
  setSearchByEmployeeName: React.Dispatch<React.SetStateAction<boolean>>
  currentPage: number
  pageSize: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setIsTableView: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [assetTypeFilter, setAssetTypeFilter] = useState<string | number>('')
  const [productTypeFilter, setProductTypeFilter] = useState<string | number>(
    '',
  )
  const [statusTypeFilter, setStatusTypeFilter] = useState<string>('')
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const onHandleCalanderFromDate = (value: Date) => {
    setFromDatePicker(moment(value).format(dateFormat))
  }
  const onHandleCalanderToDate = (value: Date) => {
    setToDatePicker(moment(value).format(dateFormat))
  }
  const assetTransansactionTypeList = useTypedSelector(
    reduxServices.ProductTypeList.selectors.manufacturerData,
  )
  const assetListResponse = useTypedSelector(
    reduxServices.assetList.selectors.assetListData,
  )
  const [dateError, setDateError] = useState<boolean>(false)

  useEffect(() => {
    const dateFormatForIsBefore = 'YYYY-MM-DD'
    const startDate = moment(fromDatePicker, dateFormat).format(
      dateFormatForIsBefore,
    )
    const endDate = moment(toDatePicker, dateFormat).format(
      dateFormatForIsBefore,
    )

    setDateError(moment(endDate).isBefore(startDate))
  }, [fromDatePicker, toDatePicker])

  useEffect(() => {
    if (assetTypeFilter) {
      dispatch(
        reduxServices.assetList.getAssetTypeChangeList(Number(assetTypeFilter)),
      )
    }
  }, [dispatch, assetTypeFilter])

  useEffect(() => {
    if (
      assetTypeFilter ||
      productTypeFilter ||
      statusTypeFilter ||
      selectDatePicker
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [assetTypeFilter, productTypeFilter, statusTypeFilter, selectDatePicker])

  const handleSearchFilterBtn = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.assetTransactionList.getAssetTransactionList({
          dateSelection: selectDatePicker,
          endIndex: pageSize * currentPage,
          from: fromDatePicker as string,
          startIndex: pageSize * (currentPage - 1),
          to: toDatePicker as string,
          multipleSearch: searchInputField || '',
          searchByEmpName: searchByEmployeeName,
          productId: Number(productTypeFilter) || '',
          status: statusTypeFilter,
          assetId: Number(assetTypeFilter) || '',
        }),
      )
    }
  }

  const multiSearchFilterBtnHandler = () => {
    dispatch(
      reduxServices.assetTransactionList.getAssetTransactionList({
        dateSelection: selectDatePicker,
        endIndex: pageSize * currentPage,
        from: fromDatePicker as string,
        startIndex: pageSize * (currentPage - 1),
        to: toDatePicker as string,
        multipleSearch: searchInputField || '',
        searchByEmpName: searchByEmployeeName,
        productId: '',
        status: '',
        assetId: '',
      }),
    )
  }
  const assetsData = useTypedSelector(
    reduxServices.assetTransactionList.selectors.assetTransactionList,
  )

  const viewButtonClickHandler = () => {
    dispatch(
      reduxServices.assetTransactionList.getAssetTransactionList({
        dateSelection: selectDatePicker,
        endIndex: pageSize * currentPage,
        from: fromDatePicker as string,
        startIndex: pageSize * (currentPage - 1),
        to: toDatePicker as string,
        multipleSearch: searchInputField || '',
        searchByEmpName: searchByEmployeeName,
        productId: Number(productTypeFilter) || '',
        status: statusTypeFilter,
        assetId: Number(assetTypeFilter) || '',
      }),
    )
    setIsTableView(true)
  }

  useEffect(() => {
    if (assetsData.length > 0) {
      dispatch(
        reduxServices.assetTransactionList.getAssetTransactionList({
          dateSelection: selectDatePicker,
          endIndex: pageSize * currentPage,
          from: fromDatePicker as string,
          startIndex: pageSize * (currentPage - 1),
          to: toDatePicker as string,
          multipleSearch: searchInputField || '',
          searchByEmpName: searchByEmployeeName,
          productId: Number(productTypeFilter) || '',
          status: statusTypeFilter,
          assetId: Number(assetTypeFilter) || '',
        }),
      )
    }
  }, [pageSize, dispatch, currentPage])

  const ClearBtnClickHadler = () => {
    setSelectDatePicker('')
    setAssetTypeFilter('')
    setProductTypeFilter('')
    setStatusTypeFilter('')
    setSearchInputField('')
    setFromDatePicker('')
    setToDatePicker('')
    setSearchByEmployeeName(false)
    dispatch(
      reduxServices.assetTransactionList.actions.clearAssetTransactionListType(
        [],
      ),
    )
    setCurrentPage(1)
  }

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
              id="selectDate"
              data-testid="form-select-date"
              name="selectDate"
              value={selectDatePicker}
              onChange={(e) => setSelectDatePicker(e.target.value)}
            >
              <option value="">Select Date</option>
              <option value="Current Month">Current Month</option>
              <option value="Custom">Custom</option>
              <option value="Last Month">Last Month</option>
              <option value="Last Week">Last Week</option>
              <option value="This Week">This Week</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
            </CFormSelect>
          </CCol>

          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Asset Type:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="assetTypeFilter"
              data-testid="asset-select"
              name="assetTypeFilter"
              value={assetTypeFilter}
              onChange={(e) => setAssetTypeFilter(e.target.value)}
            >
              <option value={''}>Select Asset type</option>
              {assetTransansactionTypeList?.assetTypeList?.length > 0 &&
                assetTransansactionTypeList?.assetTypeList?.map(
                  (location, index) => (
                    <option key={index} value={location.id}>
                      {location.assetType}
                    </option>
                  ),
                )}
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Product Type:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="productTypeFilter"
              data-testid="product-select"
              name="productTypeFilter"
              value={productTypeFilter}
              onChange={(e) => setProductTypeFilter(e.target.value)}
            >
              <option value={''}>Select Product type</option>
              {assetListResponse.map((item, index) => {
                return (
                  <option key={index} value={item.productId}>
                    {item.productName}
                  </option>
                )
              })}
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Status:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="statusTypeFilter"
              data-testid="status-select"
              name="statusTypeFilter"
              value={statusTypeFilter}
              onChange={(e) => setStatusTypeFilter(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Idle">Idle</option>
              <option value="Not Working">Not Working</option>
              <option value="Scrap">Scrap</option>
              <option value="Under Repair">Under Repair</option>
              <option value="Working">Working</option>
            </CFormSelect>
          </CCol>

          {selectDatePicker === 'Custom' ? (
            <>
              <CRow className="form-group position-base">
                <CCol sm={2} md={1} className="text-end">
                  <CFormLabel>
                    From:
                    {(fromDatePicker == null || fromDatePicker === '') && (
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
                    name="fromDatePicker"
                    id="fromDatePicker"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    value={fromDatePicker as string}
                    onChange={(date: Date) => onHandleCalanderFromDate(date)}
                  />
                </CCol>
                <CCol sm={2} md={1} className="text-end">
                  <CFormLabel>
                    To:
                    {(toDatePicker == null || toDatePicker === '') && (
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
                    name="toDatePicker"
                    id="toDatePicker"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    value={toDatePicker as string}
                    onChange={(date: Date) => onHandleCalanderToDate(date)}
                  />
                  {dateError && (
                    <CCol sm={12} className="mt-1 pt-1">
                      <span className="text-danger fw-bold">
                        To date should be greater than From date
                      </span>
                    </CCol>
                  )}
                </CCol>
              </CRow>
            </>
          ) : (
            <></>
          )}

          <CRow className="mt-4 mb-4">
            <CCol sm={9} md={{ offset: 3 }}>
              <CButton
                className="cursor-pointer"
                color="success btn-ovh me-1"
                data-testid="view-btn"
                onClick={viewButtonClickHandler}
                disabled={
                  ((selectDatePicker === 'Custom' || selectDatePicker === '') &&
                    fromDatePicker !== '' &&
                    toDatePicker !== '') ||
                  dateError ||
                  !isButtonEnabled
                }
              >
                View
              </CButton>
              <CButton
                data-testid="clear-btn"
                className="cursor-pointer"
                color="warning btn-ovh me-1"
                onClick={ClearBtnClickHadler}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>

          <CRow className="justify-content-end">
            <CCol sm={3}>
              <label className="search_emp">
                <CFormCheck
                  className="pt-2"
                  data-testid="ch-searchByEmployeeName"
                  id="searchByEmployeeName"
                  name="Multiple Search"
                  checked={searchByEmployeeName}
                  onChange={(e) => setSearchByEmployeeName(e.target.checked)}
                />
                <b>Search by Employee Name</b>
              </label>
            </CCol>
          </CRow>

          <CRow className="gap-2 d-md-flex justify-content-md-end">
            <CCol sm={3} md={3}>
              <CInputGroup className="global-search me-0">
                <CFormInput
                  data-testid="searc-hField"
                  placeholder="Multiple Search"
                  aria-label="Multiple Search"
                  aria-describedby="button-addon2"
                  value={searchInputField?.replace(/^\s*/, '')}
                  onChange={(e) => {
                    setSearchInputField(e.target.value)
                  }}
                  onKeyDown={handleSearchFilterBtn}
                />
                <CButton
                  disabled={!searchInputField?.replace(/^\s*/, '')}
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="button-addon2"
                  onClick={multiSearchFilterBtnHandler}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
        </CRow>
      </CRow>
    </>
  )
}

export default AssetTransactionalListFilter
