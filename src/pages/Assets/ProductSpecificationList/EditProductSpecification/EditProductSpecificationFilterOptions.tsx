import { CRow, CFormLabel, CCol, CFormSelect, CButton } from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { UpdateProductSpecificationTypes } from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const EditProductSpecificationFilterOptions = ({
  editProductSpecification,
  setEditProductSpecification,
  setToggle,
}: {
  editProductSpecification: UpdateProductSpecificationTypes
  setEditProductSpecification: React.Dispatch<
    React.SetStateAction<UpdateProductSpecificationTypes>
  >
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const result = useTypedSelector(
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
  const updateProductList = useTypedSelector(
    reduxServices.addNewProduct.selectors.updateProductList,
  )
  const onChangeProductSpecificationHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setEditProductSpecification((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
    dispatch(
      reduxServices.addNewProduct.getAssetTypeList(
        editProductSpecification.assetTypeId,
      ),
    )
  }

  // useEffect(() => {
  //   if (editProductSpecification.assetTypeId) {
  //     dispatch(
  //       reduxServices.addNewProduct.getProductTypeList(
  //         editProductSpecification.assetTypeId,
  //       ),
  //     )
  //   }
  // }, [editProductSpecification.assetTypeId])

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.addNewProduct.getAllLookUps())
  }, [dispatch, editProductSpecification.assetTypeId])

  // useEffect(() => {
  //   if (updateProductList) {
  //     setEditProductSpecification({
  //       id: updateProductList.id,
  //       productId: updateProductList.productId,
  //       productName: updateProductList.productName,
  //       manufacturerId: updateProductList.manufacturerId,
  //       manufacturerName: updateProductList.manufacturerName,
  //       assetTypeId: updateProductList.assetTypeId,
  //       assetType: updateProductList.assetType,
  //       productSpecification: updateProductList.productSpecification,
  //       createdBy: updateProductList.createdBy,
  //       createdDate: updateProductList.createdDate,
  //       updatedBy: updateProductList.updatedBy,
  //       updatedDate: updateProductList.updatedDate,
  //       departmentId: updateProductList.departmentId,
  //       departmentName: updateProductList.departmentName,
  //       roleId: updateProductList.roleId,
  //     })
  //   }
  //   setShowEditor(false)
  //   setTimeout(() => {
  //     setShowEditor(true)
  //   }, 100)
  // }, [updateProductList])

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
      // dispatch(
      //   reduxServices.app.actions.addToast(
      //     getToastMessage(actionMapping.updated),
      //   ),
      // )
    }
  }

  const onChangeHandler = (description: string) => {
    setEditProductSpecification((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  console.log(editProductSpecification.productName)
  return (
    <>
      <CRow className="mt-3 ">
        <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
          Asset Type:{' '}
          <span
            className={
              editProductSpecification.assetTypeId ? TextWhite : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="assetTypeId"
            data-testid="form-select1"
            name="assetTypeId"
            value={editProductSpecification.assetTypeId}
            onChange={onChangeProductSpecificationHandler}
          >
            {result?.assetTypeList?.length > 0 &&
              result?.assetTypeList?.map((item, index) => (
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
          <span
            className={
              editProductSpecification.productName ? TextWhite : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="productName"
            data-testid="form-select1"
            name="productName"
            value={editProductSpecification.productId}
            onChange={onChangeProductSpecificationHandler}
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
          {/* <span className={selectProductId ? TextWhite : TextDanger}>*</span> */}
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="manufacturerId"
            data-testid="form-select1"
            name="manufacturerId"
            value={editProductSpecification.manufacturerName}
            onChange={onChangeProductSpecificationHandler}
          >
            <option value={''}>Select Manufacturer</option>
            {ProductTypeList.length > 0 &&
              ProductTypeList?.map((product, index) => (
                <option key={index} value={product.productId}>
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
        {showEditor ? (
          <CCol sm={8}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={editProductSpecification.productSpecification}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                onChangeHandler(editor.getData().trim())
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
            data-testid="add-btn"
            className="btn-ovh me-1 text-white"
            color="success"
            onClick={handleUpdateProductSpecification}
            // disabled={!isButtonEnabled}
          >
            Update
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default EditProductSpecificationFilterOptions
