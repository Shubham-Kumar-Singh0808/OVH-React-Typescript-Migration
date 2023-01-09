import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import DownloadSampleExcelFile from './DownloadSampleExcelFile'
import PayrollManagementTable from './PayrollManagementTable'
import EditPaySlip from './EditPaySlip/EditPaySlip'
import PaySlipExcelFileTable from './PaySlipExcelFileTable/PaySlipExcelFileTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const PayrollManagement = (): JSX.Element => {
  const [selectMonth, setSelectMonth] = useState<string>('')
  const [selectYear, setSelectYear] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [fileUploadErrorText, setFileUploadErrorText] = useState<string>('')
  const [toggle, setToggle] = useState('')
  const [toEditPayslip, setToEditPayslip] = useState<CurrentPayslip>(
    {} as CurrentPayslip,
  )
  const [previewBtn, setPreviewBtn] = useState<File | undefined>(undefined)
  const [isAllDeleteBtn, setIsAllDeleteBtn] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isAllChecked, setIsAllChecked] = useState(false)

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
    setPreviewBtn(file[0])
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

  const failedToastMessage = (
    <OToast
      toastMessage="Something went wrong with excel file.Please download sample file given below,Enter data and upload
      "
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const failedMessage = (
    <OToast
      toastMessage="File uploaded is either empty or is in invalid format"
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const previewBtnHandler = async () => {
    setToggle('excelTable')
    if (previewBtn) {
      const formData = new FormData()
      formData.append('file', previewBtn, previewBtn.name)

      const previewBtnActionResult = await dispatch(
        reduxServices.payrollManagement.readExcelFile(formData),
      )
      if (
        (reduxServices.payrollManagement.readExcelFile.fulfilled.match(
          previewBtnActionResult,
        ),
        previewBtnActionResult.payload === 200)
      ) {
        setToggle('excelTable')
        dispatch(reduxServices.app.actions.addToast(failedMessage))
      } else if (
        (reduxServices.payrollManagement.readExcelFile.rejected.match(
          previewBtnActionResult,
        ) &&
          previewBtnActionResult.payload === 500) ||
        previewBtnActionResult.payload === ''
      ) {
        dispatch(reduxServices.app.actions.addToast(failedToastMessage))
      }
    }
  }

  const deleteSuccessToastMessage = (
    <OToast
      toastColor="success"
      toastMessage={`Successfully Deleted Employee ID ${Number(
        selectYear,
      )} PaySlip`}
    />
  )

  const allDeleteHandler = async () => {
    const allDeleteBtnActionResult = await dispatch(
      reduxServices.payrollManagement.deleteCheckedPayslips(
        toEditPayslip.paySlipId,
      ),
    )
    if (
      reduxServices.payrollManagement.deleteCheckedPayslips.fulfilled.match(
        allDeleteBtnActionResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteSuccessToastMessage))
      dispatch(
        reduxServices.payrollManagement.getCurrentPayslip({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          month: selectMonth,
          year: Number(selectYear),
        }),
      )
    }
  }

  useEffect(() => {
    if (isChecked && isAllChecked) {
      setIsAllDeleteBtn(true)
    } else {
      setIsAllDeleteBtn(false)
    }
  }, [isChecked, isAllChecked])

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Payroll Management',
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Payroll Management"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mb-3">
          <CCol className="col-sm-2 control-label text-left">
            <CFormLabel className="mt-2">
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
            <CFormLabel className="mt-1" data-testid="form-select2">
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
              data-testid="form-select2"
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
        <CRow className="mt-3 sh-previewBtn">
          <CCol sm={4} className="mt-4 mb-4">
            <input
              className="mt-1"
              data-testid="feedback-form"
              type="file"
              name="upload-form"
              value={fileUploadErrorText}
              onChange={(element: SyntheticEvent) =>
                onChangeFileUploadHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
            <CRow className="textColor-shade">
              <span>Note: Please upload file either xls or xlsx format.</span>
            </CRow>
          </CCol>

          <CCol md={4} className="text-end mt-4 mb-4">
            <CButton
              className="btn btn-download text-decoration-none btn btn-ovh"
              size="sm"
              color="info"
              type="submit"
              onClick={previewBtnHandler}
            >
              Preview
            </CButton>
            &nbsp;
            <DownloadSampleExcelFile className="text-decoration-none btn btn-download btn-ovh" />
          </CCol>
        </CRow>
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={6} md={4}>
            <CInputGroup className="global-search me-0 justify-content-md-end">
              <CFormInput
                className="global-search input form-control"
                data-testid="searchField"
                placeholder="Search by Id/Name"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={handleSearchBtn}
                type="text"
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
              &nbsp;
              {userAccess?.deleteaccess && (
                <CButton
                  color="danger btn-ovh"
                  type="button"
                  disabled={!isAllDeleteBtn}
                  id="button-delete"
                  onClick={allDeleteHandler}
                >
                  Delete
                </CButton>
              )}
            </CInputGroup>
          </CCol>
        </CRow>
        {toggle === '' && (
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
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            isAllChecked={isAllChecked}
            setIsAllChecked={setIsAllChecked}
            userDeleteAccess={userAccess?.deleteaccess as boolean}
            userEditAccess={userAccess?.updateaccess as boolean}
          />
        )}

        {toggle === 'editPaySlip' && (
          <EditPaySlip toEditPayslip={toEditPayslip} />
        )}
        {toggle === 'excelTable' && (
          <PaySlipExcelFileTable
            selectMonth={selectMonth}
            selectYear={selectYear}
            currentPage={currentPage}
            pageSize={pageSize}
            setToggle={setToggle}
          />
        )}
      </OCard>
    </>
  )
}

export default PayrollManagement
