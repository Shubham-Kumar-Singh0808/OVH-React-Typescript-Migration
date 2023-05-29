import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormSelect,
  CForm,
  CFormInput,
} from '@coreui/react-pro'
import OCard from '../../../components/ReusableComponent/OCard'
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { ManufacturerDetails } from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'

const EditManufacturerList = ({
  setToggle,
  editManufacturerData,
  setEditManufacturerData,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editManufacturerData: ManufacturerDetails
  setEditManufacturerData: React.Dispatch<
    React.SetStateAction<ManufacturerDetails>
  >
}): JSX.Element => {
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const productResult = useTypedSelector(
    reduxServices.ManufacturerList.selectors.manufacturerData,
  )

  useEffect(() => {
    if (
      editManufacturerData.productId &&
      editManufacturerData.manufacturerName
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [editManufacturerData])

  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    setEditManufacturerData((prevState) => {
      return {
        ...prevState,
        ...{
          [name]: value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, ''),
        },
      }
    })
  }
  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Product type is successfully edited.
      "
      toastColor="success"
    />
  )
  const updateHandler = async () => {
    const prepareObject = {
      createdBy: editManufacturerData.createdBy,
      createdDate: editManufacturerData.createdDate,
      departmentId: editManufacturerData.departmentId,
      departmentName: editManufacturerData.departmentName,
      manufacturerId: editManufacturerData.manufacturerId,
      manufacturerName: editManufacturerData.manufacturerName,
      productId: editManufacturerData.productId,
      productName: editManufacturerData.productName,
      updatedBy: editManufacturerData.updatedBy,
      updatedDate: editManufacturerData.updatedDate,
    }
    const updateAppraisalCycleResultAction = await dispatch(
      reduxServices.ManufacturerList.updateManufacturerName(prepareObject),
    )
    if (
      reduxServices.ManufacturerList.updateManufacturerName.fulfilled.match(
        updateAppraisalCycleResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.ManufacturerList.getManufacturerList({
          startIndex: 0,
          endIndex: 20,
          manufacturerName: '',
          search: '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Manufacturer Name"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={() => setToggle('')}
              data-testid="back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end col-form-label category-label"
            >
              Product Type:{' '}
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                data-testid="form-select"
                aria-label="Default select example"
                size="sm"
                id="manufacturerId"
                name="manufacturerId"
                value={editManufacturerData?.productName}
                onChange={onChangeInputHandler}
              >
                <option value={''}>Select Product Type</option>
                {productResult.productList?.length > 0 &&
                  productResult?.productList?.map((productResults, index) => (
                    <option key={index} value={productResults?.productName}>
                      {productResults?.productName}
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
              Manufacturer Name
              <span
                className={
                  editManufacturerData.manufacturerName
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                data-testid="manufacturerName"
                id="manufacturerName"
                name="manufacturerName"
                placeholder="Enter Manufacturer Name"
                value={editManufacturerData.manufacturerName}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>

          <CRow className="mt-3 mb-3">
            <CCol className="col-md-3 offset-md-3">
              <CButton
                color="success"
                className="btn-ovh me-1"
                size="sm"
                disabled={!isAddButtonEnabled}
                onClick={updateHandler}
                data-testid="updateBtn"
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditManufacturerList
