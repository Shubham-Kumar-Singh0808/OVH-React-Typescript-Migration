import { CRow, CFormLabel, CCol, CFormSelect, CButton } from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { ProductSpecifications } from '../../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'

const EditProductSpecificationFilterOptions = ({
  editProductSpecification,
  setEditProductSpecification,
  setToggle,
}: {
  editProductSpecification: ProductSpecifications
  setEditProductSpecification: React.Dispatch<
    React.SetStateAction<ProductSpecifications>
  >
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const dispatch = useAppDispatch()
  const [selectedAssetType, setSelectedAssetType] = useState<number | string>(
    editProductSpecification.assetTypeId,
  )

  const [selectedProductType, setSelectedProductType] = useState<
    number | string
  >(editProductSpecification.productName)

  const [selectedManufacturer, setSelectedManufacturer] = useState<
    number | string
  >(editProductSpecification?.manufacturerName)
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const getAllLookUps = useTypedSelector(
    reduxServices.addNewProduct.selectors.manufactureList,
  )
  const AssetType = useTypedSelector(
    reduxServices.addNewProduct.selectors.assetTypeList,
  )
  const formLabel = 'col-sm-3 col-form-label text-end'
  const [showEditor, setShowEditor] = useState<boolean>(true)

  const ProductTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.productTypeList,
  )

  useEffect(() => {
    if (editProductSpecification.id && editProductSpecification.assetType) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [editProductSpecification])

  useEffect(() => {
    dispatch(reduxServices.addNewProduct.getAllLookUps())
  }, [dispatch])
  useEffect(() => {
    if (selectedAssetType) {
      dispatch(
        reduxServices.addNewProduct.getAssetTypeList(
          selectedAssetType as number,
        ),
      )
    }
    if (selectedProductType) {
      dispatch(
        reduxServices.addNewProduct.getProductTypeList(
          editProductSpecification.productId,
        ),
      )
    }
  }, [
    dispatch,
    selectedAssetType,
    selectedProductType,
    editProductSpecification,
  ])

  useEffect(() => {
    setShowEditor(false)
  }, [])

  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Product Specification is successfully edited.
      "
      toastColor="success"
    />
  )
  const handleUpdateProductSpecification = async () => {
    const prepareObject = {
      id: editProductSpecification.id,
      productId: editProductSpecification.productId,
      productName: editProductSpecification.productName,
      manufacturerId: editProductSpecification.manufacturerId,
      manufacturerName: editProductSpecification.manufacturerName,
      assetTypeId: editProductSpecification.assetTypeId,
      assetType: editProductSpecification.assetType,
      productSpecification: editProductSpecification.productSpecification,
      createdBy: editProductSpecification.createdBy,
      createdDate: editProductSpecification.createdDate,
      updatedBy: editProductSpecification.updatedBy,
      updatedDate: editProductSpecification.updatedDate,
      departmentId: editProductSpecification.departmentId,
      departmentName: editProductSpecification.departmentName,
      roleId: editProductSpecification.roleId,
    }
    const updateProductSpecificationResultAction = await dispatch(
      reduxServices.addNewProduct.updateProductSpecification(prepareObject),
    )
    if (
      reduxServices.addNewProduct.updateProductSpecification.fulfilled.match(
        updateProductSpecificationResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.productSpecificationList.getProductSpecificationList({
          startIndex: 0,
          endIndex: 20,
          productName: '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const onChangeHandler = (productSpecification: string) => {
    setEditProductSpecification((prevState) => {
      return { ...prevState, ...{ productSpecification } }
    })
  }

  return (
    <>
      <CRow className="mt-3 ">
        <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
          Asset Type:{' '}
          <span className={selectedAssetType ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="assetTypeId"
            data-testid="form-select1"
            name="assetTypeId"
            value={selectedAssetType}
            onChange={(e) => setSelectedAssetType(e.target.value)}
          >
            {getAllLookUps?.assetTypeList?.length > 0 &&
              getAllLookUps?.assetTypeList?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.assetType}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 ">
        <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
          Product Type:{' '}
          <span className={selectedProductType ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectedProductType"
            data-testid="form-select2"
            name="selectedProductType"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            <option value={''}>Select Product Type</option>
            {AssetType.length > 0 &&
              AssetType?.map((product, index) => (
                <option key={index} value={product.productId}>
                  {product.productName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 ">
        <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
          Manufacturer/ Brand Name:{' '}
          <span className={selectedManufacturer ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectedManufacturer"
            data-testid="form-select3"
            name="selectedManufacturer"
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
          >
            <option value={''}>Select Manufacturer</option>
            {ProductTypeList.length > 0 &&
              ProductTypeList?.map((product, index) => (
                <option key={index} value={product?.manufacturerId}>
                  {product.manufacturerName}
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
          Product Specification:
        </CFormLabel>
        <CCol sm={8} data-testid="ckEditor-component">
          {showEditor ? (
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={editProductSpecification?.productSpecification}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                onChangeHandler(editor.getData().trim())
              }}
            />
          ) : (
            ''
          )}
        </CCol>
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            data-testid="add-btn"
            className="btn-ovh me-1 text-white"
            color="success"
            onClick={handleUpdateProductSpecification}
            disabled={!isAddButtonEnabled}
          >
            Update
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default EditProductSpecificationFilterOptions
