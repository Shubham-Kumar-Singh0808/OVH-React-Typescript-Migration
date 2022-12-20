import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useState } from 'react'
import DownloadSampleExcelFile from './DownloadSampleExcelFile'
import PayrollManagementTable from './PayrollManagementTable'
import EditPaySlip from './EditPaySlip/EditPaySlip'
import ViewPaySlip from './ViewPaySlip/ViewPaySlip'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const PayrollManagement = (): JSX.Element => {
  const [selectMonth, setSelectMonth] = useState<string>('')
  const [selectYear, setSelectYear] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [fileUploadErrorText, setFileUploadErrorText] = useState<string>('')
  const [toggle, setToggle] = useState('')
  const [toEditPayslip, setToEditPayslip] = useState<CurrentPayslip>(
    {} as CurrentPayslip,
  )

  const currentYear = new Date().getFullYear()
  const previousYears = currentYear - 4
  const years = []
  for (let i = currentYear; i >= previousYears; i--) {
    years.push(i)
  }

  const onChangeFileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['xls', 'xlsx']
    let extension = ''
    if (!file) return
    if (file && file[0] !== undefined) {
      extension = file[0].name.split('.').pop() as string
    }
    if (!acceptedFileTypes.includes(extension)) {
      setFileUploadErrorText(
        'You chosen wrong file format.Please Choose either xls or xlsx',
      )
      return
    }
    setFileUploadErrorText('')
  }

  const dispatch = useAppDispatch()

  const PaySlipsListSize = useTypedSelector(
    reduxServices.payrollManagement.selectors.PaySlipsListSize,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(PaySlipsListSize, 20)

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.payrollManagement.searchEmployee({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          month: selectMonth,
          searchStringCand: searchInput,
          year: Number(selectYear),
        }),
      )
    }
  }

  const multiSearchBtnHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(
      reduxServices.payrollManagement.searchEmployee({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        month: selectMonth,
        searchStringCand: searchInput,
        year: Number(selectYear),
      }),
    )
  }

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Payroll Management"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="mb-3 mt-3">
            <CCol className="col-sm-2 control-label text-left">
              <CFormLabel className="mt-1">
                Select Month:{' '}
                <span className={selectMonth ? 'text-white' : 'text-danger'}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="Month"
                data-testid="form-select1"
                name="Month"
                value={selectMonth}
                onChange={(e) => {
                  setSelectMonth(e.target.value)
                }}
              >
                <option value={''}>Select Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </CFormSelect>
            </CCol>
            <CCol className="col-sm-2 control-label text-left">
              <CFormLabel className="mt-1">
                Select Year:{' '}
                <span className={selectYear ? 'text-white' : 'text-danger'}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="Year"
                data-testid="form-select1"
                name="Year"
                disabled={!selectMonth}
                value={selectYear}
                onChange={(e) => {
                  setSelectYear(e.target.value)
                }}
              >
                <option value={''}>Select Year</option>
                {years.length > 0 &&
                  years?.map((year, index) => (
                    <option key={index}>{year}</option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3 justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                className="mt-1 ms-2 btn-ovh btn btn-success"
                size="sm"
                color="btn btn-info"
                type="submit"
              >
                Preview
              </CButton>
              &nbsp; &nbsp; &nbsp;
              <DownloadSampleExcelFile className="text-decoration-none btn btn-download btn-ovh" />
            </CCol>
            <CRow className="mt-4 mb-4">
              {fileUploadErrorText && (
                <div id="error">
                  <strong className="mt-3 text-danger">
                    {fileUploadErrorText}
                  </strong>
                </div>
              )}
              <CCol sm={3}>
                <input
                  className="mt-1"
                  data-testid="feedback-form"
                  type="file"
                  name="upload-form"
                  onChange={(element: SyntheticEvent) =>
                    onChangeFileUploadHandler(
                      element.currentTarget as HTMLInputElement,
                    )
                  }
                />
                <span>Note: Please upload file either xls or xlsx format.</span>
              </CCol>
            </CRow>
          </CRow>
          <CRow className="gap-2 d-md-flex justify-content-md-end">
            <CCol sm={6} md={4}>
              <CInputGroup className="global-search me-0 justify-content-md-end">
                <CFormInput
                  data-testid="searchField"
                  placeholder="Search by Id/Name"
                  aria-label="Multiple Search"
                  aria-describedby="button-addon2"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                  }}
                  onKeyDown={handleSearchBtn}
                />
                <CButton
                  disabled={!searchInput}
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="button-addon2"
                  onClick={multiSearchBtnHandler}
                >
                  Search
                </CButton>
                <CButton color="danger btn-ovh">
                  <i className="fa fa-trash-o me-1"></i>Delete
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
          <PayrollManagementTable
            selectMonth={selectMonth}
            selectYear={selectYear}
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
            setToggle={setToggle}
            setToEditPayslip={setToEditPayslip}
          />
        </OCard>
      )}
      {toggle === 'editPaySlip' && (
        <EditPaySlip toEditPayslip={toEditPayslip} />
      )}
      {toggle === 'viewPaySlip' && <ViewPaySlip />}
    </>
  )
}

export default PayrollManagement
