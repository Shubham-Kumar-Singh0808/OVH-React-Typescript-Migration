import { create } from 'domain'
import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
} from '@coreui/react-pro'
import React, { ChangeEvent, useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import Autocomplete from 'react-autocomplete'
import { Link, useHistory } from 'react-router-dom'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { description } from '../../../../test/constants'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { dateFormat } from '../../../../constant/DateFormat'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { IncomingActiveEmployee } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AllAssetsList } from '../../../../types/Assets/AssetList/AssetListTypes'
import OToast from '../../../../components/ReusableComponent/OToast'
import { SaveEmployee } from '../../../../types/Assets/AssetList/ChangeStatusTypes/ChangeStatusTypes'
import AddVendorDetails from '../../VendorList/AddVendorDetails/AddVendorDetails'

const ChangeAssetFilterOptions = ({
  setToggle,
  allEmployees,
  onSelectEmployee,
  employeeName,
  setEmployeeName,
  changeReportStatus,
  setChangeReportStatus,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  allEmployees: IncomingActiveEmployee[]
  onSelectEmployee: (value: string) => void
  employeeName: string | undefined
  setEmployeeName: React.Dispatch<React.SetStateAction<string>>
  changeReportStatus: AllAssetsList
  setChangeReportStatus: React.Dispatch<React.SetStateAction<AllAssetsList>>
}): JSX.Element => {
  const [description, setDescription] = useState<string>('')
  const [statusDate, setStatusDate] = useState<string>(
    changeReportStatus.createdDate,
  )
  const [isShowEditor, setIsShowEditor] = useState<boolean>(true)
  const [assetNumber, setAssetNumber] = useState<string>('')
  const [vendorName, setVendorName] = useState<string>(
    changeReportStatus.vendorName,
  )

  const [checkBox, setCheckBox] = useState<boolean>(false)
  const [vendorListFlag, setVendorListFlag] =
    useState<string>('AddVendorDetails')
  const [assetReferenceNumber, setAssetReferenceNumber] = useState<string>('')
  const [assetStatus, setAssetStatus] = useState<string>('')
  const [statusType, setStatusType] = useState<string>(
    changeReportStatus.status,
  )
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)

  const formLabel = 'col-sm-3 col-form-label text-end'
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const onFocusOut = () => {
    const selectedEmployee = allEmployees.find(
      (value) => value.empFirstName + ' ' + value.empLastName === employeeName,
    )
    const selEmpName =
      selectedEmployee?.empFirstName + ' ' + selectedEmployee?.empLastName

    onSelectEmployee(selEmpName)
  }
  const selectEmployeeHandler = (empName: string) => {
    setEmployeeName(empName)
  }

  const onHandleStartDatePicker = (value: Date) => {
    setStatusDate(moment(value).format(dateFormat))
  }
  const handleText = (description: string) => {
    setDescription(description)
  }
  const dispatch = useAppDispatch()
  const history = useHistory()

  const getLookUps = useTypedSelector(
    reduxServices.ProductTypeList.selectors.manufacturerData,
  )
  useEffect(() => {
    dispatch(reduxServices.addAchiever.getActiveEmployeeListThunk())
  }, [dispatch])

  useEffect(() => {
    if (
      statusDate &&
      employeeName &&
      changeReportStatus.location &&
      description
    ) {
      setIsSaveButtonEnabled(true)
    } else {
      setIsSaveButtonEnabled(false)
    }
  }, [
    changeReportStatus,
    statusDate,
    employeeName,
    description,
    // changeReportStatus.createdDate,
    // changeReportStatus.employeeName,
    // changeReportStatus.location,
    // changeReportStatus.description,
  ])

  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Asset Status Changed  successfully for this asset."
      toastColor="success"
    />
  )
  const handleSaveAssetStatus = async () => {
    const prepareObject = {
      amount: changeReportStatus.amount,
      assetId: changeReportStatus.assetTypeId,
      date: changeReportStatus.createdDate,
      description,
      employeeId: changeReportStatus.employeeId,
      invoiceNumber: changeReportStatus.invoiceNumber,
      location: changeReportStatus.location,
      locationForEmpAssets: checkBox,
      referenceNumber: changeReportStatus.referenceNumber,
      status: changeReportStatus.status,
      vendorId: changeReportStatus.vendorId,
    }

    const saveAssetDetailsResultAction = await dispatch(
      reduxServices.changeStatus.saveEmployee(prepareObject),
    )
    if (
      reduxServices.changeStatus.saveEmployee.fulfilled.match(
        saveAssetDetailsResultAction,
      )
    ) {
      setToggle('')

      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAssetNumber('')
    setVendorName('')
    setAssetReferenceNumber('')
    setAssetStatus('')
    setIsShowEditor(false)
    setDescription('')
    setStatusDate('')
    setTimeout(() => {
      setIsShowEditor(true)
    }, 0)
  }

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setChangeReportStatus((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const handleIsInternalStatus = (isExpenseVendor: boolean) => {
    setCheckBox(isExpenseVendor)
  }
  const addVendorButtonHandler = () => {
    dispatch(reduxServices.changeStatus.actions.setToggle('addVendorDetails'))
  }
  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Asset Number:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="assetnumber"
            type="text"
            id="name"
            size="sm"
            name=" asset number"
            autoComplete="off"
            placeholder=" Asset Number"
            value={changeReportStatus.assetNumber}
            disabled
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 ">
        <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
          Vendor Name:{' '}
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="vendorName"
            data-testid="asset-type"
            name="vendorName"
            value={vendorName}
            onChange={(e) => {
              setVendorName(e.target.value)
            }}
          >
            {getLookUps?.vendorList?.length > 0 &&
              getLookUps?.vendorList?.map((item, index) => (
                <option key={index} value={item.vendorName}>
                  {item.vendorName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2}>
          {/* <Link to={`/vendorListFlag=ADDVENDOR`} className="cursor-pointer"> */}
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="add-vendorbtn"
            // onClick={() => setVendorListFlag('')}
            onClick={addVendorButtonHandler}
          >
            <i className="fa fa-plus"></i>Add Vendor
          </CButton>
          {/* </Link> */}
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Asset Reference Number:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="referenceNumber"
            type="text"
            id="referenceNumber"
            size="sm"
            name="referenceNumber"
            autoComplete="off"
            placeholder="Asset Reference Number"
            value={changeReportStatus.referenceNumber}
            onChange={handledInputChange}
          />
          <span className="text-danger" data-testid="errorMessage">
            <b>
              <strong>Note:</strong> This field is mandatory for assembly part
              (Ex- CPU, Chair){' '}
            </b>
          </span>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Asset Status :
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Relationship"
            name="statusType"
            id="statusType"
            data-testid="asset-status"
            value={statusType}
            onChange={(e) => setStatusType(e.target.value)}
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
          <span className={statusDate ? 'text-white' : 'text-danger'}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <ReactDatePicker
            id="createdDate"
            className="form-control form-control-sm sh-date-picker"
            showMonthDropdown
            showYearDropdown
            autoComplete="off"
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="dd/mm/yyyy"
            name="createdDate"
            value={statusDate}
            onChange={(date: Date) => onHandleStartDatePicker(date)}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          data-testid="ach-emp-name"
          className="col-sm-3 col-form-label text-end"
        >
          Employee:
          <span className={employeeName ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            autoComplete: 'on',
            placeholder: 'Employee',
            onBlur: onFocusOut,
          }}
          items={allEmployees}
          getItemValue={(item) => item.empFirstName + ' ' + item.empLastName}
          value={employeeName}
          renderMenu={(children) => (
            <div
              className={
                employeeName && employeeName.length > 0
                  ? 'autocomplete-dropdown-wrap'
                  : 'autocomplete-dropdown-wrap hide'
              }
            >
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={
                isHighlighted
                  ? 'autocomplete-dropdown-item active'
                  : 'autocomplete-dropdown-item'
              }
              key={item?.employeeId}
            >
              {item?.empFirstName + ' ' + item?.empLastName}
            </div>
          )}
          shouldItemRender={(item, value) =>
            item?.empFirstName?.toLowerCase().indexOf(value?.toLowerCase()) > -1
          }
          onChange={(e) => setEmployeeName(e.target.value)}
          onSelect={(value) => selectEmployeeHandler(value)}
        />
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
            data-testid="invoiceNumber"
            type="text"
            id="invoiceNumber"
            size="sm"
            name="invoiceNumber"
            autoComplete="off"
            placeholder="Invoice Number"
            value={changeReportStatus.invoiceNumber}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Amount:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="amount"
            type="text"
            id="amount"
            size="sm"
            name="amount"
            autoComplete="off"
            placeholder="Amount:"
            value={changeReportStatus.amount}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Location:
          <span
            className={changeReportStatus.location ? TextWhite : TextDanger}
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="location"
            type="text"
            id="location"
            size="sm"
            name="location"
            autoComplete="off"
            placeholder=" Location:"
            value={changeReportStatus.location}
            onChange={handledInputChange}
          />
        </CCol>
        <CCol sm={6}>
          <CFormLabel {...formLabelProps} className=" col-form-label text-end">
            <CFormCheck
              className="mb-1"
              inline
              type="checkbox"
              name="isExpenseVendor"
              id="expenseVendor"
              onChange={(event) => handleIsInternalStatus(event.target.checked)}
              checked={checkBox}
            />
            &nbsp; Update All Locations For Employee
          </CFormLabel>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Description:
          <span className={description ? 'text-white' : 'text-danger'}>*</span>
        </CFormLabel>
        {isShowEditor ? (
          <CCol sm={9}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={description}
              data-testid="vendorAddress"
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                handleText(editor.getData().trim())
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
            disabled={!isSaveButtonEnabled}
            onClick={handleSaveAssetStatus}
          >
            Save
          </CButton>
          <CButton
            data-testid="clear-btn"
            color="warning"
            className="btn-ovh text-white"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      {/* <AddVendorDetails setToggle={setToggle} /> */}
    </>
  )
}

export default ChangeAssetFilterOptions
