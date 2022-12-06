import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React, { SyntheticEvent, useState } from 'react'
import DownloadSampleExcelFile from './DownloadSampleExcelFile'
import PayrollManagementTable from './PayrollManagementTable'
import OCard from '../../../components/ReusableComponent/OCard'

const PayrollManagement = (): JSX.Element => {
  const [selectMonth, setSelectMonth] = useState<string>('')
  const [selectYear, setSelectYear] = useState<string>('')
  const [fileUploadErrorText, setFileUploadErrorText] = useState<string>('')

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
  return (
    <>
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
        <PayrollManagementTable />
      </OCard>
    </>
  )
}

export default PayrollManagement
