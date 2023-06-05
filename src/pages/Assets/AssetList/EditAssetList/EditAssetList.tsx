import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { AssetTypeAddList } from '../../../../types/Assets/AssetList/addEditListTypes'
import OToast from '../../../../components/ReusableComponent/OToast'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { showIsRequired } from '../../../../utils/helper'
import { AllAssetsList } from '../../../../types/Assets/AssetList/AssetListTypes'
import { dateFormat } from '../../../../constant/DateFormat'

const EditAddAssetList = ({
  setToggle,
  editAddAssetList,
  setEditAddAssetList,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editAddAssetList: AllAssetsList
  setEditAddAssetList: React.Dispatch<React.SetStateAction<AllAssetsList>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isShowComment, setIsShowComment] = useState<boolean>(true)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [productType, setProductType] = useState<string>(
    editAddAssetList.productName,
  )
  const [manufacturerName, setManufacturerName] = useState<string>(
    editAddAssetList.manufacturerName,
  )
  const [datePurchase, setDateOfPurchase] = useState<string>(
    editAddAssetList.purchasedDate,
  )
  const [receivedDate, setReceivedDate] = useState<string>(
    editAddAssetList.receivedDate,
  )
  const [warrantyStartDate, setWarrantyStartDate] = useState<string>(
    editAddAssetList.warrantyStartDate as string,
  )
  const [warrantyEndDate, setWarrantyEndDate] = useState<string>(
    editAddAssetList.warrantyEndDate as string,
  )

  const [assetStatus, setAssetStatus] = useState<string>(
    editAddAssetList.status,
  )

  const [country, setCountry] = useState<string | number>(
    editAddAssetList.countryId as number,
  )
  const [addComment, setAddComment] = useState<string>(
    editAddAssetList.notes as string,
  )

  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  const [vendorName, setVendorName] = useState<string>(
    editAddAssetList.vendorName,
  )
  const [assetType, setAssetType] = useState<string>(editAddAssetList.assetType)

  const formLabelProps = {
    htmlFor: 'editVendorDetails',
    className: 'col-form-label',
  }

  const handleBankAddress = (comments: string) => {
    setAddComment(comments)
  }

  const departments = useTypedSelector(
    reduxServices.addNewVendor.selectors.department,
  )

  const textWhite = 'text-white'
  const textDanger = 'text-danger'

  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setEditAddAssetList((prevState) => {
      return {
        ...prevState,
        ...{
          [name]: value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, ''),
        },
      }
    })
  }
  useEffect(() => {
    if (
      editAddAssetList.poNumber &&
      editAddAssetList.vendorId &&
      editAddAssetList.assetNumber &&
      editAddAssetList.assetTypeId &&
      editAddAssetList.amount &&
      editAddAssetList.countryId &&
      editAddAssetList.invoiceNumber &&
      editAddAssetList.otherAssetNumber &&
      editAddAssetList.manufacturerId &&
      editAddAssetList.productId &&
      editAddAssetList.warrantyStartDate &&
      editAddAssetList.warrantyEndDate &&
      editAddAssetList.notes &&
      editAddAssetList.purchasedDate &&
      editAddAssetList.receivedDate &&
      editAddAssetList.status
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editAddAssetList])

  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Vendor Details is successfully edited."
      toastColor="success"
    />
  )
  const updateHandler = async () => {
    const prepareObject = {
      amount: editAddAssetList.amount as string,
      assetNumber: editAddAssetList.assetNumber as string,
      assetType: editAddAssetList.assetType as string,
      assetTypeId: editAddAssetList.assetTypeId as number,
      countryId: editAddAssetList.countryId as number,
      createdBy: editAddAssetList.createdBy,
      createdDate: editAddAssetList.createdDate,
      departmentId: editAddAssetList.departmentId,
      departmentName: editAddAssetList.departmentName as string,
      description: editAddAssetList.description as string,
      employeeId: editAddAssetList.employeeId as number,
      employeeName: editAddAssetList.employeeName as string,
      id: editAddAssetList.id as number,
      invoiceNumber: editAddAssetList.invoiceNumber as string,
      location: editAddAssetList.location as string,
      manufacturerId: editAddAssetList.manufacturerId as number,
      manufacturerName: editAddAssetList.manufacturerName as string,
      notes: editAddAssetList.notes as string,
      otherAssetNumber: editAddAssetList.otherAssetNumber,
      otherNumber: editAddAssetList.otherNumber as string,
      pSpecification: editAddAssetList.pSpecification,
      poNumber: editAddAssetList.poNumber,
      productId: editAddAssetList.productId,
      productName: productType,
      productSpecification: editAddAssetList.productSpecification,
      productSpecificationId: editAddAssetList.productSpecificationId,
      purchasedDate: datePurchase,
      receivedDate,
      referenceNumber: editAddAssetList.referenceNumber,
      searchByEmpName: editAddAssetList.searchByEmpName,
      status: assetStatus,
      updatedBy: editAddAssetList.updatedBy,
      updatedDate: editAddAssetList.updatedDate,
      vendorId: editAddAssetList.vendorId,
      vendorName,
      warrantyEndDate: warrantyStartDate,
      warrantyStartDate: warrantyEndDate,
    }
    const updateVendorDetailsResultAction = await dispatch(
      reduxServices.addAssetList.updateAddAsset(prepareObject),
    )
    if (
      reduxServices.addAssetList.updateAddAsset.fulfilled.match(
        updateVendorDetailsResultAction,
      )
    ) {
      setToggle('')
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  useEffect(() => {
    setIsShowComment(false)
    setTimeout(() => {
      setIsShowComment(true)
    }, 100)
  }, [])

  const assetListTypeList = useTypedSelector(
    reduxServices.ProductTypeList.selectors.manufacturerData,
  )
  const countriesList = useTypedSelector(
    reduxServices.country.selectors.countriesList,
  )

  const assetTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.assetTypeList,
  )

  const productTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.productTypeList,
  )

  const onHandleDateOfPurchase = (value: Date) => {
    setDateOfPurchase(moment(value).format(dateFormat))
  }
  const onHandleReceivedDate = (value: Date) => {
    setReceivedDate(moment(value).format(dateFormat))
  }
  const onHandleWarrantyStartDate = (value: Date) => {
    setWarrantyStartDate(moment(value).format(dateFormat))
  }
  const onHandleWarrantyEndDate = (value: Date) => {
    setWarrantyEndDate(moment(value).format(dateFormat))
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Asset"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            PO Number:
            <span className={showIsRequired(editAddAssetList.poNumber)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="poNumber"
              type="text"
              id="poNumber"
              size="sm"
              name="poNumber"
              autoComplete="off"
              placeholder="PO Number"
              value={editAddAssetList.poNumber}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Vendor Name: <span className={showIsRequired(vendorName)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="vendorName"
              aria-label="Default select example"
              size="sm"
              id="vendorName"
              name="vendorName"
              placeholder="Select Vendor Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {assetListTypeList?.vendorList?.length > 0 &&
                assetListTypeList?.vendorList?.map((location, index) => (
                  <option key={index} value={location.vendorId}>
                    {location.vendorName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Asset Type: <span className={showIsRequired(assetType)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="assetType"
              aria-label="Default select example"
              size="sm"
              id="assetType"
              name="assetType"
              placeholder="Select Asset Type"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {assetListTypeList?.assetTypeList?.length > 0 &&
                assetListTypeList?.assetTypeList?.map((location, index) => (
                  <option key={index} value={location.id}>
                    {location.assetType}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Product Type: <span className={showIsRequired(productType)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="productType"
              aria-label="Default select example"
              size="sm"
              id="productType"
              name="productType"
              placeholder="Select Product Type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {assetTypeList.map((location, index) => (
                <option key={index} value={location.productId}>
                  {location.productName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Manufacturer Name:
            <span className={showIsRequired(manufacturerName)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="manufacturerName"
              aria-label="Default select example"
              size="sm"
              id="manufacturerName"
              name="manufacturerName"
              placeholder="Select Manufacturer Name"
              value={manufacturerName}
              onChange={(e) => setManufacturerName(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {productTypeList.map((location, index) => (
                <option key={index} value={location.productId}>
                  {location.manufacturerName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Asset Number:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="assetNumber"
              type="text"
              id="assetNumber"
              size="sm"
              name="assetNumber"
              autoComplete="off"
              value={editAddAssetList.assetNumber}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            License/Asset No:
            <span className={showIsRequired(editAddAssetList.otherAssetNumber)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="otherAssetNumber"
              type="text"
              id="otherAssetNumber"
              size="sm"
              name="otherAssetNumber"
              placeholder="RBT"
              value={editAddAssetList.otherAssetNumber}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Invoice Number:
            <span className={showIsRequired(editAddAssetList.invoiceNumber)}>
              *
            </span>
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
              value={editAddAssetList.invoiceNumber}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Amount:
            <span className={editAddAssetList.amount ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="amount"
              type="text"
              id="state"
              size="sm"
              name="amount"
              autoComplete="off"
              placeholder="Amount"
              value={editAddAssetList.amount as string}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Date of Purchase :
            <span className={showIsRequired(datePurchase)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="datePurchase"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="datePurchase"
              value={datePurchase}
              minDate={new Date()}
              onChange={(date: Date) => onHandleDateOfPurchase(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Received Date:
            <span className={showIsRequired(receivedDate)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="receivedDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="receivedDate"
              value={receivedDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleReceivedDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Warranty Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="warrantyStartDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="warrantyStartDate"
              value={warrantyStartDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleWarrantyStartDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Warranty End Date :
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="warrantyEndDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="warrantyEndDate"
              value={warrantyEndDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleWarrantyEndDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Asset Status:
            <span className={showIsRequired(assetStatus)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="manufacturerName"
              aria-label="Default select example"
              size="sm"
              id="assetStatus"
              name="assetStatus"
              placeholder="Select Status"
              value={assetStatus}
              onChange={(e) => setAssetStatus(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              <option value={'Working'}>Working</option>
              <option value={'Not Working'}>Not Working</option>
              <option value={'Under Repair'}>Under Repair</option>
              <option value={'Idle'}>Idle</option>
              <option value={'Scrap'}>Scrap</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Country:
            <span className={country ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="country"
              aria-label="Default select example"
              size="sm"
              id="country"
              name="country"
              placeholder="Select Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value={''}>Select Country</option>
              {countriesList.map((location, index) => (
                <option key={index} value={location.id}>
                  {location.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Notes:
          </CFormLabel>
          {isShowComment ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addComment}
                data-testid="notes"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleBankAddress(editor.getData().trim())
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
              data-testid="update-btn"
              color="warning"
              className="btn-ovh text-white"
              onClick={updateHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditAddAssetList
