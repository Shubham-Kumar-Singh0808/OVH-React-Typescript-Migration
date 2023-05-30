import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { description } from '../../../../test/constants'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { dateFormat } from '../../../../constant/DateFormat'

const ChangeAssetFilterOptions = (): JSX.Element => {
  const [description, setDescription] = useState<string>('')
  const [statusDate, setStatusDate] = useState<string>('')
  const [isShowComment, setIsShowComment] = useState<boolean>(true)
  const [assetNumber, setAssetNumber] = useState<string>('')
  const [vendorName, setVendorName] = useState<string>('')
  const [assetReferenceNumber, setAssetReferenceNumber] = useState<string>('')
  const [assetStatus, setAssetStatus] = useState<string>('')
  const [employee, setEmployee] = useState<string>('')
  const [invoiceNumber, setInvoiceNumber] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [location, setLocation] = useState<string>('')

  const onHandleStartDatePicker = (value: Date) => {
    setStatusDate(moment(value).format(dateFormat))
  }
  const handleDescription = (comments: string) => {
    setDescription(comments)
  }
  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Asset Number:
          {/* <span className={showIsRequired(addVendor.vendorName)}>*</span> */}
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="asset number"
            type="text"
            id="name"
            size="sm"
            name=" asset number"
            autoComplete="off"
            placeholder=" Asset Number"
            //   value={addVendor.vendorName}
            //   onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Asset Reference Number:
          {/* <span className={showIsRequired(addVendor.vendorName)}>*</span> */}
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="asset reference number"
            type="text"
            id="asset reference number"
            size="sm"
            name=" asset reference number"
            autoComplete="off"
            placeholder=" Asset Reference Number"
            //   value={addVendor.vendorName}
            //   onChange={handledInputChange}
          />
        </CCol>

        <CCol sm={2}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="add-vendorbtn"
            // onClick={() => setToggle('')}
          >
            <i className="fa fa-plus"></i>Add Vendor
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Asset Status :
          {/* <span
              className={
                employeeFamily?.relationShip ? 'text-white' : 'text-danger'
              }
            >
              *
            </span> */}
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Relationship"
            name="relationShip"
            id="AssetStatus"
            data-testid="asset-status"
            //   value={employeeFamily?.relationShip}
            //   onChange={onChangePersonNameHandler}
          >
            <option value={''}>Select Status</option>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
            <option value="Under Repair">Under Repair</option>
            <option value="Idle">Idle</option>
            <option value="Scrap">Scrap</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Status Date:
        </CFormLabel>
        <CCol sm={3}>
          <ReactDatePicker
            id="statusDate"
            className="form-control form-control-sm sh-date-picker"
            showMonthDropdown
            showYearDropdown
            autoComplete="off"
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="dd/mm/yyyy"
            name="statusDate"
            // value={statusDate}
            onChange={(date: Date) => onHandleStartDatePicker(date)}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Employee:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="employee"
            type="text"
            id="employee"
            size="sm"
            name=" employee"
            autoComplete="off"
            placeholder=" Employee:"
            //   value={addVendor.vendorName}
            //   onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Invoice Number:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="invoice number"
            type="text"
            id="invoice number"
            size="sm"
            name=" invoice number"
            autoComplete="off"
            placeholder=" Invoice Number"
            //   value={addVendor.vendorName}
            //   onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Amount:
          {/* <span className={showIsRequired(addVendor.vendorName)}>*</span> */}
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="amount"
            type="text"
            id="amount"
            size="sm"
            name=" amount"
            autoComplete="off"
            placeholder=" Amount:"
            //   value={addVendor.vendorName}
            //   onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Location:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="location"
            type="text"
            id="location"
            size="sm"
            name=" location"
            autoComplete="off"
            placeholder=" Location:"
            //   value={addVendor.vendorName}
            //   onChange={handledInputChange}
          />
        </CCol>
        <CCol sm={3}>
          <CFormCheck
            className="chk_emp"
            inline
            type="checkbox"
            name="isExpenseVendor"
            id="expenseVendor"
            // onChange={(event) =>
            //   handleIsUpdateAllLocations(event.target.checked)
            // }
            // checked={setAssetStatus.isUpdateAllLocations}
          />
        </CCol>
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Update All Locations For Employee
        </CFormLabel>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Description:
          <span className={description ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        {isShowComment ? (
          <CCol sm={9}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={description}
              data-testid="vendorAddress"
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                handleDescription(editor.getData().trim())
              }}
            />
          </CCol>
        ) : (
          ''
        )}
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            data-testid="save-btn"
            className="btn-ovh me-1 text-white"
            color="success"
            //   disabled={!isSaveButtonEnabled}
            //   onClick={handleSaveAssetStatus}
          >
            Save
          </CButton>
          <CButton
            data-testid="clear-btn"
            color="warning"
            className="btn-ovh text-white"
            // onClick={clearInputs}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default ChangeAssetFilterOptions
