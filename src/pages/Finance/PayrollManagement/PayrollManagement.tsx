import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CInputGroup,
  CTooltip,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import DownloadSampleExcelFile from './DownloadSampleExcelFile'
import PayrollManagementTable from './PayrollManagementTable'
import EditPaySlip from './EditPaySlip/EditPaySlip'
import PaySlipExcelFileTable from './PaySlipExcelFileTable/PaySlipExcelFileTable'
import PayrollManagementFilterOptions from './PayrollManagementFilterOptions'
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
  const [excelTable, setExcelTable] = useState(false)
  const [clearFile, setClearFile] = useState<string>('')
  const [toEditPayslip, setToEditPayslip] = useState<CurrentPayslip>(
    {} as CurrentPayslip,
  )

  const [previewBtn, setPreviewBtn] = useState<File | undefined>(undefined)

  const [isNoteVisible, setIsNoteVisible] = useState<File | undefined>(
    undefined,
  )

  const [isPercentageEnable, setPercentageEnable] = useState(false)

  const [isDeleteBtnDisable, setIsDeleteBtnDisable] = useState(false)
  const [allChecked, setAllChecked] = useState<boolean>(false)

  const [paySlipId, setPaySlipId] = useState<number[]>([])
  console.log(isDeleteBtnDisable)
  useEffect(() => {
    if (selectMonth) {
      setPercentageEnable(true)
    } else {
      setPercentageEnable(false)
      setSelectYear('')
      dispatch(reduxServices.payrollManagement.actions.clearPayrollManagement())
    }
  }, [selectMonth])

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
    setIsNoteVisible(file[0])
    setClearFile(element.value)
  }

  const dispatch = useAppDispatch()

  const PaySlipsListSize = useTypedSelector(
    reduxServices.payrollManagement.selectors.PaySlipsListSize,
  )
  const excelData = useTypedSelector(
    reduxServices.payrollManagement.selectors.excelData,
  )

  const editPaySlipHandler = (payslipItem: CurrentPayslip): void => {
    setToEditPayslip(payslipItem)
    setToggle('editPaySlip')
  }
  useEffect(() => {
    if (allChecked) {
      setIsDeleteBtnDisable(true)
    } else {
      setIsDeleteBtnDisable(false)
    }
  }, [allChecked])

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
  const renderingPayslipData = useTypedSelector(
    reduxServices.payrollManagement.selectors.paySlipList,
  )

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

  const successToastMessage = (
    <OToast toastMessage="Deleted successfully" toastColor="success" />
  )

  const allDeleteBtnHandler = async () => {
    const previewBtnActionResult = await dispatch(
      reduxServices.payrollManagement.deleteCheckedPayslips(paySlipId),
    )
    if (
      reduxServices.payrollManagement.deleteCheckedPayslips.fulfilled.match(
        previewBtnActionResult,
      )
    ) {
      dispatch(
        reduxServices.payrollManagement.getCurrentPayslip({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          year: Number(selectYear),
          month: selectMonth,
        }),
      )
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const previewBtnHandler = async () => {
    setExcelTable(true)
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
      } else if (
        (reduxServices.payrollManagement.readExcelFile.rejected.match(
          previewBtnActionResult,
        ),
        previewBtnActionResult.payload === 500)
      ) {
        setExcelTable(false)
        dispatch(reduxServices.app.actions.addToast(failedToastMessage))
      } else if (
        reduxServices.payrollManagement.readExcelFile.fulfilled.match(
          previewBtnActionResult,
        ) &&
        previewBtnActionResult.type ===
          'payrollManagement/readExcelFile/fulfilled'
      ) {
        dispatch(reduxServices.app.actions.addToast(failedMessage))
      }
    }
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Payroll Management',
  )

  const ExcelTable =
    excelTable === false ? (
      <>
        {renderingPayslipData?.length > 0 && (
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
            userDeleteAccess={userAccess?.deleteaccess as boolean}
            userEditAccess={userAccess?.updateaccess as boolean}
            editPaySlipHandler={editPaySlipHandler}
            paySlipId={paySlipId}
            setPaySlipId={setPaySlipId}
            allChecked={allChecked}
            setAllChecked={setAllChecked}
          />
        )}
      </>
    ) : (
      <></>
    )

  const previewButton =
    previewBtn && excelData.length === 0 ? (
      <CButton
        className="btn btn-download text-decoration-none btn btn-ovh"
        size="sm"
        color="info"
        type="submit"
        data-testid="preview-btn"
        onClick={previewBtnHandler}
      >
        Preview
      </CButton>
    ) : (
      ''
    )

  useEffect(() => {
    if (window.location.pathname === '/payslipUpload') {
      dispatch(reduxServices.payrollManagement.actions.clearPayrollManagement())
    }
  }, [])

  const note =
    !isNoteVisible && excelData.length === 0 ? (
      <span className="textColor-shade">
        Note: Please upload file either xls or xlsx format.
      </span>
    ) : (
      <></>
    )

  const Delete = userAccess?.deleteaccess && (
    <CTooltip content="Delete">
      <CButton
        color="danger btn-ovh"
        type="button"
        onClick={allDeleteBtnHandler}
        id="button-delete"
        // disabled={!isDeleteBtnDisable}
      >
        Delete
      </CButton>
    </CTooltip>
  )

  useEffect(() => {
    if (selectMonth && selectYear)
      dispatch(
        reduxServices.payrollManagement.getCurrentPayslip({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          year: Number(selectYear),
          month: selectMonth,
        }),
      )
  }, [dispatch, selectMonth, selectYear])
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Payroll Management"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <PayrollManagementFilterOptions
              selectMonth={selectMonth}
              setSelectMonth={setSelectMonth}
              selectYear={selectYear}
              setSelectYear={setSelectYear}
              isPercentageEnable={isPercentageEnable}
            />
            {selectMonth && selectYear ? (
              <CRow className="mt-3 sh-previewBtn">
                <CCol sm={4} className="mt-4 mb-4">
                  <label className="col-sm-12 control-label text-left">
                    <input
                      className="mt-1 w-100"
                      data-testid="feedback-form"
                      type="file"
                      name="upload-form"
                      value={clearFile}
                      accept=".xlsx, .xls"
                      onChange={(element: SyntheticEvent) =>
                        onChangeFileUploadHandler(
                          element.currentTarget as HTMLInputElement,
                        )
                      }
                    />
                    {note}
                  </label>
                  {fileUploadErrorText && (
                    <div id="error">
                      <strong className="mt-3 text-danger">
                        {fileUploadErrorText}
                      </strong>
                    </div>
                  )}
                </CCol>
                <CCol md={4} className="text-end mt-4 mb-4">
                  {previewButton}
                  &nbsp;
                  <DownloadSampleExcelFile className="text-decoration-none btn btn-download btn-ovh" />
                </CCol>
              </CRow>
            ) : (
              ''
            )}
            <>
              <CRow className="gap-2 d-md-flex justify-content-md-end">
                {renderingPayslipData?.length > 0 && (
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
                      {Delete}
                    </CInputGroup>
                  </CCol>
                )}
              </CRow>
              {ExcelTable}
            </>
            {excelTable ? (
              <>
                <PaySlipExcelFileTable
                  selectMonth={selectMonth}
                  selectYear={selectYear}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  setToggle={setToggle}
                  setExcelTable={setExcelTable}
                  setClearFile={setClearFile}
                />
              </>
            ) : (
              <></>
            )}
          </OCard>
        </>
      )}
      {toggle === 'editPaySlip' && !excelTable && (
        <EditPaySlip
          toEditPayslip={toEditPayslip}
          setToggle={setToggle}
          currentPage={currentPage}
          pageSize={pageSize}
          selectMonth={selectMonth}
          selectYear={selectYear}
        />
      )}
    </>
  )
}

export default PayrollManagement
