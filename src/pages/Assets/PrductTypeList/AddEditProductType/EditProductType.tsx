import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { ProductTypeListType } from '../../../../types/Assets/ProductTypeList/ProductTypeListTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

const EditProductTypeRecord = ({
  setToggle,
  EditProductType,
  setEditProductType,
  currentPage,
  pageSize,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  EditProductType: ProductTypeListType
  setEditProductType: React.Dispatch<React.SetStateAction<ProductTypeListType>>
  currentPage: number
  pageSize: number
}): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputNewVendorDetails',
    className: 'col-form-label',
  }
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()

  const EditProductTypeList = useTypedSelector(
    reduxServices.ProductTypeList.selectors.manufacturerData,
  )

  useEffect(() => {
    if (EditProductType.productName && EditProductType.assetTypeId) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [EditProductType.productName, EditProductType.assetTypeId])

  const handledInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEditProductType((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const updateSuccessToastMessagess = (
    <OToast
      toastMessage="Product type updated successfully
      "
      toastColor="success"
    />
  )
  const handleUpdateProductType = async () => {
    const prepareObject = {
      assetTypeId: EditProductType.assetTypeId,
      assetType: EditProductType.assetType,
      createdBy: EditProductType.createdBy,
      createdDate: EditProductType.createdDate,
      departmentId: EditProductType.departmentId,
      departmentName: EditProductType.departmentName,
      productId: EditProductType.productId,
      productName: EditProductType.productName,
      updatedBy: EditProductType.updatedBy,
      updatedDate: EditProductType.updatedDate,
    }
    const updateProductTypeResultAction = await dispatch(
      reduxServices.ProductTypeList.UpdateProductTypeListRecord(prepareObject),
    )
    if (
      reduxServices.ProductTypeList.UpdateProductTypeListRecord.fulfilled.match(
        updateProductTypeResultAction,
      )
    ) {
      setToggle('')
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessagess))
      dispatch(reduxServices.app.actions.addToast(undefined))
      dispatch(
        reduxServices.ProductTypeList.getProductTypeList({
          endIndex: pageSize * currentPage,
          startIndex: pageSize * (currentPage - 1),
          productName: '',
        }),
      )
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Product Type"
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

        <>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Asset Type:
              <span
                className={EditProductType.assetTypeId ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="assetTypeId"
                name="assetTypeId"
                id="assetTypeId"
                data-testid="AssetType-test"
                onChange={handledInputChange}
                value={EditProductType.assetTypeId}
              >
                {EditProductTypeList?.assetTypeList?.length > 0 &&
                  EditProductTypeList?.assetTypeList.map((product, index) => (
                    <option key={index} value={product?.id}>
                      {product.assetType}
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
              Product Type:
              <span
                className={EditProductType.productName ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-2"
                data-testid="productName"
                type="text"
                id="productName"
                size="sm"
                maxLength={52}
                name="productName"
                autoComplete="off"
                placeholder="Enter Product Type"
                value={EditProductType.productName}
                onChange={handledInputChange}
              />
            </CCol>
          </CRow>
        </>

        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              onClick={handleUpdateProductType}
              disabled={!isUpdateButtonEnabled}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditProductTypeRecord
